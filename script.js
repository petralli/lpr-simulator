// Initialize once DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  const textInput = document.getElementById("textInput");
  const generateBtn = document.getElementById("generateBtn");
  const clearBtn = document.getElementById("clearBtn");

  function generateQRCodeFromInput() {
    const text = textInput.value.trim();
    if (text === "") {
      alert("Inserisci un testo!");
      return;
    }

    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), {
      text: "SIMULATE-LPR " + text,
      width: 200,
      height: 200,
    });

    saveText(text);
  }

  // Generate button
  if (generateBtn) {
    generateBtn.addEventListener("click", generateQRCodeFromInput);
  }

  // Clear button
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      textInput.value = "";
      updateGenerateButtonState();
      textInput.focus();
      document.getElementById("qrcode").innerHTML = "";
    });
  }

  // Input listener
  if (textInput) {
    textInput.addEventListener("input", updateGenerateButtonState);
  }

  // Load saved texts and initialize button states
  loadSavedTexts();
  updateGenerateButtonState();
});

// Salva un testo in localStorage
function saveText(text) {
  let savedTexts = JSON.parse(localStorage.getItem("savedTexts") || "[]");
  if (!savedTexts.includes(text)) {
    savedTexts.push(text);
    localStorage.setItem("savedTexts", JSON.stringify(savedTexts));
    loadSavedTexts();
  }
}

// Carica i testi salvati e li mostra nella lista
function loadSavedTexts() {
  const savedTexts = JSON.parse(localStorage.getItem("savedTexts") || "[]");
  const list = document.getElementById("savedTexts");
  list.innerHTML = "";

  savedTexts.forEach((text, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;
    span.className = "saved-text";
    span.addEventListener("click", () => {
      document.getElementById("textInput").value = text;
      // Aggiorna il QR code con il testo selezionato
      document.getElementById("qrcode").innerHTML = "";
      new QRCode(document.getElementById("qrcode"), {
        text: "SIMULATE-LPR " + text,
        width: 200,
        height: 200,
      });
      // Ensure buttons update when selecting a saved text
      updateGenerateButtonState();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteText(index);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// Elimina un testo dalla lista e da localStorage
function deleteText(index) {
  let savedTexts = JSON.parse(localStorage.getItem("savedTexts") || "[]");
  savedTexts.splice(index, 1);
  localStorage.setItem("savedTexts", JSON.stringify(savedTexts));
  loadSavedTexts();
}

// Funzione per abilitare/disabilitare il pulsante in base al contenuto del campo input
function updateGenerateButtonState() {
  const textInput = document.getElementById("textInput");
  const generateBtn = document.getElementById("generateBtn");
  generateBtn.disabled = textInput.value.trim() === "";
  const clearBtn = document.getElementById("clearBtn");
  clearBtn.disabled = textInput.value.trim() === "";
}

// Ascolta l'evento 'input' sul campo di testo
document
  .getElementById("textInput")
  .addEventListener("input", updateGenerateButtonState);

// Ascolta il click sul pulsante Clear per svuotare il campo di input
const clearBtnEl = document.getElementById("clearBtn");
if (clearBtnEl) {
  clearBtnEl.addEventListener("click", function () {
    const input = document.getElementById("textInput");
    input.value = "";
    updateGenerateButtonState();
    input.focus();
    document.getElementById("qrcode").innerHTML = "";
  });
}

// Chiamata iniziale per impostare lo stato corretto all'avvio
document.addEventListener("DOMContentLoaded", function () {
  updateGenerateButtonState();
  loadSavedTexts();
});
