# Guías de configuración — Reformas N&N

Esta guía explica, paso a paso y en castellano, cómo poner en marcha las tres partes que necesitan configuración externa:

1. **Conectar la base de datos** (Supabase) — para que la galería, el panel y el formulario funcionen.
2. **Configurar el envío de correos** (Resend) — para recibir las solicitudes de presupuesto en tu Hotmail.
3. **Crear administradores individuales** — para que cada persona tenga su propio acceso al panel.

---

## Índice

1. [Conectar la base de datos (Supabase)](#1-conectar-la-base-de-datos-supabase)
2. [Configurar el envío de correos con Resend](#2-configurar-el-envío-de-correos-con-resend)
3. [Crear administradores individuales](#3-crear-administradores-individuales)
4. [Información empresarial pendiente](#4-información-empresarial-pendiente)
5. [Dominio y publicación](#5-dominio-y-publicación)

---

## 1. Conectar la base de datos (Supabase)

La web ya está conectada a un proyecto Supabase provisionado en este entorno de Bolt. Las variables de entorno (`VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`) ya están en el archivo `.env` y el esquema de la base de datos ya está creado y aplicado (tablas, políticas de seguridad y bucket de almacenamiento).

### Qué hacer

**Nada para empezar a probar.** La base de datos ya está activa y la migración inicial ya se ha aplicado. La web debería leer y escribir correctamente.

### Verificar que todo está en orden

1. Abre la web y entra en `/contacto`. Envía una solicitud de presupuesto.
2. Si todo funciona, verás el mensaje de confirmación.
3. Para ver las solicitudes, entra en `/admin` con un usuario administrador (ver sección 3) y ve a "Solicitudes".

### Si las imágenes no aparecen en la galería

La galería pública solo muestra los proyectos que estén marcados como **publicados** en el panel de administración. Si no aparece nada:

1. Entra en `/admin/proyectos`.
2. Crea un proyecto, sube imágenes y marca la casilla **Publicado**.
3. Vuelve a `/proyectos`: el proyecto debería aparecer.

### Si ves un error "storage-no-configurado"

Significa que las variables de entorno no se están leyendo. Comprueba que el archivo `.env` existe y contiene:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Estos valores ya están rellenados por el entorno de Bolt. No los cambies a mano salvo que sepas exactamente qué haces.

### Cómo se aplica una migración nueva (si en el futuro pides cambios en la base de datos)

Las migraciones se aplican automáticamente a través de Bolt; no tienes que ejecutar nada manualmente. Si en algún momento necesitas revisar el estado de la base de datos, puedes pedírmelo y lo consulto en el panel.

---

## 2. Configurar el envío de correos con Resend

El formulario de presupuesto guarda **siempre** la solicitud en la base de datos, aunque el envío por email no esté configurado. Para recibir además una copia en `Reformasnyn@hotmail.com`, configuramos una función edge que reenvía el email con **Resend** (un servicio de correo transaccional con plan gratuito).

### Paso 1 — Crear una cuenta en Resend

1. Ve a **https://resend.com** y créate una cuenta (puedes registrarte con Google o GitHub).
2. El plan gratuito permite enviar hasta 100 correos al mes y 3.000 en total, suficiente para empezar.

### Paso 2 — Obtener la API key

1. Entra en el panel de Resend y ve a **API Keys**.
2. Pulsa **Create API Key**.
3. Dale un nombre, por ejemplo `reformas-nyn`.
4. Copia la clave que aparece (empieza por `re_...`). No la podrás volver a ver, así que guárdala en un lugar seguro.

### Paso 3 — Añadir la API key como secreto

La función edge `send-quote` lee el secreto llamado `RESEND_API_KEY`. Para añadirlo:

- En el entorno de Bolt, pídeme (o usa el menú de Secretos) añadir el secreto `RESEND_API_KEY` con el valor de la clave que copiaste en el paso anterior.

### Paso 4 — Verificar el dominio del remitente (opcional pero recomendado)

Por defecto, Resend permite enviar desde `onboarding@resend.dev`, que funciona para probar. Para producción, conviene verificar tu propio dominio (por ejemplo `reformasnyn.es`) para que los correos no lleguen a spam:

1. En Resend, ve a **Domains** y añade tu dominio.
2. Te pedirá añadir unos registros DNS (SPF, DKIM, etc.) en el panel de tu dominio.
3. Una vez verificado, cambia el remitente en la función edge `send-quote` de `onboarding@resend.dev` a `presupuesto@reformasnyn.es` (o el que prefieras).

### Paso 5 — Comprobar el envío

1. Envía una solicitud desde el formulario de la web.
2. Revisa `Reformasnyn@hotmail.com` (y la carpeta de spam la primera vez).
3. Si no llega, dime el caso y reviso el log de la función edge.

### ¿Y si no configuro Resend ahora?

No pasa nada: las solicitudes siguen guardándose en el panel (`/admin/solicitudes`). Configura Resend cuando quieras empezar a recibir copias por email.

---

## 3. Crear administradores individuales

El panel de administración (`/admin`) está protegido por autenticación real. Solo pueden entrar los usuarios que:

1. Tengan una cuenta creada en Supabase Auth.
2. Estén marcados como administrador en sus metadatos.

Cada administrador tiene **su propio correo y contraseña**. No hay contraseñas por defecto publicadas.

### Paso 1 — Crear un usuario administrador (la primera vez)

Para crear el primer administrador, lo más sencillo es pedírmelo a mí o hacerlo desde el panel de Supabase:

1. Accede al panel de Supabase de tu proyecto (desde Bolt, en la sección de base de datos).
2. Ve a **Authentication → Users**.
3. Pulsa **Add user**.
4. Introduce el correo (por ejemplo `propietario@reformasnyn.es`) y una contraseña segura.
5. **Importante:** desmarca "Auto Confirm User" no — déjalo marcado para que el usuario pueda entrar sin confirmar email. En Bolt, la confirmación de email está desactivada por defecto.

### Paso 2 — Marcar el usuario como administrador

La función `is_admin()` comprueba que el campo `is_admin` esté a `true` dentro de `raw_app_meta_data` (los metadatos inmutables del usuario). Para establecerlo:

- Pídeme que lo haga (lo ejecuto como migración SQL con el rol de servicio), o
- En el panel de Supabase: **Authentication → Users**, abre el usuario, busca **Provider: email → App Metadata**, y añade:
  ```json
  { "is_admin": true }
  ```
  Guarda los cambios.

> **No uses `User Metadata`** (raw_user_meta_data), porque el usuario podría modificarlo. Usa siempre `App Metadata` (raw_app_meta_data).

### Paso 3 — Iniciar sesión

1. Entra en `https://tu-dominio/admin`.
2. Introduce el correo y la contraseña del administrador.
3. Si está marcado como admin, llegarás al panel de proyectos.

### Paso 4 — Crear más administradores

Repite los pasos 1 y 2 para cada persona que necesite acceso. Cada uno usará su propio correo y contraseña. Para revocar el acceso:

- Quita `"is_admin": true` de los App Metadata del usuario, o
- Elimina el usuario desde el panel de Supabase.

### Cómo gestionar proyectos e imágenes (resumen)

1. **Crear un proyecto:** pulsa "Nuevo proyecto", rellena título/descripción/categoría y guarda.
2. **Subir imágenes:** dentro del proyecto, pulsa "Subir imágenes" y selecciona archivos desde tu ordenador o móvil (máximo 5MB por imagen).
3. **Antes y después:** marca la casilla "Marcar como antes/después" y, en cada imagen, selecciona si es "Antes" o "Después". La web solo muestra las parejas completas.
4. **Publicar:** marca "Publicado" para que el proyecto sea visible en la galería pública.
5. **Eliminar:** pulsa el icono de papelera; te pedirá confirmación. Se borrarán también las imágenes del almacenamiento.

---

## 4. Información empresarial pendiente

Antes de publicar la web definitivamente, necesito que facilites estos datos (no se han inventado):

- **Razón social** de la empresa.
- **NIF / CIF**.
- **Domicilio fiscal** (no es obligatorio publicarlo, pero sí para el aviso legal).
- **Dirección postal y coordenadas** si quieres incluir un mapa (opcional).
- **Teléfono y correo ya están** en la web: 619 45 34 12 y Reformasnyn@hotmail.com.

Estos datos se añadirán en las páginas de **Aviso legal** y **Política de privacidad**.

---

## 5. Dominio y publicación

### Candidatos de dominio (pendientes de comprobar disponibilidad)

- `reformasnyn.es`
- `reformasnyn.com`
- `reformasnynvalencia.es`

No se ha afirmado que estén disponibles. Comprueba la disponibilidad en un registrador (por ejemplo DonDominio, Arsys, Namecheap) antes de registrar.

### Cómo publicar la web

1. En Bolt, usa la opción **Publish / Deploy** del entorno.
2. Bolt genera una URL provisional (algo como `tu-proyecto.bolt.new`).
3. Para conectar tu dominio propio, sigue las instrucciones de Bolt para añadir un dominio personalizado (suele requerir añadir un registro CNAME en el DNS de tu dominio).

### Lo que queda pendiente hasta la publicación

- Sustituir las imágenes de stock por fotos reales de Reformas N&N (subirlas desde el panel).
- Añadir opiniones reales desde el panel cuando se disponga de ellas.
- Configurar Resend (sección 2) para recibir las solicitudes por email.
- Añadir los datos jurídicos (sección 4) a las páginas legales.
- Comprobar la disponibilidad del dominio y registrarlo.
- Verificar el dominio en Google Search Console una vez publicado.
