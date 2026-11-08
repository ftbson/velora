export interface Product {
  id: string;
  title: string;
  brand: string;
  category: "VILLE" | "VTC" | "VTT";
  categoryLabel: string; // Ex: "City E-Bike"
  price: number;
  oldPrice?: number;
  discount?: string; // Ex: "-20 %"
  savings?: number;  // Économie en CHF
  rating: number;    // Ex: 5
  reviewsCount: number;
  motorTorque: string; // Ex: "65Nm"
  batteryCapacity: string; // Ex: "500Wh"
  image: string;
  badgePromo?: boolean;
  isNew?: boolean;
  colors?: string[]; // Hex/Couleurs
  description: string;
  specs: {
    frame: string;
    brakes: string;
    range: string;
    weight: string;
  };
}

export const productsData: Product[] = [
  {
    id: "velora-city-1",
    title: "VELORA URBAN PRO 500WH",
    brand: "VELORA",
    category: "VILLE",
    categoryLabel: "CITY E-BIKE",
    price: 2479.99,
    oldPrice: 3099.99,
    discount: "-20 %",
    savings: 620,
    rating: 5,
    reviewsCount: 14,
    motorTorque: "65 Nm",
    batteryCapacity: "500 Wh",
    image: "/img/products/city-1.jpg",
    badgePromo: true,
    colors: ["#8faec4", "#1d2a44"],
    description: "Das perfekte E-Bike für die Stadt. Elegant, komfortabel und mit starker Unterstützung für den täglichen Weg zur Arbeit.",
    specs: {
      frame: "Aluminium 6061 Hydroformed",
      brakes: "Hydraulische Scheibenbremsen Shimano",
      range: "Bis zu 110 km",
      weight: "22.5 kg"
    }
  },
  {
    id: "velora-city-2",
    title: "VELORA DIEM URBAN 630WH",
    brand: "VELORA",
    category: "VILLE",
    categoryLabel: "CITY E-BIKE",
    price: 2599.00,
    oldPrice: 4599.00,
    discount: "-43 %",
    savings: 2000,
    rating: 5,
    reviewsCount: 8,
    motorTorque: "85 Nm",
    batteryCapacity: "630 Wh",
    image: "/img/products/city-2.jpg",
    badgePromo: true,
    colors: ["#e3e6e1", "#59614d", "#24282b"],
    description: "Maximale Reichweite und Spitzenleistung für urbane Pendler. Ausgestattet mit automatischer Schaltung und integriertem Lichtsystem.",
    specs: {
      frame: "Leichtbau Aluminium",
      brakes: "Magura MT4 E-Stop",
      range: "Bis zu 140 km",
      weight: "21.8 kg"
    }
  },
  {
    id: "velora-vtc-1",
    title: "VELORA CROSS TREKKING 750WH",
    brand: "VELORA",
    category: "VTC",
    categoryLabel: "TREKKING E-BIKE",
    price: 2999.00,
    oldPrice: 3699.00,
    discount: "-18 %",
    savings: 700,
    rating: 4.9,
    reviewsCount: 22,
    motorTorque: "85 Nm",
    batteryCapacity: "750 Wh",
    image: "/img/products/vtc-1.jpg",
    badgePromo: true,
    colors: ["#2c3e50", "#7f8c8d"],
    description: "Der Allrounder für Straße und Schotterwege. Erkunden Sie die Schweiz mit höchstem Komfort und extremer Ausdauer.",
    specs: {
      frame: "Trekking Alloy Pro",
      brakes: "Shimano Deore XT",
      range: "Bis zu 160 km",
      weight: "24.1 kg"
    }
  },
  {
    id: "velora-vtt-1",
    title: "VELORA MOUNTAIN TRAIL RX",
    brand: "VELORA",
    category: "VTT",
    categoryLabel: "E-MOUNTAINBIKE",
    price: 3499.00,
    oldPrice: 4299.00,
    discount: "-19 %",
    savings: 800,
    rating: 5,
    reviewsCount: 31,
    motorTorque: "90 Nm",
    batteryCapacity: "750 Wh",
    image: "/img/products/vtt-1.jpg",
    badgePromo: true,
    colors: ["#D52B1E", "#111111"],
    description: "Meistern Sie die steilsten Schweizer Alpentrails. Maximale Power und erstklassige Vollfederung für anspruchsvolles Gelände.",
    specs: {
      frame: "Full Carbon Trail",
      brakes: "SRAM Code RSC 4-Kolben",
      range: "Bis zu 120 km (Trail Mode)",
      weight: "20.9 kg"
    }
  }
];