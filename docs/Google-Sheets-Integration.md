# Google Sheets Integration — NEXORA Beta Program

Este documento prepara a integração gratuita entre:

Website → Google Apps Script → Google Sheets

## 1. Criar a planilha

Crie uma planilha no Google Sheets com o nome:

```text
NEXORA - Programa Beta Leads
```

Na primeira linha, crie as colunas:

```text
data_envio | nome | empresa | cargo | email | whatsapp | segmento | porte | mensagem | origem | release
```

## 2. Criar o Apps Script

No Google Sheets:

```text
Extensões → Apps Script
```

Cole o código abaixo:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.data_envio || new Date().toISOString(),
    data.nome || "",
    data.empresa || "",
    data.cargo || "",
    data.email || "",
    data.whatsapp || "",
    data.segmento || "",
    data.porte || "",
    data.mensagem || "",
    data.origem || "NEXORA Official Website",
    data.release || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Publicar como Web App

No Apps Script:

```text
Implantar → Nova implantação → Aplicativo da Web
```

Configurações:

```text
Executar como: Eu
Quem pode acessar: Qualquer pessoa
```

Copie a URL gerada.

## 4. Ativar no Website

Abra:

```text
js/config.js
```

Cole a URL aqui:

```javascript
window.NEXORA_CONFIG = {
  GOOGLE_SHEETS_WEB_APP_URL: "COLE_A_URL_AQUI"
};
```

Depois salve e teste o formulário.

## Status

Release 0.9.2 deixa o formulário pronto para integração.
A URL do Apps Script será adicionada quando a planilha oficial for criada.
