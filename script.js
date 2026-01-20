function sendData() {
    const message = document.getElementById('messageInput').value;
    if (message.trim() === '') {
        alert('Por favor, ingresa un mensaje.');
        return;
    }
    // Enviar datos al bot
    Telegram.WebApp.sendData(JSON.stringify({ message: message }));
    // Cerrar la mini app
    Telegram.WebApp.close();
}

function register() {
    Telegram.WebApp.sendData(JSON.stringify({ action: 'register' }));
    Telegram.WebApp.close();
}

function login() {
    Telegram.WebApp.sendData(JSON.stringify({ action: 'login' }));
    Telegram.WebApp.close();
}

function closeApp() {
    Telegram.WebApp.close();
}

// Check URL params
const urlParams = new URLSearchParams(window.location.search);
const action = urlParams.get('action');
if (action === 'register') {
    document.getElementById('register').style.display = 'block';
    document.getElementById('default').style.display = 'none';
} else if (action === 'login') {
    document.getElementById('login').style.display = 'block';
    document.getElementById('default').style.display = 'none';
} else {
    document.getElementById('default').style.display = 'block';
}