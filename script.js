document.getElementById('generateBtn').addEventListener('click', function() {
    const text = document.getElementById('textInput').value;
    if (text.trim() === '') {
        alert('Inserisci un testo!');
        return;
    }

    // Pulisce l'area del QR code
    document.getElementById('qrcode').innerHTML = '';

    // Genera il QR code
    new QRCode(document.getElementById('qrcode'), {
        text: text,
        width: 200,
        height: 200,
    });
});

// Carica i testi salvati all'avvio
document.addEventListener('DOMContentLoaded', function() {
    loadSavedTexts();
});

// Genera il QR code
document.getElementById('generateBtn').addEventListener('click', function() {
    const text = document.getElementById('textInput').value.trim();
    if (text === '') {
        alert('Inserisci un testo!');
        return;
    }

    // Genera il QR code
    document.getElementById('qrcode').innerHTML = '';
    new QRCode(document.getElementById('qrcode'), {
        text: "SIMULATE-LPR " + text,
        width: 200,
        height: 200,
    });

    // Salva il testo
    saveText(text);
});

// Salva un testo in localStorage
function saveText(text) {
    let savedTexts = JSON.parse(localStorage.getItem('savedTexts') || '[]');
    if (!savedTexts.includes(text)) {
        savedTexts.push(text);
        localStorage.setItem('savedTexts', JSON.stringify(savedTexts));
        loadSavedTexts();
    }
}

// Carica i testi salvati e li mostra nella lista
function loadSavedTexts() {
    const savedTexts = JSON.parse(localStorage.getItem('savedTexts') || '[]');
    const list = document.getElementById('savedTexts');
    list.innerHTML = '';

    savedTexts.forEach((text, index) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = text;
        span.className = 'saved-text';
        span.addEventListener('click', () => {
            document.getElementById('textInput').value = text;
            // Aggiorna il QR code con il testo selezionato
            document.getElementById('qrcode').innerHTML = '';
            new QRCode(document.getElementById('qrcode'), {
                text: "SIMULATE-LPR " + text,
                width: 200,
                height: 200,
            });
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            deleteText(index);
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// Elimina un testo dalla lista e da localStorage
function deleteText(index) {
    let savedTexts = JSON.parse(localStorage.getItem('savedTexts') || '[]');
    savedTexts.splice(index, 1);
    localStorage.setItem('savedTexts', JSON.stringify(savedTexts));
    loadSavedTexts();
}

// Funzione per abilitare/disabilitare il pulsante in base al contenuto del campo input
function updateGenerateButtonState() {
    const textInput = document.getElementById('textInput');
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.disabled = textInput.value.trim() === '';
}

// Ascolta l'evento 'input' sul campo di testo
document.getElementById('textInput').addEventListener('input', updateGenerateButtonState);

// Chiamata iniziale per impostare lo stato corretto all'avvio
document.addEventListener('DOMContentLoaded', function() {
    updateGenerateButtonState();
    loadSavedTexts();
});
