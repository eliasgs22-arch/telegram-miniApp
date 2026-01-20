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
BOT_TOKEN = '8471552191:AAGFFao1rlle1_5Z7wnS8F7WrrXc4nAxquY'
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
        if 'action' in data:
            if data['action'] == 'register':
                user = data.get('user', 'Sin usuario')
                email = data.get('email', 'Sin email')
                phone = data.get('phone', 'Sin celular')
                gender = data.get('gender', 'Sin sexo')
                age = data.get('age', 'Sin edad')
                passw = data.get('pass', '')
                users = load_users()
                if any(u['user'] == user for u in users):
                    bot.send_message(message.chat.id, f"El usuario {user} ya existe.")
                else:
                    users.append({'user': user, 'email': email, 'phone': phone, 'gender': gender, 'age': age, 'pass': passw})
                    save_users(users)
                    bot.send_message(message.chat.id, f"Registro completado para {user}.")
            elif data['action'] == 'login':
                user = data.get('user', 'Sin usuario')
                passw = data.get('pass', '')
                users = load_users()
                if any(u['user'] == user and u['pass'] == passw for u in users):
                    bot.send_message(message.chat.id, f"Inicio de sesión exitoso para {user}.")
                else:
                    bot.send_message(message.chat.id, "Usuario o contraseña incorrectos.")
        else:
            user_message = data.get('message', 'Sin mensaje')
            bot.send_message(message.chat.id, f"Recibí tu mensaje desde la mini app: {user_message}")
    except json.JSONDecodeError:
        bot.send_message(message.chat.id, "Error al procesar los datos de la mini app.")

if __name__ == '__main__':
    print("Bot iniciado...")
    bot.polling()
