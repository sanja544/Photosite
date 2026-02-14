const CONTACTS = {
  phonePretty: "+38 (098) 116-46-88",
  telegramUsername: "withlove_oleksandr",
  viberBusinessUrl: "https://connect.viber.com/business/63097086-bc9e-11ef-acb5-d256a1b504ef?utm_source=manage&utm_medium=copy_link"
};

function safe(v) { return (v ?? "").toString().trim(); }

function buildDeliveryText(fields) {
  const delivery = safe(fields.delivery);

  if (delivery === "ukrposhta") {
    const idx = safe(fields.postalIndex);
    const addr = safe(fields.ukrAddress);
    return `Укрпошта\nІндекс: ${idx}${addr ? `\nАдреса: ${addr}` : ""}`;
  }

  if (delivery === "novaposhta") {
    const region = safe(fields.region);
    const city = safe(fields.city);
    const branch = safe(fields.branch);
    return `Нова Пошта\nОбласть: ${region}\nМісто: ${city}\nВідділення/поштомат: ${branch}`;
  }

  return "—";
}

function buildOrderText(data) {
  const lines = [];
  lines.push("🟢 НОВЕ ЗАМОВЛЕННЯ");
  lines.push(`Тип: ${data.type}`);

  if (data.type === "Друк фото 10×15") {
    lines.push(`Кількість фото: ${data.photoCount}`);
    lines.push(`Сума: ${data.totalPrice} грн`);
  } else if (data.type === "Фото на полотні") {
    lines.push(`Розмір полотна: ${data.canvasSize}`);
    lines.push(`Сума: ${data.totalPrice} грн`);
  }

  lines.push("");
  lines.push("Контактні дані:");
  lines.push(`ПІБ: ${data.fullName}`);
  lines.push(`Телефон: ${data.phone}`);

  lines.push("");
  lines.push("Доставка:");
  lines.push(data.deliveryText);

  if (data.notes) {
    lines.push("");
    lines.push(`Побажання: ${data.notes}`);
  }

  lines.push("");
  lines.push("Фото прикріплюю в цьому чаті ⬇️");

  return lines.join("\n");
}

function openTelegram(message) {
  const url = `https://t.me/${CONTACTS.telegramUsername}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function openViberBusiness() {
  window.open(CONTACTS.viberBusinessUrl, "_blank", "noopener,noreferrer");
}

function copyToClipboard(text) {
  if (!navigator.clipboard) {
    alert("Скопіюйте текст вручну з поля нижче.");
    return;
  }
  navigator.clipboard.writeText(text).then(
    () => alert("Текст замовлення скопійовано. Вставте його в чат і прикріпіть фото."),
    () => alert("Не вдалося скопіювати. Скопіюйте вручну з поля нижче.")
  );
}

window.OrderShare = {
  CONTACTS,
  buildDeliveryText,
  buildOrderText,
  openTelegram,
  openViberBusiness,
  copyToClipboard
};
