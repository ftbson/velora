export type ProductCategory =
  | "VILLE"
  | "VTC"
  | "VTT"
  | "ACCESSOIRES"
  | "Kleidung"
  | "kinder";

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  savings?: number;
  rating?: number;
  reviewsCount?: number;
  motorTorque?: string;
  batteryCapacity?: string;
  image: string;
  imageFile?: string;
  badgePromo?: boolean;
  isNew?: boolean;
  isDraft?: boolean;
  colors?: string[];
  description: string;
  details?: { label: string; value: string }[];
  specs?: {
    frame: string;
    brakes: string;
    range: string;
    weight: string;
  };
}

const categoryNames: Record<string, string> = {
  VILLE: "City-E-Bikes",
  VTC: "Trekking-E-Bikes",
  VTT: "E-Mountainbikes",
  ACCESSOIRES: "Zubehör",
  VETEMENTS: "Fahrradbekleidung",
  ENFANTS: "Kinderfahrräder",
  Kleidung: "Fahrradbekleidung",
  kinder: "Kinderfahrräder",
};

const subcategoryNames: Record<string, string> = {
  "CITY E-BIKE": "City-E-Bike",
  "LONGTAIL CITY E-BIKE": "Longtail-City-E-Bike",
  "COMPACT CITY E-BIKE": "Kompaktes City-E-Bike",
  "PREMIUM CITY E-BIKE": "Premium-City-E-Bike",
  "CARGO E-BIKE": "Cargo-E-Bike",
  "TREKKING E-BIKE": "Trekking-E-Bike",
  "ALL-ROAD E-BIKE": "Allroad-E-Bike",
  "SUV ALL-ROAD E-BIKE": "SUV-Allroad-E-Bike",
  "SPORT VTC E-BIKE": "Sportliches Trekking-E-Bike",
  "HARDTAIL E-MOUNTAINBIKE": "E-Mountainbike (Hardtail)",
  "FULL-SUSPENSION E-MTB": "E-Mountainbike (Fully)",
  "ENDURO E-MOUNTAINBIKE": "Enduro-E-Mountainbike",
  "EQUIPPED E-MTB HARDTAIL": "Ausgestattetes E-Mountainbike (Hardtail)",
  "ULTRA-LIGHT E-MTB": "Leichtes E-Mountainbike",
  "JUGEND-GRAVELBIKES": "Jugend-Gravelbikes",
  kinderFAHRRÄDER: "Kinderfahrräder",
};

export function getProductCategoryName(category: string): string {
  return categoryNames[category] ?? category;
}

export function getProductSubcategoryName(categoryLabel: string): string {
  return subcategoryNames[categoryLabel] ?? categoryLabel;
}

