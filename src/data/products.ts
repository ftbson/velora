export interface Product {
  id: string;
  title: string;
  brand: string;
  category: "VILLE" | "VTC" | "VTT";
  categoryLabel: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  savings?: number;
  rating: number;
  reviewsCount: number;
  motorTorque: string;
  batteryCapacity: string;
  image: string;
  badgePromo?: boolean;
  isNew?: boolean;
  colors?: string[];
  description: string;
  specs: {
    frame: string;
    brakes: string;
    range: string;
    weight: string;
  };
}

export const productsData: Product[] = [
  // ==========================================
  // KATEGORIE : VILLE (CITY E-BIKES) - 11 Modèles
  // ==========================================
  {
    id: "city-cube-supreme-pro",
    title: "CUBE Supreme Hybrid Pro 625",
    brand: "CUBE",
    category: "VILLE",
    categoryLabel: "CITY E-BIKE",
    price: 2599.00,
    oldPrice: 3299.00,
    discount: "-21 %",
    savings: 700,
    rating: 4.9,
    reviewsCount: 18,
    motorTorque: "75 Nm",
    batteryCapacity: "625 Wh",
    image: "/img/prod/city-cube-supreme-pro.jpg",
    badgePromo: true,
    description: "Eleganter Tiefeinsteiger für den städtischen Alltag mit wartungsarmen Riemenantrieb und kraftvollem Bosch-Performance-Line-Motor.",
    specs: {
      frame: "Aluminium Superlite Easy Entry",
      brakes: "Shimano BR-MT410 Hydraulische Scheibenbremsen",
      range: "Bis zu 130 km",
      weight: "24.6 kg"
    }
  },
  {
    id: "city-o2feel-iswan-8",
    title: "O2FEEL iSwan City Boost 8.1 - 540",
    brand: "O2FEEL",
    category: "VILLE",
    categoryLabel: "CITY E-BIKE",
    price: 2499.00,
    oldPrice: 3999.00,
    discount: "-38 %",
    savings: 1500,
    rating: 5.0,
    reviewsCount: 12,
    motorTorque: "60 Nm",
    batteryCapacity: "540 Wh",
    image: "/img/prod/city-o2feel-iswan-8.jpg",
    badgePromo: true,
    description: "Französisches Design trifft auf Shimano-Technologie. Sehr geschmeidiges Fahrgefühl für stilvolle Stadtfahrten.",
    specs: {
      frame: "Aluminium 6061 6061 T6 Hydroformed",
      brakes: "Shimano MT200 Hydraulisch",
      range: "Bis zu 120 km",
      weight: "22.8 kg"
    }
  },
  {
    id: "city-granville-excellence",
    title: "GRANVILLE E-Excellence ENVIOLO 625",
    brand: "GRANVILLE",
    category: "VILLE",
    categoryLabel: "CITY E-BIKE",
    price: 2349.00,
    oldPrice: 4099.00,
    discount: "-43 %",
    savings: 1750,
    rating: 4.8,
    reviewsCount: 9,
    motorTorque: "65 Nm",
    batteryCapacity: "625 Wh",
    image: "/img/prod/city-granville-excellence.jpg",
    badgePromo: true,
    description: "Luxuriöses City-E-Bike mit stufenloser Enviolo-Schaltung für nahtloses Schalten an jeder Ampel.",
    specs: {
      frame: "Granville Alloy Premium Wave",
      brakes: "Shimano MT200 160mm",
      range: "Bis zu 140 km",
      weight: "25.1 kg"
    }
  },
  {
    id: "city-benno-boost-10d",
    title: "BENNO BIKES Boost 10D EVO 5",
    brand: "BENNO BIKES",
    category: "VILLE",
    categoryLabel: "LONGTAIL CITY E-BIKE",
    price: 2999.00,
    oldPrice: 5099.00,
    discount: "-41 %",
    savings: 2100,
    rating: 5.0,
    reviewsCount: 24,
    motorTorque: "65 Nm",
    batteryCapacity: "500 Wh",
    image: "/img/prod/city-benno-boost-10d.jpg",
    badgePromo: true,
    description: "Kompaktes Utility-E-Bike zum mühelosen Transport von Einkauf, Kinckern oder schweren Lasten mitten in der Stadt.",
    specs: {
      frame: "6061 Aluminum Alloy Frame with Front Tray Mounts",
      brakes: "Magura MT30 4-Piston Hydraulic Disc",
      range: "Bis zu 100 km",
      weight: "26.0 kg"
    }
  },
  
  {
    id: "city-uto-ex-eovolt",
    title: "UTO EX EVOALT Evening Origins",
    brand: "UTO / EVOALT",
    category: "VILLE",
    categoryLabel: "COMPACT CITY E-BIKE",
    price: 2199.00,
    rating: 4.6,
    reviewsCount: 7,
    motorTorque: "40 Nm",
    batteryCapacity: "378 Wh",
    image: "/img/prod/city-uto-evening.jpg",
    badgePromo: false,
    description: "Kompaktes 24-Zoll City-E-Bike für agile Wendigkeit im dichten Stadtverkehr und einfache Lagerung.",
    specs: {
      frame: "Aluminium 6061 Compact",
      brakes: "Nutt Hydraulische Disc",
      range: "Bis zu 70 km",
      weight: "19.8 kg"
    }
  },
  {
    id: "city-gitane-glife-2",
    title: "GITANE G-Life Compact 2",
    brand: "GITANE",
    category: "VILLE",
    categoryLabel: "COMPACT CITY E-BIKE",
    price: 2599.00,
    rating: 4.8,
    reviewsCount: 11,
    motorTorque: "40 Nm",
    batteryCapacity: "482 Wh",
    image: "/img/prod/city-gitane-glife-2.jpg",
    badgePromo: false,
    description: "Stadtrad mit robustem Front- und Heckgepäckträger für schnelles Be- und Entladen im Alltag.",
    specs: {
      frame: "Aluminium 6061 T6 Compact City",
      brakes: "Shimano MT200 160mm",
      range: "Bis zu 85 km",
      weight: "21.2 kg"
    }
  },
  
  {
    id: "city-orbea-diem-30",
    title: "ORBEA Diem 30 - 540Wh",
    brand: "ORBEA",
    category: "VILLE",
    categoryLabel: "PREMIUM CITY E-BIKE",
    price: 3799.00,
    rating: 5.0,
    reviewsCount: 6,
    motorTorque: "85 Nm",
    batteryCapacity: "540 Wh",
    image: "/img/prod/city-orbea-diem-30.jpg",
    badgePromo: false,
    isNew: true,
    description: "Ultra-modernes Design mit nahtlos integrierten Scheinwerfern und bärenstarkem Shimano EP6 Motor.",
    specs: {
      frame: "Orbea Diem Hydroformed Alloy Internal Cable Routing",
      brakes: "Shimano Cues U8000 Hydraulic Disc",
      range: "Bis zu 120 km",
      weight: "21.5 kg"
    }
  },
  {
    id: "city-cube-cargo-hybrid",
    title: "CUBE Cargo Hybrid Dual 1000",
    brand: "CUBE",
    category: "VILLE",
    categoryLabel: "CARGO E-BIKE",
    price: 3999.00,
    oldPrice: 6498.99,
    discount: "-38 %",
    savings: 2500,
    rating: 4.9,
    reviewsCount: 19,
    motorTorque: "85 Nm",
    batteryCapacity: "1000 Wh",
    image: "/img/prod/city-cube-cargo-hybrid.jpg",
    badgePromo: true,
    description: "Das ultimative Lastenvelo mit Doppelakku für Familien und urbane Logistik ohne Auto.",
    specs: {
      frame: "High Performance Aluminium Cargo Box",
      brakes: "Magura CMo Hydraulic Disc 4-Piston",
      range: "Bis zu 180 km",
      weight: "48.5 kg"
    }
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
    price: 3359.00,
    rating: 5.0,
    reviewsCount: 29,
    motorTorque: "85 Nm",
    batteryCapacity: "800 Wh",
    image: "/img/prod/vtc-cube-kathmandu-800.jpg",
    badgePromo: false,
    isNew: true,
    description: "Der Maßstab für Trekking-E-Bikes: Ausgestattet mit der neuesten Bosch 800Wh Batterie für endlose Touren.",
    specs: {
      frame: "Aluminium Superlite Gravity Casting Technology",
      brakes: "Shimano BR-MT200 Hydraulisch",
      range: "Bis zu 175 km",
      weight: "26.8 kg"
    }
  },
  {
    id: "vtc-cube-nuride-perf-720",
    title: "CUBE Nuride Hybrid Performance 720",
    brand: "CUBE",
    category: "VTC",
    categoryLabel: "ALL-ROAD E-BIKE",
    price: 2899.00,
    oldPrice: 3499.00,
    discount: "-17 %",
    savings: 600,
    rating: 4.9,
    reviewsCount: 21,
    motorTorque: "75 Nm",
    batteryCapacity: "720 Wh",
    image: "/img/prod/vtc-cube-nuride-720.jpg",
    badgePromo: true,
    description: "Kombiniert den Komfort eines Tiefeinsteigers mit der Geländegängigkeit eines 29-Zoll-Mountainbikes.",
    specs: {
      frame: "Aluminium Superlite Agile Ride Geometry",
      brakes: "Shimano BR-MT200 (180/180)",
      range: "Bis zu 150 km",
      weight: "24.5 kg"
    }
  },
  
  
  {
    id: "vtc-orbea-kemen-suv-30",
    title: "ORBEA Kemen SUV 30 - 540Wh",
    brand: "ORBEA",
    category: "VTC",
    categoryLabel: "SUV ALL-ROAD E-BIKE",
    price: 3499.00,
    rating: 5.0,
    reviewsCount: 17,
    motorTorque: "85 Nm",
    batteryCapacity: "540 Wh",
    image: "/img/prod/vtc-orbea-kemen-suv.jpg",
    badgePromo: false,
    isNew: true,
    description: "Das SUV unter den E-Bikes. Grobe Stollenreifen und 85Nm Shimano EP8 Motor für jedes Schweizer Terrain.",
    specs: {
      frame: "Orbea Kemen Mid-Pitch Hydroformed Alloy",
      brakes: "Magura MT30 Hydraulic Disc",
      range: "Bis zu 130 km",
      weight: "23.4 kg"
    }
  },
  
  
  {
    id: "vtc-cube-touring-hybrid-one",
    title: "CUBE Touring Hybrid ONE 600",
    brand: "CUBE",
    category: "VTC",
    categoryLabel: "TREKKING E-BIKE",
    price: 2699.00,
    rating: 4.8,
    reviewsCount: 33,
    motorTorque: "75 Nm",
    batteryCapacity: "600 Wh",
    image: "/img/prod/vtc-cube-touring-one.jpg",
    badgePromo: false,
    description: "Der bewährte Dauerbrenner von CUBE mit integriertem Gepäckträger und Schutzblechen ab Werk.",
    specs: {
      frame: "Aluminium Superlite Efficient Comfort Geometry",
      brakes: "Shimano BR-MT200",
      range: "Bis zu 130 km",
      weight: "25.4 kg"
    }
  },
  
  {
    id: "vtc-mondraker-prime-x",
    title: "MONDRAKER Prime X 625",
    brand: "MONDRAKER",
    category: "VTC",
    categoryLabel: "SPORT VTC E-BIKE",
    price: 3599.00,
    oldPrice: 4299.00,
    discount: "-16 %",
    savings: 700,
    rating: 5.0,
    reviewsCount: 11,
    motorTorque: "85 Nm",
    batteryCapacity: "625 Wh",
    image: "/img/prod/vtc-mondraker-primex.jpg",
    badgePromo: true,
    description: "Sportlich-aggressives VTC mit Mountainbike-Genen und Forward Geometry für maximale Kontrolle.",
    specs: {
      frame: "Prime X 6061 Xtralite Alloy Forward Geometry",
      brakes: "SRAM Level T 200/180mm",
      range: "Bis zu 135 km",
      weight: "22.6 kg"
    }
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
    price: 3059.10,
    oldPrice: 3999.00,
    discount: "-23 %",
    savings: 940,
    rating: 5.0,
    reviewsCount: 42,
    motorTorque: "85 Nm",
    batteryCapacity: "800 Wh",
    image: "/img/prod/vtt-cube-reaction-800.jpg",
    badgePromo: true,
    description: "Das legendäre E-Hardtail mit dem neuen Bosch Smart System und riesigem 800Wh Akku für lange Alpentouren.",
    specs: {
      frame: "Aluminium Superlite Advanced Hydroforming 29er",
      brakes: "Shimano BR-MT200 Hydraulic Disc",
      range: "Bis zu 160 km",
      weight: "23.9 kg"
    }
  },
  {
    id: "vtt-cube-stereo-one44-at-800",
    title: "CUBE Stereo Hybrid ONE44 HPC AT 800",
    brand: "CUBE",
    category: "VTT",
    categoryLabel: "FULL-SUSPENSION E-MTB",
    price: 5999.00,
    rating: 5.0,
    reviewsCount: 19,
    motorTorque: "85 Nm",
    batteryCapacity: "800 Wh",
    image: "/img/prod/vtt-cube-stereo-one44.jpg",
    badgePromo: false,
    isNew: true,
    description: "High-End All-Mountain Carbon E-MTB mit Fox Factory Fahrwerk und drahtloser SRAM AXS Schaltung.",
    specs: {
      frame: "C:62 Monocoque Carbon Front Triangle, 6061 Alloy Rear",
      brakes: "Magura MT7 Hydraulic Disc (203/203)",
      range: "Bis zu 140 km (Trail Mode)",
      weight: "22.8 kg"
    }
  },
  {
    id: "vtt-mondraker-scree-s-600",
    title: "MONDRAKER Scree S 600Wh",
    brand: "MONDRAKER",
    category: "VTT",
    categoryLabel: "FULL-SUSPENSION E-MTB",
    price: 3999.00,
    oldPrice: 4999.00,
    discount: "-20 %",
    savings: 1000,
    rating: 4.9,
    reviewsCount: 15,
    motorTorque: "120 Nm",
    batteryCapacity: "600 Wh",
    image: "/img/prod/vtt-mondraker-scree.jpg",
    badgePromo: true,
    description: "Brutale Power mit unglaublichen 120Nm Drehmoment für steilste Uphill-Umsätze im alpinen Gelände.",
    specs: {
      frame: "Scree 6061 Alloy Zero Suspension System 150mm",
      brakes: "SRAM DB8 4-Piston Hydraulic",
      range: "Bis zu 110 km",
      weight: "24.1 kg"
    }
  },

  {
    id: "vtt-rock-machine-vyory-e90",
    title: "ROCK MACHINE Vyory E90-29",
    brand: "ROCK MACHINE",
    category: "VTT",
    categoryLabel: "ENDURO E-MOUNTAINBIKE",
    price: 2999.00,
    oldPrice: 4400.00,
    discount: "-32 %",
    savings: 1401,
    rating: 4.7,
    reviewsCount: 12,
    motorTorque: "85 Nm",
    batteryCapacity: "725 Wh",
    image: "/img/prod/vtt-rock-machine-vyory.jpg",
    badgePromo: true,
    description: "Enduro-E-MTB mit RockShox ZEB Gabel und massiven 170mm Federweg für anspruchsvolle Schweizer Downhills.",
    specs: {
      frame: "Alu 6061 T6 Multibutted Enduro Advanced",
      brakes: "Clarks M4 4-Piston 203/203mm",
      range: "Bis zu 130 km",
      weight: "25.2 kg"
    }
  },
  {
    id: "vtt-gitane-g-one-black-forest",
    title: "GITANE G-One Black Forest FS2",
    brand: "GITANE",
    category: "VTT",
    categoryLabel: "FULL-SUSPENSION E-MTB",
    price: 2999.00,
    oldPrice: 4899.00,
    discount: "-39 %",
    savings: 1900,
    rating: 4.8,
    reviewsCount: 7,
    motorTorque: "85 Nm",
    batteryCapacity: "630 Wh",
    image: "/img/prod/vtt-gitane-black-forest.jpg",
    badgePromo: true,
    description: "Ausgewogenes Trail-Bike mit Shimano EP8 Motor und blockierbarem Luftfahrwerk.",
    specs: {
      frame: "Aluminium 6061 FS 140mm",
      brakes: "Shimano MT420 4-Kolben",
      range: "Bis zu 125 km",
      weight: "24.0 kg"
    }
  },
  {
    id: "vtt-focus-aventura-69",
    title: "FOCUS Aventura² 6.9 Small",
    brand: "FOCUS",
    category: "VTT",
    categoryLabel: "EQUIPPED E-MTB HARDTAIL",
    price: 3059.10,
    oldPrice: 3999.00,
    discount: "-20 %",
    savings: 800,
    rating: 4.9,
    reviewsCount: 16,
    motorTorque: "85 Nm",
    batteryCapacity: "750 Wh",
    image: "/img/prod/vtt-focus-aventura.jpg",
    badgePromo: true,
    description: "Crossover E-MTB mit Schutzblechen und Lichtset: Verbindet E-MTB-Leistung mit voll Alltagstauglichkeit.",
    specs: {
      frame: "7005 Aluminium 148x12 mm Thru-Axle",
      brakes: "Shimano BR-MT520 4-Piston",
      range: "Bis zu 150 km",
      weight: "25.8 kg"
    }
  },
  
  {
    id: "vtt-cube-ams-hybrid-one44-pro",
    title: "CUBE AMS Hybrid ONE44 C:62 Pro 400X",
    brand: "CUBE",
    category: "VTT",
    categoryLabel: "ULTRA-LIGHT E-MTB",
    price: 4399.00,
    rating: 5.0,
    reviewsCount: 14,
    motorTorque: "55 Nm",
    batteryCapacity: "400 Wh",
    image: "/img/prod/vtt-cube-ams-hybrid.jpg",
    badgePromo: false,
    isNew: true,
    description: "Ultra-leichtes E-Mountainbike mit Bosch SX Motor. Fühlt sich auf dem Trail an wie ein Bio-Bike mit Rückenwind.",
    specs: {
      frame: "C:62 Monocoque Carbon Advanced Twin Mold",
      brakes: "Magura MT Trail Sport (180/180)",
      range: "Bis zu 90 km",
      weight: "16.2 kg"
    }
  },
  {
    id: "vtt-mondraker-neat-r-carbon",
    title: "MONDRAKER Neat R Carbon TQ-HPR50",
    brand: "MONDRAKER",
    category: "VTT",
    categoryLabel: "ULTRA-LIGHT E-MTB",
    price: 7999.00,
    oldPrice: 11699.00,
    discount: "-31 %",
    savings: 3700,
    rating: 5.0,
    reviewsCount: 5,
    motorTorque: "50 Nm",
    batteryCapacity: "360 Wh",
    image: "/img/prod/vtt-mondraker-neat.jpg",
    badgePromo: true,
    isNew: true,
    description: "High-End Carbon Enduro mit geräuschlosem TQ HPR50 Motor für das natürlichste Fahrerlebnis der Welt.",
    specs: {
      frame: "Stealth Air Full Carbon Zero Suspension 150mm",
      brakes: "SRAM Code R 4-Piston 200/200",
      range: "Bis zu 80 km",
      weight: "17.9 kg"
    }
  }
];