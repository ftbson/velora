export const SITE_CONFIG = {
  name: "VELORA",
  phone: "+41 76 752 94 93",
  phoneRaw: "+41767529493",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "kontact@veloras.ch",
  address: "Schweiz",
  openingHours: "Mo. – Fr.: 08:30 – 18:00 | Sa.: 09:00 – 16:00",
  shipping: {
    isFree: true,
    title: "Kostenloser Versand",
    subtitle:
      "Kostenlose Lieferung für alle Bestellungen in die Schweiz und nach Liechtenstein.",
    delay: "Schnelle Lieferung innerhalb von 2 bis 4 Werktagen",
  },
};