const bikeProducts: Product[] = [
  // ==========================================
  // KATEGORIE : VILLE (CITY E-BIKES) - 11 Modèles
  // ==========================================
  {
    id: "city-cube-supreme-pro",
    title: "CUBE Supreme Hybrid Pro 625",
    brand: "CUBE",
    category: "VILLE",
    categoryLabel: "CITY E-BIKE",
    price: 2599.0,
    oldPrice: 3299.0,
    discount: "-21 %",
    savings: 700,
    rating: 4.9,
    reviewsCount: 18,
    motorTorque: "75 Nm",
    batteryCapacity: "625 Wh",
    image: "/img/prod/city-cube-supreme-pro.jpg",
    badgePromo: true,
    description:
      "Eleganter Tiefeinsteiger für den städtischen Alltag mit wartungsarmen Riemenantrieb und kraftvollem Bosch-Performance-Line-Motor.",
    specs: {
      frame: "Aluminium Superlite Easy Entry",
      brakes: "Shimano BR-MT410 Hydraulische Scheibenbremsen",
      range: "Bis zu 130 km",
      weight: "24.6 kg",
    },
  },
  {
    id: "city-o2feel-iswan-8",
    title: "O2FEEL iSwan City Boost 8.1 - 540",
    brand: "O2FEEL",
    category: "VILLE",
    categoryLabel: "CITY E-BIKE",
    price: 2499.0,
    oldPrice: 3999.0,
    discount: "-38 %",
    savings: 1500,
    rating: 5.0,
    reviewsCount: 12,
    motorTorque: "60 Nm",
    batteryCapacity: "540 Wh",
    image: "/img/prod/city-o2feel-iswan-8.jpg",
    badgePromo: true,
    description:
      "Französisches Design trifft auf Shimano-Technologie. Sehr geschmeidiges Fahrgefühl für stilvolle Stadtfahrten.",
    specs: {
      frame: "Aluminium 6061 6061 T6 Hydroformed",
      brakes: "Shimano MT200 Hydraulisch",
      range: "Bis zu 120 km",
      weight: "22.8 kg",
    },
  },
  {
    id: "city-granville-excellence",
    title: "GRANVILLE E-Excellence ENVIOLO 625",
    brand: "GRANVILLE",
    category: "VILLE",
    categoryLabel: "CITY E-BIKE",
    price: 2349.0,
    oldPrice: 4099.0,
    discount: "-43 %",
    savings: 1750,
    rating: 4.8,
    reviewsCount: 9,
    motorTorque: "65 Nm",
    batteryCapacity: "625 Wh",
    image: "/img/prod/city-granville-excellence.jpg",
    badgePromo: true,
    description:
      "Luxuriöses City-E-Bike mit stufenloser Enviolo-Schaltung für nahtloses Schalten an jeder Ampel.",
    specs: {
      frame: "Granville Alloy Premium Wave",
      brakes: "Shimano MT200 160mm",
      range: "Bis zu 140 km",
      weight: "25.1 kg",
    },
  },
  {
    id: "city-benno-boost-10d",
    title: "BENNO BIKES Boost 10D EVO 5",
    brand: "BENNO BIKES",
    category: "VILLE",
    categoryLabel: "LONGTAIL CITY E-BIKE",
    price: 2999.0,
    oldPrice: 5099.0,
    discount: "-41 %",
    savings: 2100,
    rating: 5.0,
    reviewsCount: 24,
    motorTorque: "65 Nm",
    batteryCapacity: "500 Wh",
    image: "/img/prod/city-benno-boost-10d.jpg",
    badgePromo: true,
    description:
      "Kompaktes Utility-E-Bike zum mühelosen Transport von Einkauf, Kinckern oder schweren Lasten mitten in der Stadt.",
    specs: {
      frame: "6061 Aluminum Alloy Frame with Front Tray Mounts",
      brakes: "Magura MT30 4-Piston Hydraulic Disc",
      range: "Bis zu 100 km",
      weight: "26.0 kg",
    },
  },

  {
    id: "city-uto-ex-eovolt",
    title: "UTO EX EVOALT Evening Origins",
    brand: "UTO / EVOALT",
    category: "VILLE",
    categoryLabel: "COMPACT CITY E-BIKE",
    price: 2199.0,
    rating: 4.6,
    reviewsCount: 7,
    motorTorque: "40 Nm",
    batteryCapacity: "378 Wh",
    image: "/img/prod/city-uto-evening.jpg",
    badgePromo: false,
    description:
      "Kompaktes 24-Zoll City-E-Bike für agile Wendigkeit im dichten Stadtverkehr und einfache Lagerung.",
    specs: {
      frame: "Aluminium 6061 Compact",
      brakes: "Nutt Hydraulische Disc",
      range: "Bis zu 70 km",
      weight: "19.8 kg",
    },
  },
  {
    id: "city-gitane-glife-2",
    title: "GITANE G-Life Compact 2",
    brand: "GITANE",
    category: "VILLE",
    categoryLabel: "COMPACT CITY E-BIKE",
    price: 2599.0,
    rating: 4.8,
    reviewsCount: 11,
    motorTorque: "40 Nm",
    batteryCapacity: "482 Wh",
    image: "/img/prod/city-gitane-glife-2.jpg",
    badgePromo: false,
    description:
      "Stadtrad mit robustem Front- und Heckgepäckträger für schnelles Be- und Entladen im Alltag.",
    specs: {
      frame: "Aluminium 6061 T6 Compact City",
      brakes: "Shimano MT200 160mm",
      range: "Bis zu 85 km",
      weight: "21.2 kg",
    },
  },

  {
    id: "city-orbea-diem-30",
    title: "ORBEA Diem 30 - 540Wh",
    brand: "ORBEA",
    category: "VILLE",
    categoryLabel: "PREMIUM CITY E-BIKE",
    price: 3799.0,
    rating: 5.0,
    reviewsCount: 6,
    motorTorque: "85 Nm",
    batteryCapacity: "540 Wh",
    image: "/img/prod/city-orbea-diem-30.jpg",
    badgePromo: false,
    isNew: true,
    description:
      "Ultra-modernes Design mit nahtlos integrierten Scheinwerfern und bärenstarkem Shimano EP6 Motor.",
    specs: {
      frame: "Orbea Diem Hydroformed Alloy Internal Cable Routing",
      brakes: "Shimano Cues U8000 Hydraulic Disc",
      range: "Bis zu 120 km",
      weight: "21.5 kg",
    },
  },
  {
    id: "city-cube-cargo-hybrid",
    title: "CUBE Cargo Hybrid Dual 1000",
    brand: "CUBE",
    category: "VILLE",
    categoryLabel: "CARGO E-BIKE",
    price: 3999.0,
    oldPrice: 6498.99,
    discount: "-38 %",
    savings: 2500,
    rating: 4.9,
    reviewsCount: 19,
    motorTorque: "85 Nm",
    batteryCapacity: "1000 Wh",
    image: "/img/prod/city-cube-cargo-hybrid.jpg",
    badgePromo: true,
    description:
      "Das ultimative Lastenvelo mit Doppelakku für Familien und urbane Logistik ohne Auto.",
    specs: {
      frame: "High Performance Aluminium Cargo Box",
      brakes: "Magura CMo Hydraulic Disc 4-Piston",
      range: "Bis zu 180 km",
      weight: "48.5 kg",
    },
  },

  // ==========================================
  // KATEGORIE : VTC (TREKKING / ALL-WAY) - 11 Modèles
  // ==========================================
  {
    id: "vtc-cube-kathmandu-one-800",
    title: "CUBE Kathmandu Hybrid One 800",
    brand: "CUBE",
    category: "VTC",
    categoryLabel: "TREKKING E-BIKE",
    price: 3359.0,
    rating: 5.0,
    reviewsCount: 29,
    motorTorque: "85 Nm",
    batteryCapacity: "800 Wh",
    image: "/img/prod/vtc-cube-kathmandu-800.jpg",
    badgePromo: false,
    isNew: true,
    description:
      "Der Maßstab für Trekking-E-Bikes: Ausgestattet mit der neuesten Bosch 800Wh Batterie für endlose Touren.",
    specs: {
      frame: "Aluminium Superlite Gravity Casting Technology",
      brakes: "Shimano BR-MT200 Hydraulisch",
      range: "Bis zu 175 km",
      weight: "26.8 kg",
    },
  },
  {
    id: "vtc-cube-nuride-perf-720",
    title: "CUBE Nuride Hybrid Performance 720",
    brand: "CUBE",
    category: "VTC",
    categoryLabel: "ALL-ROAD E-BIKE",
    price: 2899.0,
    oldPrice: 3499.0,
    discount: "-17 %",
    savings: 600,
    rating: 4.9,
    reviewsCount: 21,
    motorTorque: "75 Nm",
    batteryCapacity: "720 Wh",
    image: "/img/prod/vtc-cube-nuride-720.jpg",
    badgePromo: true,
    description:
      "Kombiniert den Komfort eines Tiefeinsteigers mit der Geländegängigkeit eines 29-Zoll-Mountainbikes.",
    specs: {
      frame: "Aluminium Superlite Agile Ride Geometry",
      brakes: "Shimano BR-MT200 (180/180)",
      range: "Bis zu 150 km",
      weight: "24.5 kg",
    },
  },

  {
    id: "vtc-orbea-kemen-suv-30",
    title: "ORBEA Kemen SUV 30 - 540Wh",
    brand: "ORBEA",
    category: "VTC",
    categoryLabel: "SUV ALL-ROAD E-BIKE",
    price: 3499.0,
    rating: 5.0,
    reviewsCount: 17,
    motorTorque: "85 Nm",
    batteryCapacity: "540 Wh",
    image: "/img/prod/vtc-orbea-kemen-suv.jpg",
    badgePromo: false,
    isNew: true,
    description:
      "Das SUV unter den E-Bikes. Grobe Stollenreifen und 85Nm Shimano EP8 Motor für jedes Schweizer Terrain.",
    specs: {
      frame: "Orbea Kemen Mid-Pitch Hydroformed Alloy",
      brakes: "Magura MT30 Hydraulic Disc",
      range: "Bis zu 130 km",
      weight: "23.4 kg",
    },
  },

  {
    id: "vtc-cube-touring-hybrid-one",
    title: "CUBE Touring Hybrid ONE 600",
    brand: "CUBE",
    category: "VTC",
    categoryLabel: "TREKKING E-BIKE",
    price: 2699.0,
    rating: 4.8,
    reviewsCount: 33,
    motorTorque: "75 Nm",
    batteryCapacity: "600 Wh",
    image: "/img/prod/vtc-cube-touring-one.jpg",
    badgePromo: false,
    description:
      "Der bewährte Dauerbrenner von CUBE mit integriertem Gepäckträger und Schutzblechen ab Werk.",
    specs: {
      frame: "Aluminium Superlite Efficient Comfort Geometry",
      brakes: "Shimano BR-MT200",
      range: "Bis zu 130 km",
      weight: "25.4 kg",
    },
  },

  {
    id: "vtc-mondraker-prime-x",
    title: "MONDRAKER Prime X 625",
    brand: "MONDRAKER",
    category: "VTC",
    categoryLabel: "SPORT VTC E-BIKE",
    price: 3599.0,
    oldPrice: 4299.0,
    discount: "-16 %",
    savings: 700,
    rating: 5.0,
    reviewsCount: 11,
    motorTorque: "85 Nm",
    batteryCapacity: "625 Wh",
    image: "/img/prod/vtc-mondraker-primex.jpg",
    badgePromo: true,
    description:
      "Sportlich-aggressives VTC mit Mountainbike-Genen und Forward Geometry für maximale Kontrolle.",
    specs: {
      frame: "Prime X 6061 Xtralite Alloy Forward Geometry",
      brakes: "SRAM Level T 200/180mm",
      range: "Bis zu 135 km",
      weight: "22.6 kg",
    },
  },

  // ==========================================
  // KATEGORIE : VTT (E-MOUNTAINBIKES) - 10 Modèles
  // ==========================================
  {
    id: "vtt-cube-reaction-hybrid-pro-800",
    title: "CUBE Reaction Hybrid Pro 800",
    brand: "CUBE",
    category: "VTT",
    categoryLabel: "HARDTAIL E-MOUNTAINBIKE",
    price: 3059.1,
    oldPrice: 3999.0,
    discount: "-23 %",
    savings: 940,
    rating: 5.0,
    reviewsCount: 42,
    motorTorque: "85 Nm",
    batteryCapacity: "800 Wh",
    image: "/img/prod/vtt-cube-reaction-800.jpg",
    badgePromo: true,
    description:
      "Das legendäre E-Hardtail mit dem neuen Bosch Smart System und riesigem 800Wh Akku für lange Alpentouren.",
    specs: {
      frame: "Aluminium Superlite Advanced Hydroforming 29er",
      brakes: "Shimano BR-MT200 Hydraulic Disc",
      range: "Bis zu 160 km",
      weight: "23.9 kg",
    },
  },
  {
    id: "vtt-cube-stereo-one44-at-800",
    title: "CUBE Stereo Hybrid ONE44 HPC AT 800",
    brand: "CUBE",
    category: "VTT",
    categoryLabel: "FULL-SUSPENSION E-MTB",
    price: 5999.0,
    rating: 5.0,
    reviewsCount: 19,
    motorTorque: "85 Nm",
    batteryCapacity: "800 Wh",
    image: "/img/prod/vtt-cube-stereo-one44.jpg",
    badgePromo: false,
    isNew: true,
    description:
      "High-End All-Mountain Carbon E-MTB mit Fox Factory Fahrwerk und drahtloser SRAM AXS Schaltung.",
    specs: {
      frame: "C:62 Monocoque Carbon Front Triangle, 6061 Alloy Rear",
      brakes: "Magura MT7 Hydraulic Disc (203/203)",
      range: "Bis zu 140 km (Trail Mode)",
      weight: "22.8 kg",
    },
  },
  {
    id: "vtt-mondraker-scree-s-600",
    title: "MONDRAKER Scree S 600Wh",
    brand: "MONDRAKER",
    category: "VTT",
    categoryLabel: "FULL-SUSPENSION E-MTB",
    price: 3999.0,
    oldPrice: 4999.0,
    discount: "-20 %",
    savings: 1000,
    rating: 4.9,
    reviewsCount: 15,
    motorTorque: "120 Nm",
    batteryCapacity: "600 Wh",
    image: "/img/prod/vtt-mondraker-scree.jpg",
    badgePromo: true,
    description:
      "Brutale Power mit unglaublichen 120Nm Drehmoment für steilste Uphill-Umsätze im alpinen Gelände.",
    specs: {
      frame: "Scree 6061 Alloy Zero Suspension System 150mm",
      brakes: "SRAM DB8 4-Piston Hydraulic",
      range: "Bis zu 110 km",
      weight: "24.1 kg",
    },
  },

  {
    id: "vtt-rock-machine-vyory-e90",
    title: "ROCK MACHINE Vyory E90-29",
    brand: "ROCK MACHINE",
    category: "VTT",
    categoryLabel: "ENDURO E-MOUNTAINBIKE",
    price: 2999.0,
    oldPrice: 4400.0,
    discount: "-32 %",
    savings: 1401,
    rating: 4.7,
    reviewsCount: 12,
    motorTorque: "85 Nm",
    batteryCapacity: "725 Wh",
    image: "/img/prod/vtt-rock-machine-vyory.jpg",
    badgePromo: true,
    description:
      "Enduro-E-MTB mit RockShox ZEB Gabel und massiven 170mm Federweg für anspruchsvolle Schweizer Downhills.",
    specs: {
      frame: "Alu 6061 T6 Multibutted Enduro Advanced",
      brakes: "Clarks M4 4-Piston 203/203mm",
      range: "Bis zu 130 km",
      weight: "25.2 kg",
    },
  },
  {
    id: "vtt-gitane-g-one-black-forest",
    title: "GITANE G-One Black Forest FS2",
    brand: "GITANE",
    category: "VTT",
    categoryLabel: "FULL-SUSPENSION E-MTB",
    price: 2999.0,
    oldPrice: 4899.0,
    discount: "-39 %",
    savings: 1900,
    rating: 4.8,
    reviewsCount: 7,
    motorTorque: "85 Nm",
    batteryCapacity: "630 Wh",
    image: "/img/prod/vtt-gitane-black-forest.jpg",
    badgePromo: true,
    description:
      "Ausgewogenes Trail-Bike mit Shimano EP8 Motor und blockierbarem Luftfahrwerk.",
    specs: {
      frame: "Aluminium 6061 FS 140mm",
      brakes: "Shimano MT420 4-Kolben",
      range: "Bis zu 125 km",
      weight: "24.0 kg",
    },
  },
  {
    id: "vtt-focus-aventura-69",
    title: "FOCUS Aventura² 6.9 Small",
    brand: "FOCUS",
    category: "VTT",
    categoryLabel: "EQUIPPED E-MTB HARDTAIL",
    price: 3059.1,
    oldPrice: 3999.0,
    discount: "-20 %",
    savings: 800,
    rating: 4.9,
    reviewsCount: 16,
    motorTorque: "85 Nm",
    batteryCapacity: "750 Wh",
    image: "/img/prod/vtt-focus-aventura.jpg",
    badgePromo: true,
    description:
      "Crossover E-MTB mit Schutzblechen und Lichtset: Verbindet E-MTB-Leistung mit voll Alltagstauglichkeit.",
    specs: {
      frame: "7005 Aluminium 148x12 mm Thru-Axle",
      brakes: "Shimano BR-MT520 4-Piston",
      range: "Bis zu 150 km",
      weight: "25.8 kg",
    },
  },

  {
    id: "vtt-cube-ams-hybrid-one44-pro",
    title: "CUBE AMS Hybrid ONE44 C:62 Pro 400X",
    brand: "CUBE",
    category: "VTT",
    categoryLabel: "ULTRA-LIGHT E-MTB",
    price: 4399.0,
    rating: 5.0,
    reviewsCount: 14,
    motorTorque: "55 Nm",
    batteryCapacity: "400 Wh",
    image: "/img/prod/vtt-cube-ams-hybrid.jpg",
    badgePromo: false,
    isNew: true,
    description:
      "Ultra-leichtes E-Mountainbike mit Bosch SX Motor. Fühlt sich auf dem Trail an wie ein Bio-Bike mit Rückenwind.",
    specs: {
      frame: "C:62 Monocoque Carbon Advanced Twin Mold",
      brakes: "Magura MT Trail Sport (180/180)",
      range: "Bis zu 90 km",
      weight: "16.2 kg",
    },
  },
  {
    id: "vtt-mondraker-neat-r-carbon",
    title: "MONDRAKER Neat R Carbon TQ-HPR50",
    brand: "MONDRAKER",
    category: "VTT",
    categoryLabel: "ULTRA-LIGHT E-MTB",
    price: 7999.0,
    oldPrice: 11699.0,
    discount: "-31 %",
    savings: 3700,
    rating: 5.0,
    reviewsCount: 5,
    motorTorque: "50 Nm",
    batteryCapacity: "360 Wh",
    image: "/img/prod/vtt-mondraker-neat.jpg",
    badgePromo: true,
    isNew: true,
    description:
      "High-End Carbon Enduro mit geräuschlosem TQ HPR50 Motor für das natürlichste Fahrerlebnis der Welt.",
    specs: {
      frame: "Stealth Air Full Carbon Zero Suspension 150mm",
      brakes: "SRAM Code R 4-Piston 200/200",
      range: "Bis zu 80 km",
      weight: "17.9 kg",
    },
  },
];

