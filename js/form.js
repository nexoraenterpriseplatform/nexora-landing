// ====================================================
// NEXORA Beta Form — Release 1.0 RC1
// ====================================================

const leadForm = document.getElementById("leadForm");

function showFormMessage(type, text) {
  const statusRegion = document.getElementById("formStatus") || leadForm;
  const existingMessages = leadForm.querySelectorAll(".form-success, .form-error");
  existingMessages.forEach((message) => message.remove());

  const message = document.createElement("div");
  message.className = type === "success" ? "form-success" : "form-error";
  message.textContent = text;

  statusRegion.appendChild(message);
}

function setFormLoading(isLoading) {
  const button = leadForm.querySelector("button[type='submit']");
  const fields = leadForm.querySelectorAll("input, select, textarea, button");

  fields.forEach((field) => {
    field.disabled = isLoading;
  });

  if (button) {
    button.textContent = isLoading
      ? "Enviando..."
      : "Quero fazer parte da NEXORA";
  }
}

function getFormPayload(form) {
  const formData = new FormData(form);

  return {
    nome: formData.get("nome")?.trim() || "",
    empresa: formData.get("empresa")?.trim() || "",
    cargo: formData.get("cargo")?.trim() || "",
    email: formData.get("email")?.trim() || "",
    whatsapp: formData.get("whatsapp")?.trim() || "",
    segmento: formData.get("segmento") || "",
    porte: formData.get("porte") || "",
    mensagem: formData.get("mensagem")?.trim() || "",
    origem: "NEXORA Official Website",
    release: "1.0-rc1",
    data_envio: new Date().toISOString()
  };
}

function validatePayload(payload) {
  if (!payload.nome) return "Informe seu nome completo.";
  if (!payload.empresa) return "Informe o nome da empresa.";
  if (!payload.cargo) return "Informe seu cargo.";
  if (!payload.email) return "Informe seu e-mail.";
  if (!payload.segmento) return "Selecione o segmento da empresa.";
  if (!payload.porte) return "Selecione o número de funcionários.";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(payload.email)) {
    return "Informe um e-mail válido.";
  }

  return null;
}

if (leadForm) {
  leadForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const payload = getFormPayload(leadForm);
    const validationError = validatePayload(payload);

    if (validationError) {
      showFormMessage("error", validationError);
      return;
    }

    const endpoint = window.NEXORA_CONFIG?.GOOGLE_SHEETS_WEB_APP_URL;

    if (!endpoint) {
      showFormMessage(
        "success",
        "Cadastro validado com sucesso. A integração com Google Sheets será ativada na próxima etapa."
      );
      leadForm.reset();
      return;
    }

    try {
      setFormLoading(true);

      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      showFormMessage(
        "success",
        "Cadastro recebido. Obrigado por fazer parte da construção da NEXORA."
      );

      leadForm.reset();
    } catch (error) {
      showFormMessage(
        "error",
        "Não foi possível enviar agora. Tente novamente em alguns instantes."
      );
    } finally {
      setFormLoading(false);
    }
  });
}
