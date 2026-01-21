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
    const location = document.getElementById('regLocation').value;
    const user = document.getElementById('regUser').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const gender = document.getElementById('regGender').value;
    const age = document.getElementById('regAge').value;
    const pass = document.getElementById('regPass').value;
    const passConfirm = document.getElementById('regPassConfirm').value;
    let interests = [];
    if (document.getElementById('citas').checked) interests.push('CITAS');
    if (document.getElementById('ocasional').checked) interests.push('OCACIONAL');
    if (document.getElementById('swingers').checked) interests.push('SWINGGERS');
    if (document.getElementById('orgias').checked) interests.push('ORGIAS');
    if (location.trim() === '' || user.trim() === '' || email.trim() === '' || phone.trim() === '' || gender.trim() === '' || age.trim() === '' || pass.trim() === '' || passConfirm.trim() === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }
    if (pass !== passConfirm) {
        alert('Las contraseñas no coinciden.');
        return;
    }
    if (interests.length === 0) {
        alert('Por favor, selecciona al menos un interés.');
        return;
    }
    Telegram.WebApp.sendData(JSON.stringify({ action: 'register', location: location, user: user, email: email, phone: phone, gender: gender, age: age, pass: pass, interests: interests }));
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
    getLocation();
} else if (action === 'login') {
    document.getElementById('login').style.display = 'block';
    document.getElementById('default').style.display = 'none';
} else {
    document.getElementById('default').style.display = 'block';
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert('Geolocalización no soportada por este navegador.');
    }
}

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // Reverse geocoding
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => {
            const address = data.address;
            const country = address.country || 'Desconocido';
            const state = address.state || address.region || 'Desconocido';
            const city = address.city || address.town || address.village || 'Desconocido';
            document.getElementById('regLocation').value = `${country}, ${state}, ${city}`;
            document.getElementById('loading').style.display = 'none';
            enableFields();
        })
        .catch(err => {
            console.warn('Error en geocoding: ' + err);
            document.getElementById('regLocation').value = latitude + ', ' + longitude;
            document.getElementById('loading').style.display = 'none';
            enableFields();
        });
}

function enableFields() {
    document.getElementById('regUser').disabled = false;
    document.getElementById('regEmail').disabled = false;
    document.getElementById('regPhone').disabled = false;
    document.getElementById('regGender').disabled = false;
    document.getElementById('regAge').disabled = false;
    document.getElementById('regPass').disabled = false;
    document.getElementById('regPassConfirm').disabled = false;
    document.getElementById('citas').disabled = false;
    document.getElementById('ocasional').disabled = false;
    document.getElementById('swingers').disabled = false;
    document.getElementById('orgias').disabled = false;
    document.getElementById('registerBtn').disabled = false;
}

function error(err) {
    console.warn('Error obteniendo ubicación: ' + err.message);
    // No alert, just leave empty
}