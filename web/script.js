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
    const user = document.getElementById('regUser').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const pass = document.getElementById('regPass').value;
    if (user.trim() === '' || email.trim() === '' || phone.trim() === '' || pass.trim() === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }
    Telegram.WebApp.sendData(JSON.stringify({ action: 'register', user: user, email: email, phone: phone, pass: pass }));
    Telegram.WebApp.close();
}

function login() {
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;
    if (user.trim() === '' || pass.trim() === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }
    Telegram.WebApp.sendData(JSON.stringify({ action: 'login', user: user, pass: pass }));
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