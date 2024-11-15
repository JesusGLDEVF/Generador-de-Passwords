/* Actividad:
Generador de Passwords
En este proyecto, practicarás los conceptos básicos del DOM con JavaScript y html que has visto hasta este momento.

Objetivo
El objetivo es crear un sitio que nos permita generar una contraseña segura, basado en el proyecto de frontend mentor: link


Apartir de la imagen propocionada maqueta y genera el formulario necesario para generar el html
El sitio debe ser capaza de generar una contraseña diferente de mas de 8 palabras usando simbolos, letras y numéros
Imagina las diferentes opciones que puedes implementar en tu página
Entregables
Para este proyecto, debes compartir la URL de los archivos utilizados y creados en el repositorio con la solución del problema descrito. Si tienes alguna duda de este ejercicio, no dudes en consultarla con tu sensei para que quede claro. También puedes solicitar una asesoría.

Crea los nuevos archivos (html, js, css) en tu repositorio en tu equipo local para solucionar el problema planteado. Puedes crear una carpeta para este problema
Crea uno o varios 'commit' en tu repositorio con estos archivos para guardar los cambios y crear nuevas versiones de tu proyecto conforme avances.
Si quieres agrega otro(s) archivo(s) que tengas con ejemplos de la clase o con algún ejemplo que tú hayas intentado mucho mejor.
Comparte la liga de Github de los archivos agregados a tu repositorio con la solución. También puede ser la liga de tu commit.
*/

/*Constantes a usar */

const passwordDisplay = document.getElementById('passwordDisplay');
const charLengthSlider = document.getElementById('charLengthSlider');
const charLengthValue = document.getElementById('charLengthValue');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const strengthBars = document.getElementById('strengthBars').children;

charLengthSlider.addEventListener('input', () => {
    charLengthValue.textContent = charLengthSlider.value;
});

/* Se obtienen los caracteres para la pass y como estara hecha */

generateBtn.addEventListener('click', () => {
    const length = parseInt(charLengthSlider.value);
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;

    const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    passwordDisplay.textContent = password;
    updateStrengthIndicator(password);
});

/* Boton de copiar */

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordDisplay.textContent).then(() => {
        alert('Contraseña copiada al portapapeles');
    });
});

function generatePassword(length, uppercase, lowercase, numbers, symbols) {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const num = "0123456789";
    const sym = "!@#$%^&*()_+[]{}|;:,.<>?";

    let allChars = "";
    if (uppercase) allChars += upper;
    if (lowercase) allChars += lower;
    if (numbers) allChars += num;
    if (symbols) allChars += sym;

    if (allChars === "") return "Selecciona al menos una opción";

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }
    return password; /* Se genera la contraseña!!!! */
}

function updateStrengthIndicator(password) {
    const strength = calculateStrength(password);
    for (let i = 0; i < strengthBars.length; i++) {
        if (i < strength) {
            strengthBars[i].classList.add('active');
        } else {
            strengthBars[i].classList.remove('active');
        }
    }
}

/* Calculador de fuerza (de este no estoy al 100 seguro si lo hice bien) */

function calculateStrength(password) {
    let strength = 0;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
}