const additionalProducts: Product[] = [
  {
    id: "acid-beleuchtungsset-pro-30",
    title: "ACID Beleuchtungsset PRO 30",
    brand: "ACID",
    category: "ACCESSOIRES",
    categoryLabel: "BELEUCHTUNG",
    price: 33.99,
    oldPrice: 39.95,
    discount: "-15 %",
    savings: 5.96,
    image: "/img/prod/acid-beleuchtungsset-pro-30.webp",
    imageFile: "/img/prod/acid-beleuchtungsset-pro-30.webp",
    badgePromo: true,
    isDraft: false,
    description:
      "Beleuchtungsset mit einer PRO-30-Frontleuchte und einem Rücklicht. Beide Leuchten lassen sich per Micro-USB aufladen.",
    details: [
      { label: "Lieferumfang", value: "Frontleuchte PRO 30 und Rücklicht" },
      { label: "Ladeanschluss", value: "Micro-USB" },
    ],
  },
  {
    id: "cube-mtb-trikot-razzle-dazzle",
    title: "Cube MTB Trikot Razzle Dazzle kurzarm black´n´white",
    brand: "CUBE",
    category: "Kleidung",
    categoryLabel: "TRIKOTS",
    price: 34.9,
    oldPrice: 44.9,
    discount: "-22 %",
    savings: 10,
    image: "/img/prod/cube-mtb-trikot-razzle-dazzle-kurzarm-black-n-white.webp",
    imageFile:
      "/img/prod/cube-mtb-trikot-razzle-dazzle-kurzarm-black-n-white.webp",
    badgePromo: true,
    isDraft: false,
    description:
      "Kurzärmeliges MTB-Trikot von CUBE. Das leichte Trikot bietet Bewegungsfreiheit und verfügt über eine Liftpasstasche sowie eine Aufhängeschlaufe zum Trocknen.",
    details: [
      { label: "Ausführung", value: "Kurzarm" },
      { label: "Tasche", value: "Liftpasstasche" },
      {
        label: "Weitere Merkmale",
        value: "Neck-Brace-kompatibel, Aufhängeschlaufe zum Trocknen",
      },
    ],
  },
  {
    id: "acid-flaschenhalter-hpp",
    title: "ACID Flaschenhalter HPP matt sand´n´glossy black",
    brand: "ACID",
    category: "ACCESSOIRES",
    categoryLabel: "FLASCHENHALTER",
    price: 7.9,
    image: "/img/prod/acid-flaschenhalter-hpp-matt-sand-n-glossy-black.webp",
    imageFile:
      "/img/prod/acid-flaschenhalter-hpp-matt-sand-n-glossy-black.webp",
    isDraft: false,
    description:
      "Flaschenhalter von ACID in mattem Sand und glänzendem Schwarz. Die Konstruktion hält die Flasche sicher und erleichtert das Herausnehmen.",
    details: [
      { label: "Farbe", value: "Matt sand´n´glossy black" },
      {
        label: "Merkmal",
        value: "Sicherer Halt und einfaches Herausnehmen der Flasche",
      },
    ],
  },
  {
    id: "rfr-fahrradcomputer-cmpt-blue",
    title: "RFR Fahrradcomputer CMPT blue",
    brand: "RFR",
    category: "ACCESSOIRES",
    categoryLabel: "FAHRRADCOMPUTER",
    price: 8.9,
    image: "/img/prod/rfr-fahrradcomputer-cmpt-blue.webp",
    imageFile: "/img/prod/rfr-fahrradcomputer-cmpt-blue.webp",
    isDraft: false,
    description:
      "Kabelgebundener Fahrradcomputer mit 12 Funktionen. Das Display ist beleuchtet; der Computer schaltet sich automatisch ein und aus.",
    details: [
      { label: "Verbindung", value: "Kabelgebunden" },
      { label: "Funktionen", value: "12" },
      {
        label: "Display",
        value: "Beleuchtet, automatische Ein- und Ausschaltung",
      },
    ],
  },
  {
    id: "cube-acid-200-lightolive-orange-2027",
    title: "Cube Acid 200 lightolive´n´orange (2027)",
    brand: "Cube",
    category: "kinder",
    categoryLabel: "kinderFAHRRÄDER",
    price: 329,
    image: "/img/prod/cube-acid-200-lightolive-orange-2027.webp",
    imageFile: "/img/prod/cube-acid-200-lightolive-orange-2027.webp",
    isDraft: false,
    description:
      "20-Zoll-kinderfahrrad von Cube mit Shimano-Kettenschaltung mit 7 Gängen und kindgerecht abgestimmten V-Bremshebeln.",
    details: [
      { label: "Laufradgröße", value: "20 Zoll" },
      { label: "Schaltung", value: "Shimano, 7 Gänge" },
      { label: "Bremsen", value: "V-Bremsen" },
    ],
  },
  {
    id: "academy-grade-5-24-blue-2027",
    title: 'ACADEMY Grade 5 24" Blue (2027)',
    brand: "ACADEMY",
    category: "kinder",
    categoryLabel: "kinderFAHRRÄDER",
    price: 549.99,
    image: "/img/prod/academy-grade-5-24-blue-2027.webp",
    imageFile: "/img/prod/academy-grade-5-24-blue-2027.webp",
    isDraft: false,
    description:
      "24-Zoll-kinderfahrrad von ACADEMY mit Shimano-Claris-Schaltung mit 8 Gängen und V-Bremsen.",
    details: [
      { label: "Laufradgröße", value: "24 Zoll" },
      { label: "Schaltung", value: "Shimano Claris, 8 Gänge" },
      { label: "Bremsen", value: "V-Bremsen" },
    ],
  },
  {
    id: "abus-bordo-big-6000k-120",
    title: "ABUS Bordo Big 6000K/120 Faltschloss + Halter SH schwarz",
    brand: "ABUS",
    category: "ACCESSOIRES",
    categoryLabel: "FAHRRADSCHLÖSSER",
    price: 107.9,
    image: "/img/prod/abus-bordo-big-6000k-120-faltschloss-schwarz.webp",
    imageFile: "/img/prod/abus-bordo-big-6000k-120-faltschloss-schwarz.webp",
    isDraft: false,
    description:
      "Faltschloss mit Schlüssel und Halter. Sechs 5-mm-Stahlstäbe sind mit Spezialnieten verbunden und lassen sich kompakt zusammenfalten.",
    details: [
      { label: "Schlosstyp", value: "Faltschloss" },
      { label: "Stäbe", value: "6 faltbare Stahlstäbe, 5 mm" },
      { label: "Verschluss", value: "Schlüssel" },
    ],
  },
  {
    id: "camelbak-hawg-20-3l-rucksack-asphalt",
    title: "Camelbak HAWG 20 3L Rucksack Asphalt",
    brand: "CamelBak",
    category: "ACCESSOIRES",
    categoryLabel: "RUCKSÄCKE",
    price: 129.99,
    image: "/img/prod/camelbak-hawg-20-3l-rucksack-asphalt.webp",
    imageFile: "/img/prod/camelbak-hawg-20-3l-rucksack-asphalt.webp",
    isDraft: false,
    description:
      "Bike-Rucksack für lange Touren mit einem 3-Liter-Crux-Trinkreservoir und zusätzlicher Kapazität für ein weiteres Reservoir.",
    details: [
      { label: "Trinkreservoir", value: "Crux, 3 Liter" },
      {
        label: "Zusätzliche Kapazität",
        value: "Platz für ein weiteres Reservoir",
      },
      { label: "Einsatz", value: "Lange Touren und Trails" },
    ],
  },
  {
    id: "sigma-aura-30-frontlicht",
    title: "Sigma Aura 30 Frontlicht",
    brand: "SIGMA",
    category: "ACCESSOIRES",
    categoryLabel: "BELEUCHTUNG",
    price: 15.9,
    image: "/img/prod/sigma-aura-30-frontlicht.webp",
    imageFile: "/img/prod/sigma-aura-30-frontlicht.webp",
    isDraft: false,
    description:
      "Batteriebetriebenes Frontlicht mit 30 Lux, 40 Metern Leuchtweite und StVZO-Zulassung. Seitliche Leuchtelemente verbessern die Sichtbarkeit.",
    details: [
      { label: "Leuchtstärke", value: "30 Lux" },
      { label: "Leuchtweite", value: "40 m" },
      { label: "Zulassung", value: "StVZO" },
    ],
  },
  {
    id: "cube-flaschenhalter-hpp-black",
    title: "CUBE Flaschenhalter HPP matt black´n´glossy black",
    brand: "CUBE",
    category: "ACCESSOIRES",
    categoryLabel: "FLASCHENHALTER",
    price: 16.95,
    image: "/img/prod/cube-flaschenhalter-hpp-matt-black-n-glossy-black.webp",
    imageFile:
      "/img/prod/cube-flaschenhalter-hpp-matt-black-n-glossy-black.webp",
    isDraft: false,
    description:
      "CUBE-Flaschenhalter in mattem und glänzendem Schwarz. Er hält die Flasche sicher und ermöglicht ein einfaches Herausnehmen.",
    details: [
      { label: "Farbe", value: "Matt black´n´glossy black" },
      { label: "Merkmal", value: "Sicherer Halt und einfaches Herausnehmen" },
    ],
  },
  {
    id: "vaude-cyclist-pack-fahrradtasche",
    title: "VAUDE Cyclist Pack Fahrradtasche schwarz",
    brand: "VAUDE",
    category: "ACCESSOIRES",
    categoryLabel: "FAHRRADTASCHEN",
    price: 117.9,
    image: "/img/prod/vaude-cyclist-pack-fahrradtasche-schwarz.webp",
    imageFile: "/img/prod/vaude-cyclist-pack-fahrradtasche-schwarz.webp",
    isDraft: false,
    description:
      "Schwarze VAUDE-Fahrradtasche mit Stauraum für Alltag und Touren. Der Hersteller beschreibt sie als robust und wetterfest.",
    details: [
      { label: "Farbe", value: "Schwarz" },
      { label: "Einsatz", value: "Alltag und längere Touren" },
      { label: "Merkmal", value: "Robust und wetterfest" },
    ],
  },
  {
    id: "sigma-bc-10-0-sts-fahrradcomputer",
    title: "Sigma BC 10.0 STS Fahrradcomputer Kabellos",
    brand: "SIGMA",
    category: "ACCESSOIRES",
    categoryLabel: "FAHRRADCOMPUTER",
    price: 39.9,
    image: "/img/prod/sigma-bc-10-0-sts-fahrradcomputer-kabellos.webp",
    imageFile: "/img/prod/sigma-bc-10-0-sts-fahrradcomputer-kabellos.webp",
    isDraft: false,
    description:
      "Kabelloser SIGMA-Fahrradcomputer mit zehn Funktionen. Dazu gehören unter anderem Durchschnittsgeschwindigkeit, Tageskilometer und Außentemperatur.",
    details: [
      { label: "Verbindung", value: "Kabellos" },
      { label: "Funktionen", value: "10" },
      {
        label: "Messwerte",
        value:
          "Unter anderem Durchschnittsgeschwindigkeit, Tageskilometer und Außentemperatur",
      },
    ],
  },
  {
    id: "shimano-tl-cn28-kettennieter",
    title: "Shimano TL-CN28 Kettennieter für 6- bis 11-fach Ketten",
    brand: "Shimano",
    category: "ACCESSOIRES",
    categoryLabel: "WERKZEUGE",
    price: 34.9,
    image: "/img/prod/shimano-tl-cn28-kettennieter.webp",
    imageFile: "/img/prod/shimano-tl-cn28-kettennieter.webp",
    isDraft: false,
    description:
      "Shimano-Werkzeug für Wartungs- und Reparaturarbeiten an Fahrradketten mit 6 bis 11 Gängen.",
    details: [
      { label: "Werkzeugtyp", value: "Kettennieter" },
      { label: "Kompatibilität", value: "6- bis 11-fach Ketten" },
    ],
  },
  {
    id: "shimano-xc302-mtb-schuhe-ice-gray",
    title: "Shimano XC302 MTB-Schuhe ice gray",
    brand: "Shimano",
    category: "Kleidung",
    categoryLabel: "FAHRRADSCHUHE",
    price: 114.9,
    image: "/img/prod/shimano-xc302-mtb-schuhe-ice-gray.webp",
    imageFile: "/img/prod/shimano-xc302-mtb-schuhe-ice-gray.webp",
    isDraft: false,
    description:
      "MTB-Schuh mit BOA-Einstellsystem, nahtlos integrierter Zwischensohle und Oberschuh sowie glasfaserverstärkter Nylonsohle.",
    details: [
      { label: "Einstellsystem", value: "Kreuzschnürung und BOA" },
      { label: "Sohle", value: "Glasfaserverstärktes Nylon" },
      { label: "Einsatz", value: "XC-Racing" },
    ],
  },
  {
    id: "gonso-save-pants-therm-mercury-gray",
    title: "Gonso Save Pants Therm Mercury Gray",
    brand: "Gonso",
    category: "Kleidung",
    categoryLabel: "FAHRRADHOSEN",
    price: 149.9,
    image: "/img/prod/gonso-save-pants-therm-mercury-gray.webp",
    imageFile: "/img/prod/gonso-save-pants-therm-mercury-gray.webp",
    isDraft: false,
    description:
      "Warme Allwetter-Fahrradhose für kalte Tage mit Primaloft-Isolierung und G-TEX-Außenschicht. Getapte Nähte und eine Wassersäule von 10.000 mm schützen vor Nässe.",
    details: [
      { label: "Isolierung", value: "Primaloft" },
      { label: "Material", value: "G-TEX" },
      { label: "Wassersäule", value: "10.000 mm" },
    ],
  },
  {
    id: "vaude-minaki-jacket-iv-herren-neon-yellow",
    title: "VAUDE Minaki Jacket IV Herren neon yellow",
    brand: "VAUDE",
    category: "Kleidung",
    categoryLabel: "JACKEN",
    price: 149.9,
    image: "/img/prod/vaude-minaki-jacket-iv-herren-neon-yellow.webp",
    imageFile: "/img/prod/vaude-minaki-jacket-iv-herren-neon-yellow.webp",
    isDraft: false,
    description:
      "Herrenjacke in Neon-Gelb, die laut Hersteller leicht, wasserabweisend und atmungsaktiv ist.",
    details: [
      { label: "Farbe", value: "Neon-Gelb" },
      { label: "Eigenschaften", value: "Wasserabweisend und atmungsaktiv" },
    ],
  },
  {
    id: "zimtstern-bulletz-shirt-ls-men",
    title: "Zimtstern Bulletz Shirt LS Men Pirate Black/Jester Red",
    brand: "Zimtstern",
    category: "Kleidung",
    categoryLabel: "LANGARMSHIRTS",
    price: 45.9,
    image:
      "/img/prod/zimtstern-bulletz-shirt-ls-men-pirate-black-jester-red.webp",
    imageFile:
      "/img/prod/zimtstern-bulletz-shirt-ls-men-pirate-black-jester-red.webp",
    isDraft: false,
    description:
      "Langärmeliges MTB-Shirt für Downhill und Freeride aus schnell trocknendem S.Café-Polyester. Das Material wirkt geruchshemmend und bietet UV-Schutz.",
    details: [
      { label: "Material", value: "Polyester mit S.Café-Technologie" },
      {
        label: "Merkmale",
        value: "Schnelltrocknend, geruchshemmend und UV-Schutz",
      },
      { label: "Einsatz", value: "Downhill und Freeride" },
    ],
  },
  {
    id: "zimtstern-pureflowz-shirt-3-4-men",
    title: "Zimtstern PureFlowz Shirt 3/4 Men Pacific / High Rise",
    brand: "Zimtstern",
    category: "Kleidung",
    categoryLabel: "TRIKOTS",
    price: 45.9,
    oldPrice: 47.9,
    discount: "-4 %",
    savings: 2,
    image: "/img/prod/zimtstern-pureflowz-shirt-3-4-men-pacific-high-rise.webp",
    imageFile:
      "/img/prod/zimtstern-pureflowz-shirt-3-4-men-pacific-high-rise.webp",
    badgePromo: true,
    isDraft: false,
    description:
      "3/4-armiges Trail-Shirt aus Drirelease-Polyester-Baumwollmix mit seitlicher Reißverschlusstasche. Ein Silikonprint am Rückensaum hilft, das Verrutschen zu verhindern.",
    details: [
      {
        label: "Material",
        value: "Drirelease-Polyester-Baumwollmix, 140 g/m²",
      },
      { label: "Tasche", value: "Seitliche Reißverschlusstasche" },
      {
        label: "Weitere Merkmale",
        value: "Silikonprint am Rückensaum und reflektierende Logos",
      },
    ],
  },
  {
    id: "vaude-tura-gloves-ii-schwarz",
    title: "VAUDE Tura Gloves II schwarz",
    brand: "VAUDE",
    category: "Kleidung",
    categoryLabel: "HANDSCHUHE",
    price: 58.9,
    image: "/img/prod/vaude-tura-gloves-ii-schwarz.jpg",
    imageFile: "/img/prod/vaude-tura-gloves-ii-schwarz.jpg",
    isDraft: false,
    description:
      "Warme Radhandschuhe von VAUDE mit wind- und wasserdichten sowie atmungsaktiven Eigenschaften. Die E-Touch-Funktion erlaubt die Bedienung von Touchscreens.",
    details: [
      {
        label: "Eigenschaften",
        value: "Winddicht, wasserdicht und atmungsaktiv",
      },
      { label: "Wärme", value: "Warme Ausführung" },
      { label: "Funktion", value: "E-Touch" },
    ],
  },
  {
    id: "gonso-save-jacket-trail-herren",
    title: "Gonso SAVE JACKET TRAIL - Herren-All-Jacke-2,5L black",
    brand: "Gonso",
    category: "Kleidung",
    categoryLabel: "REGENJACKEN",
    price: 199.9,
    image: "/img/prod/gonso-save-jacket-trail-herren-all-jacke-black.webp",
    imageFile: "/img/prod/gonso-save-jacket-trail-herren-all-jacke-black.webp",
    isDraft: false,
    description:
      "Herren-Regenjacke mit G-Tex-2,5-Lagenlaminat und Kapuze. Die wind- und wasserdichte Membran hat eine Wassersäule von 10.000 mm.",
    details: [
      { label: "Material", value: "G-Tex, 2,5-Lagenlaminat" },
      { label: "Wassersäule", value: "10.000 mm" },
      { label: "Merkmale", value: "Kapuze und hochgeschnittener Kragen" },
    ],
  },
  {
    id: "vaude-m-fluid-full-zip-rain-pants-ii",
    title: "VAUDE M's Fluid Full-Zip Rain Pants II Herren schwarz",
    brand: "VAUDE",
    category: "Kleidung",
    categoryLabel: "REGENHOSEN",
    price: 106.9,
    image: "/img/prod/vaude-m-fluid-full-zip-rain-pants-ii-herren-schwarz.webp",
    imageFile:
      "/img/prod/vaude-m-fluid-full-zip-rain-pants-ii-herren-schwarz.webp",
    isDraft: false,
    description:
      "Wasserdichte und atmungsaktive Herren-Regenhose mit durchgehendem Reißverschluss zum leichteren An- und Ausziehen.",
    details: [
      { label: "Farbe", value: "Schwarz" },
      { label: "Eigenschaften", value: "Wasserdicht und atmungsaktiv" },
      { label: "Verschluss", value: "Full-Zip" },
    ],
  },
  {
    id: "cube-gravel-short-black",
    title: "Cube GRAVEL Short black",
    brand: "CUBE",
    category: "Kleidung",
    categoryLabel: "GRAVEL-SHORTS",
    price: 69.9,
    oldPrice: 79.95,
    discount: "-13 %",
    savings: 10.05,
    image: "/img/prod/cube-gravel-short-black.webp",
    imageFile: "/img/prod/cube-gravel-short-black.webp",
    badgePromo: true,
    isDraft: false,
    description:
      "Robuste CUBE-Shorts aus Funktionsmaterial für Gravel-Touren. Mehrere Taschen bieten Stauraum; der Bund lässt sich mit einem Gürtel in der Weite anpassen.",
    details: [
      { label: "Material", value: "Widerstandsfähiges Funktionsmaterial" },
      { label: "Taschen", value: "Mehrere Taschen" },
      { label: "Bund", value: "Weitenregulierung mit Gürtel" },
    ],
  },

  {
    id: "academy-grade-5-24-ocean-2027",
    title: 'ACADEMY Grade 5 24" Ocean (2027)',
    brand: "ACADEMY",
    category: "kinder",
    categoryLabel: "kinderFAHRRÄDER",
    price: 549.99,
    image: "/img/prod/academy-grade-5-24-ocean-2027.webp",
    imageFile: "/img/prod/academy-grade-5-24-ocean-2027.webp",
    isDraft: false,
    description:
      "Leichtes 24-Zoll-kinderfahrrad von ACADEMY für den Alltag und den Weg zur Schule.",
    details: [
      { label: "Laufradgröße", value: "24 Zoll" },
      { label: "Einsatz", value: "Alltag und Schulweg" },
      { label: "Farbe", value: "Ocean" },
    ],
  },
  {
    id: "academy-grade-4-20-blue-2027",
    title: 'ACADEMY Grade 4 20" Blue (2027)',
    brand: "ACADEMY",
    category: "kinder",
    categoryLabel: "kinderFAHRRÄDER",
    price: 489.99,
    image: "/img/prod/academy-grade-4-20-blue-2027.webp",
    imageFile: "/img/prod/academy-grade-4-20-blue-2027.webp",
    isDraft: false,
    description:
      "20-Zoll-kinderfahrrad von ACADEMY mit leichter Bauweise und ergonomisch entwickeltem Rahmen.",
    details: [
      { label: "Laufradgröße", value: "20 Zoll" },
      { label: "Farbe", value: "Blue" },
      {
        label: "Merkmal",
        value: "Leichte Bauweise und ergonomische Geometrie",
      },
    ],
  },
  {
    id: "academy-s-grade-gravel-5-24-forest-2027",
    title: 'ACCADEMY S-grade Gravel 5 24" Forest (2027)',
    brand: "ACADEMY",
    category: "kinder",
    categoryLabel: "JUGEND-GRAVELBIKES",
    price: 829.99,
    image: "/img/prod/academy-s-grade-gravel-5-24-forest-2027.webp",
    imageFile: "/img/prod/academy-s-grade-gravel-5-24-forest-2027.webp",
    isDraft: false,
    description:
      "24-Zoll-Jugend-Gravelbike mit Aluminiumrahmen, breiten Reifen und Microshift-Advent-Schaltung mit zehn Gängen.",
    details: [
      { label: "Laufradgröße", value: "24 Zoll" },
      { label: "Rahmen", value: "Aluminium" },
      { label: "Schaltung", value: "Microshift Advent, 1×10 Gänge" },
    ],
  },
  {
    id: "academy-grade-4-belt-20-ocean-2027",
    title: 'ACADEMY Grade 4 Belt 20" Ocean (2027)',
    brand: "ACADEMY",
    category: "kinder",
    categoryLabel: "kinderFAHRRÄDER",
    price: 599.99,
    image: "/img/prod/academy-grade-4-belt-20-ocean-2027.webp",
    imageFile: "/img/prod/academy-grade-4-belt-20-ocean-2027.webp",
    isDraft: false,
    description:
      "20-Zoll-kinderfahrrad von ACADEMY mit Riemenantrieb, leichter Bauweise und ergonomisch entwickelter Geometrie.",
    details: [
      { label: "Laufradgröße", value: "20 Zoll" },
      { label: "Antrieb", value: "Riemenantrieb" },
      { label: "Farbe", value: "Ocean" },
    ],
  },
  {
    id: "academy-grade-4-belt-20-yellow-2027",
    title: 'ACADEMY Grade 4 Belt 20" Yellow (2027)',
    brand: "ACADEMY",
    category: "kinder",
    categoryLabel: "kinderFAHRRÄDER",
    price: 599.99,
    image: "/img/prod/academy-grade-4-belt-20-yellow-2027.webp",
    imageFile: "/img/prod/academy-grade-4-belt-20-yellow-2027.webp",
    isDraft: false,
    description:
      "20-Zoll-kinderfahrrad von ACADEMY mit Riemenantrieb, leichter Bauweise und ergonomisch entwickelter Geometrie.",
    details: [
      { label: "Laufradgröße", value: "20 Zoll" },
      { label: "Antrieb", value: "Riemenantrieb" },
      { label: "Farbe", value: "Yellow" },
    ],
  },
  {
    id: "cannondale-kids-trail-26-tungsten-blue-2027",
    title: "Cannondale Kids Trail 26 Tungsten Blue (2027)",
    brand: "Cannondale",
    category: "kinder",
    categoryLabel: "kinderFAHRRÄDER",
    price: 599,
    image: "/img/prod/cannondale-kids-trail-26-tungsten-blue-2027.webp",
    imageFile: "/img/prod/cannondale-kids-trail-26-tungsten-blue-2027.webp",
    isDraft: false,
    description:
      "26-Zoll-Jugendfahrrad mit Aluminiumrahmen, 8-Gang-Schaltung von Shimano/microSHIFT, Suntour-NEX-Federgabel und mechanischen Tektro-Scheibenbremsen.",
    details: [
      { label: "Laufradgröße", value: "26 Zoll" },
      { label: "Rahmen", value: "SmartForm C3 Aluminium" },
      { label: "Schaltung", value: "Shimano/microSHIFT, 8 Gänge" },
      { label: "Bremsen", value: "Mechanische Tektro-Scheibenbremsen" },
    ],
  },
  {
    id: "puky-cyke-24-8-active-dusty-sand-black-2027",
    title: "PUKY CYKE 24-8 ACTIVE dusty sand/black (2027)",
    brand: "PUKY",
    category: "kinder",
    categoryLabel: "kinderFAHRRÄDER",
    price: 569,
    oldPrice: 579.9,
    discount: "-2 %",
    savings: 10.9,
    image: "/img/prod/puky-cyke-24-8-active-dusty-sand-black-2027.webp",
    imageFile: "/img/prod/puky-cyke-24-8-active-dusty-sand-black-2027.webp",
    badgePromo: true,
    isDraft: false,
    description:
      "24-Zoll-kinderfahrrad für kinder ab 8 Jahren mit Aluminiumrahmen, Shimano-Schaltung mit acht Gängen und Straßenausstattung.",
    details: [
      { label: "Laufradgröße", value: "24 Zoll" },
      { label: "Empfohlenes Alter", value: "Ab 8 Jahren" },
      { label: "Schaltung", value: "Shimano, 8 Gänge" },
    ],
  },
];

export const productsData: Product[] = [
  ...bikeProducts.map((product) => {
    const price = Math.round((product.price * 0.97) / 5) * 5;
    if (!product.oldPrice) {
      return { ...product, price };
    }

    const savings = product.oldPrice - price;
    return {
      ...product,
      price,
      savings,
      discount: `-${Math.round((savings / product.oldPrice) * 100)} %`,
    };
  }),
  ...additionalProducts,
];
