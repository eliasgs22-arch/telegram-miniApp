import telebot
import json
import os

users_file = 'users.json'

def load_users():
    try:
        with open(users_file, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_users(users):
    with open(users_file, 'w') as f:
        json.dump(users, f)

# Reemplaza 'TU_BOT_TOKEN' con el token real de tu bot de Telegram
BOT_TOKEN = '8471552191:AAHfHoN20L7vTBT9lTQS5zhPnHoctgi_9dk'
bot = telebot.TeleBot(BOT_TOKEN)

# URL de la mini app (debe ser HTTPS para producción)
# Para desarrollo local, usa ngrok o similar para exponer el servidor web
WEB_APP_URL = 'https://telegram-miniapp-49e6.onrender.com'  # Cambia esto

@bot.message_handler(commands=['start'])
def start(message):
    markup = telebot.types.InlineKeyboardMarkup()
    button1 = telebot.types.InlineKeyboardButton(text="REGISTRARTE", web_app=telebot.types.WebAppInfo(url=WEB_APP_URL + "?action=register"))
    button2 = telebot.types.InlineKeyboardButton(text="INICIAR SESIÓN", web_app=telebot.types.WebAppInfo(url=WEB_APP_URL + "?action=login"))
    markup.add(button1)
    markup.add(button2)
    bot.send_message(message.chat.id, "¡Bienvenido! Selecciona una opción:", reply_markup=markup)

@bot.message_handler(content_types=['web_app_data'])
def handle_web_app_data(message):
    try:
        data = json.loads(message.web_app_data.data)
        print("Received data:", data)
        if 'action' in data:
            if data['action'] == 'location_denied':
                bot.send_message(message.chat.id, "Ubicación obligatoria para registrarse.")
            elif data['action'] == 'register':
                location = data.get('location', 'Sin ubicación')
                user = data.get('user', 'Sin usuario')
                email = data.get('email', 'Sin email')
                phone = data.get('phone', 'Sin celular')
                gender = data.get('gender', 'Sin sexo')
                age = data.get('age', 'Sin edad')
                passw = data.get('pass', '')
                interests = data.get('interests', [])
                users = load_users()
                if any(u['user'] == user for u in users):
                    bot.send_message(message.chat.id, f"El usuario {user} ya existe.")
                else:
                    users.append({'location': location, 'user': user, 'email': email, 'phone': phone, 'gender': gender, 'age': age, 'pass': passw, 'interests': interests})
                    save_users(users)
                    bot.send_message(message.chat.id, f"Registro completado para {user} con intereses: {', '.join(interests)}.")
            elif data['action'] == 'login':
                login_input = data.get('user', '')
                passw = data.get('pass', '')
                users = load_users()
                user_exists = any(u['email'] == login_input or u['phone'] == login_input for u in users)
                if user_exists:
                    # Check password
                    found = any((u['email'] == login_input or u['phone'] == login_input) and u['pass'] == passw for u in users)
                    if found:
                        user_name = next(u['user'] for u in users if (u['email'] == login_input or u['phone'] == login_input) and u['pass'] == passw)
                        bot.send_message(message.chat.id, f"Inicio de sesión exitoso para {user_name}.")
                    else:
                        bot.send_message(message.chat.id, "Contraseña incorrecta.")
                else:
                    bot.send_message(message.chat.id, "Este usuario no se encuentra registrado.")
        else:
            user_message = data.get('message', 'Sin mensaje')
            bot.send_message(message.chat.id, f"Recibí tu mensaje desde la mini app: {user_message}")
    except json.JSONDecodeError:
        bot.send_message(message.chat.id, "Error al procesar los datos de la mini app.")

if __name__ == '__main__':
    print("Bot iniciado...")
    bot.polling()
