# Bot Híbrido con Mini App para Telegram

Este proyecto crea un bot de Telegram que incluye una mini app web integrada.

## Requisitos

- Python 3.7+
- Un bot de Telegram (obtén el token de @BotFather)
- Un servidor web para hospedar la mini app (debe ser HTTPS en producción)

## Instalación

1. Clona o descarga este proyecto.
2. Instala las dependencias:
   ```
   pip install -r requirements.txt
   ```

## Configuración

1. Obtén el token de tu bot de Telegram desde @BotFather.
2. Edita `bot.py` y reemplaza `'TU_BOT_TOKEN'` con tu token real.
3. Hospeda los archivos en `web/` en un servidor HTTPS. Opciones:
   - **Desarrollo local con ngrok**:
     - Instala ngrok.
     - Ejecuta: `ngrok http 8000` (o el puerto que uses).
     - Copia la URL HTTPS de ngrok.
   - **Despliegue en Render**:
     - Ve a render.com y crea un "Static Site".
     - Sube los archivos de `web/`.
     - Despliega y copia la URL HTTPS.
4. Actualiza `WEB_APP_URL` en `bot.py` con la URL de tu mini app.
5. Para eliminar la advertencia de Telegram, permite el dominio en @BotFather con `/setdomain`.

## Ejecución

1. Ejecuta el bot:
   ```
   python bot.py
   ```

2. Inicia un chat con tu bot en Telegram y envía `/start`.
3. Haz clic en "Abrir Mini App" para interactuar con la mini app.
4. Ingresa un mensaje en la mini app y envíalo; el bot lo recibirá.

## Estructura del Proyecto

- `bot.py`: Código del bot de Telegram.
- `web/`: Archivos de la mini app.
  - `index.html`: Página principal.
  - `styles.css`: Estilos.
  - `script.js`: Lógica JavaScript.
- `requirements.txt`: Dependencias de Python.
- `README.md`: Este archivo.

## Notas

- Para producción, asegúrate de que la mini app esté en un dominio HTTPS válido.
- El bot usa polling; para mayor escalabilidad, considera webhooks.