/**
 * HOGONN India — Product Categories Static Data
 *
 * This file contains all product category and product data for the HOGONN website.
 * The data structure is designed to match the expected future API response shape as
 * closely as possible so that replacing static data with API calls later requires
 * only changing the service layer, not the UI components.
 *
 * TODO: Replace static data with API calls once backend API is available.
 * See: src/service/productCategoryService.js
 */

export const productCategories = [
  // ─────────────────────────────────────────────────────────────────────────────
  // CATEGORY 1: PAINT PROTECTION FILM
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "paint-protection-film",
    slug: "paint-protection-film",
    name: "Paint Protection Film",
    shortDescription:
      "Six grades of 188-micron self-healing TPU film. Gloss, matte and black finishes with 6, 8 and 10-year warranties.",
    productCount: 6,
    productCountLabel: "6 Films",
    url: "/products/paint-protection-film/",
    type: "collection", // → CollectionPage schema

    metadata: {
      title: "Best Paint Protection Film in India- Up to 10 Year Warranty",
      description:
        "HOGONN paint protection film in six grades - 188 micron self-healing TPU from Covestro, BASF and Lubrizol, with 6, 8 and 10-year warranties. Gloss, matte and black.",
      canonical:
        "https://www.hogonnindia.com/products/paint-protection-film/",
    },

    breadcrumb: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/products/" },
      { name: "Paint Protection Film", url: "/products/paint-protection-film/" },
    ],

    h1: "Paint Protection Film",

    headings: {
      contentH2: "Best Quality Paint Protection Film in India",
      productsH2: "The HOGONN PPF Range",
      comparisonH2: "Compare All Six Films",
      featuresH2: "Paint Protection Film Features",
      beyondCarsH2: "Beyond Cars",
      faqH2: "Frequently Asked Questions",
    },

    intro: [
      "HOGONN paint protection film shields your vehicle from scratches, stone chips, road debris, UV rays and environmental damage. All six films are 188 microns thick, supplied in 1.52 by 15 metre rolls, and built on thermoplastic polyurethane from Covestro, BASF or Lubrizol with Ashland adhesive.",
      "Every film in the range is rated 100% heat healing, hydrophobic and stain resistant, with UV resistance above 90%. Warranties run from 6 to 10 years depending on grade.",
      "Paint protection film is not only for cars. HOGONN film is applied to bicycles, scooters, motorbikes, vans, trucks, buses and trains.",
    ],

    products: [
      {
        id: "yuva-gloss",
        slug: "yuva-gloss",
        name: "PPF YUVA Gloss",
        h3: "PPF YUVA Gloss - 6 Year Warranty",
        warranty: "6 Year Warranty",
        url: "/products/paint-protection-film/yuva-gloss/",
        shortDescription:
          "Entry-level 6-year grade built on Covestro TPU. Clear gloss finish.",
      },
      {
        id: "vayu-gloss",
        slug: "vayu-gloss",
        name: "PPF VAYU Gloss",
        h3: "PPF VAYU Gloss - 8 Year Warranty",
        warranty: "8 Year Warranty",
        url: "/products/paint-protection-film/vayu-gloss/",
        shortDescription:
          "8-year grade on BASF TPU. Clear gloss finish with the widest elongation in the VAYU range.",
      },
      {
        id: "vayu-matte",
        slug: "vayu-matte",
        name: "PPF VAYU Matte",
        h3: "PPF VAYU Matte - 8 Year Warranty",
        warranty: "8 Year Warranty",
        url: "/products/paint-protection-film/vayu-matte/",
        shortDescription:
          "8-year grade on BASF TPU. Matte TPU gives a satin finish over the paint.",
      },
      {
        id: "vayu-black-gloss",
        slug: "vayu-black-gloss",
        name: "PPF VAYU Black Gloss",
        h3: "PPF VAYU Black Gloss - 8 Year Warranty",
        warranty: "8 Year Warranty",
        url: "/products/paint-protection-film/vayu-black-gloss/",
        shortDescription:
          "8-year black gloss film on Covestro TPU. High tear strength at above 126 KN/M.",
      },
      {
        id: "vayu-black-matte",
        slug: "vayu-black-matte",
        name: "PPF VAYU Black Matte",
        h3: "PPF VAYU Black Matte - 8 Year Warranty",
        warranty: "8 Year Warranty",
        url: "/products/paint-protection-film/vayu-black-matte/",
        shortDescription:
          "8-year black matte film on Covestro TPU. High tear strength at above 126 KN/M.",
      },
      {
        id: "vajra-gloss",
        slug: "vajra-gloss",
        name: "PPF VAJRA Gloss",
        h3: "PPF VAJRA Gloss - 10 Year Warranty",
        warranty: "10 Year Warranty",
        url: "/products/paint-protection-film/vajra-gloss/",
        shortDescription:
          "Flagship 10-year grade on Lubrizol TPU. Highest elongation in the range at above 345%.",
      },
    ],

    // PPF comparison table — 6 rows × 8 columns
    comparison: {
      columns: [
        "Product",
        "Warranty",
        "Thickness",
        "TPU",
        "Adhesive",
        "Anti-Yellow",
        "Elongation",
        "Tear Strength",
      ],
      rows: [
        {
          product: "PPF YUVA Gloss",
          warranty: "6 Years",
          thickness: "7.5 Mil / 188 µm",
          tpu: "Covestro",
          adhesive: "Ashland",
          antiYellow: "6 Years",
          elongation: ">250%",
          tearStrength: ">85 KN/M",
          slug: "yuva-gloss",
        },
        {
          product: "PPF VAYU Gloss",
          warranty: "8 Years",
          thickness: "7.5 Mil / 188 µm",
          tpu: "BASF",
          adhesive: "Ashland",
          antiYellow: "8 Years",
          elongation: ">335%",
          tearStrength: ">85 KN/M",
          slug: "vayu-gloss",
        },
        {
          product: "PPF VAYU Matte",
          warranty: "8 Years",
          thickness: "7.5 Mil / 188 µm",
          tpu: "BASF",
          adhesive: "Ashland",
          antiYellow: "8 Years",
          elongation: ">300%",
          tearStrength: ">90 KN/M",
          slug: "vayu-matte",
        },
        {
          product: "PPF VAYU Black Gloss",
          warranty: "8 Years",
          thickness: "7.5 Mil / 188 µm",
          tpu: "Covestro",
          adhesive: "Ashland",
          antiYellow: "Not Applicable",
          elongation: ">320%",
          tearStrength: ">126 KN/M",
          slug: "vayu-black-gloss",
        },
        {
          product: "PPF VAYU Black Matte",
          warranty: "8 Years",
          thickness: "7.5 Mil / 188 µm",
          tpu: "Covestro",
          adhesive: "Ashland",
          antiYellow: "Not Applicable",
          elongation: ">320%",
          tearStrength: ">126 KN/M",
          slug: "vayu-black-matte",
        },
        {
          product: "PPF VAJRA Gloss",
          warranty: "10 Years",
          thickness: "7.5 Mil / 188 µm",
          tpu: "Lubrizol",
          adhesive: "Ashland",
          antiYellow: "10 Years",
          elongation: ">345%",
          tearStrength: ">85 KN/M",
          slug: "vajra-gloss",
        },
      ],
    },

    features: [
      {
        id: "heat-healing",
        h3: "100% Heat Healing",
        description:
          "Every film in the range is rated 100% heat healing. Minor swirl marks and light scratches disappear with heat.",
      },
      {
        id: "hydrophobic",
        h3: "Hydrophobic and Stain Resistant",
        description:
          "Rated excellent on both across all six films. The surface repels water and dirt, making cleaning effortless.",
      },
      {
        id: "uv-resistance",
        h3: "UV Resistance Above 90%",
        description: "Consistent across the range.",
      },
      {
        id: "anti-yellowing",
        h3: "Anti-Yellowing on Clear and Matte Films",
        description:
          "6 years on YUVA, 8 years on VAYU Gloss and VAYU Matte, and 10 years on VAJRA. Not applicable for VAYU Black Gloss and VAYU Black Matte.",
      },
    ],

    beyondCars: {
      intro:
        "Paint protection film is not only for cars. HOGONN film is applied to:",
      vehicles: [
        "Bicycles",
        "Scooters",
        "Motorbikes",
        "Vans",
        "Trucks",
        "Buses",
        "Trains",
      ],
    },

    specifications: null, // PPF uses the comparison table instead

    faqs: [
      {
        q: "Which HOGONN paint protection film should I choose?",
        a: "PPF YUVA is the 6-year grade on Covestro TPU. PPF VAYU is the 8-year grade on BASF TPU and offers the widest choice of finishes. PPF VAJRA is the 10-year grade on Lubrizol TPU, with the highest elongation in the range at over 345%.",
      },
      {
        q: "How thick is HOGONN paint protection film?",
        a: "All six body films are 188 microns, which is 7.5 mil, supplied in 1.52 by 15 metre rolls.",
      },
      {
        q: "What is the difference between gloss and matte paint protection film?",
        a: "Gloss film is clear gloss TPU and keeps the appearance of the paint underneath. Matte film is matte TPU and gives a satin finish. PPF VAYU is available in both.",
      },
      {
        q: "Is HOGONN paint protection film self-healing?",
        a: "Yes. Every film in the range is rated 100% heat healing, so light scratches and swirl marks close up with heat.",
      },
      {
        q: "Do all HOGONN films resist yellowing?",
        a: "Anti-yellowing cover applies to PPF YUVA at 6 years, PPF VAYU Gloss and VAYU Matte at 8 years, and PPF VAJRA at 10 years. It is listed as not applicable for VAYU Black Gloss and VAYU Black Matte.",
      },
      {
        q: "What is the UV resistance of HOGONN paint protection film?",
        a: "UV resistance is greater than 90% across all six body films.",
      },
      {
        q: "Which vehicles can HOGONN paint protection film be applied to?",
        a: "The catalogue lists bicycles, scooters, motorbikes, vans, trucks, buses and trains in addition to cars.",
      },
    ],

    crossLinks: [
      "safety-glaze-window-film",
      "windshield-ppf",
      "sunroof-ppf",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // CATEGORY 2: SAFETY GLAZE WINDOW FILM
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "safety-glaze-window-film",
    slug: "safety-glaze-window-film",
    name: "Safety Glaze Window Film",
    shortDescription:
      "2 mil heat-rejection window film in 50% and 70% VLT. Up to 98.40% infrared rejection and a 10-year warranty.",
    productCount: 2,
    productCountLabel: "2 Variants",
    url: "/products/safety-glaze-window-film/",
    type: "collection",

    metadata: {
      title: "Safety Glaze Window Film | 99.7% UV Rejection | HOGONN",
      description:
        "HOGONN Safety Glaze YUKI window film in 50% and 70% VLT. Up to 98.40% infrared rejection, 99.70% UV rejection and a 10-year warranty.",
      canonical:
        "https://www.hogonnindia.com/products/safety-glaze-window-film/",
    },

    breadcrumb: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/products/" },
      {
        name: "Safety Glaze Window Film",
        url: "/products/safety-glaze-window-film/",
      },
    ],

    h1: "Safety Glaze Window Film",

    headings: {
      introH2: "Advanced Heat Rejection and Superior Privacy",
      productsH2: "Safety Glaze YUKI",
      specificationsH2: "Full Specifications",
      understandingH2: "Understanding the Numbers",
      warrantyH2: "10 Year Warranty",
      faqH2: "Frequently Asked Questions",
    },

    intro: [
      "HOGONN Safety Glaze YUKI is engineered for high performance, durability and long-lasting clarity. It reduces heat, glare and harmful UV rays, enhancing cabin comfort while protecting your vehicle's interior from fading and damage.",
      "A 2 mil film supplied in 1.52 by 30 metre rolls, available in two VLT options and backed by a 10-year warranty — the longest in the HOGONN range. Crafted with advanced technology for colour stability and fade resistance, Safety Glaze YUKI is backed by a 10-year warranty on both VLT options.",
    ],

    products: [
      {
        id: "yuki-50-vlt",
        slug: "yuki-50-vlt",
        name: "YUKI Safety Glaze 50%-10 Years",
        h3: "50% VLT - Balanced Shade with Enhanced Comfort",
        warranty: "10 Years",
        url: "/products/safety-glaze-window-film/yuki-50-vlt/",
        shortDescription:
          "Balanced shade with enhanced comfort. 98.40% infrared rejection and 99.60% UV rejection.",
        specs: {
          vlt: "50%",
          irr: "98.40%",
          tsr: "70%",
          uvr: "99.60%",
          warranty: "10 Years",
        },
      },
      {
        id: "yuki-70-vlt",
        slug: "yuki-70-vlt",
        name: "YUKI Safety Glaze- 70% Blue 10 Years",
        h3: "70% VLT - Light Protection with Near-Clear Visibility",
        warranty: "10 Years",
        url: "/products/safety-glaze-window-film/yuki-70-vlt/",
        shortDescription:
          "Light protection with near-clear visibility. 97.60% infrared rejection and 99.70% UV rejection.",
        specs: {
          vlt: "70%",
          irr: "97.60%",
          tsr: "63.60%",
          uvr: "99.70%",
          warranty: "10 Years",
        },
      },
    ],

    comparison: null, // Safety Glaze uses individual product spec cards

    features: [
      {
        id: "vlt",
        h3: "VLT — Visible Light Transmission",
        description:
          "The percentage of visible light the film lets through. A higher number means a lighter, clearer film.",
      },
      {
        id: "uvr",
        h3: "UVR — Ultraviolet Rejection",
        description:
          "The share of ultraviolet blocked. UV is what fades upholstery and degrades interior plastics.",
      },
      {
        id: "irr",
        h3: "IRR — Infrared Rejection",
        description:
          "The share of infrared blocked. Infrared carries most of the heat you feel inside the cabin.",
      },
      {
        id: "tsr",
        h3: "TSR — Total Solar Rejection",
        description:
          "The overall percentage of solar energy rejected. The single best figure for comparing films.",
      },
    ],

    beyondCars: null,

    specifications: [
      { label: "Film Thickness", value: "2 mil" },
      { label: "Roll Size", value: "1.52 by 30 metre" },
      { label: "Warranty", value: "10 Years" },
      {
        label: "Available VLT Options",
        value: "50% VLT, 70% VLT",
      },
    ],

    faqs: [
      {
        q: "What VLT options does Safety Glaze YUKI come in?",
        a: "Safety Glaze YUKI is available in 50% VLT, described as a balanced shade with enhanced comfort, and 70% VLT, described as light protection with near-clear visibility.",
      },
      {
        q: "How much heat does Safety Glaze YUKI reject?",
        a: "The 50% VLT film has infrared rejection of 98.40% and total solar rejection of 70%. The 70% VLT film has infrared rejection of 97.60% and total solar rejection of 63.60%.",
      },
      {
        q: "How much UV does Safety Glaze YUKI block?",
        a: "Ultraviolet rejection is 99.60% on the 50% VLT film and 99.70% on the 70% VLT film.",
      },
      {
        q: "What do VLT, UVR, IRR and TSR mean?",
        a: "VLT is visible light transmission, the percentage of visible light passing through the film. UVR is ultraviolet rejection. IRR is infrared rejection. TSR is total solar rejection, the overall share of solar energy the film blocks.",
      },
      {
        q: "What warranty does Safety Glaze YUKI carry?",
        a: "Safety Glaze YUKI carries a 10-year warranty on both the 50% and 70% VLT options.",
      },
      {
        q: "What size are Safety Glaze YUKI rolls?",
        a: "Safety Glaze YUKI is a 2 mil film supplied in 1.52 by 30 metre rolls.",
      },
    ],

    crossLinks: [
      "paint-protection-film",
      "windshield-ppf",
      "sunroof-ppf",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // CATEGORY 3: WINDSHIELD PPF
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "windshield-ppf",
    slug: "windshield-ppf",
    name: "Windshield PPF",
    shortDescription:
      "163-micron clear gloss film on Lubrizol TPU. Protects against stone chips, road debris and minor cracks with no distortion. 2-year warranty.",
    productCount: 1,
    productCountLabel: "1 Product",
    url: "/products/windshield-ppf/",
    type: "product", // → Product schema (single-product category)

    metadata: {
      title: "Windshield PPF- Crystal Clear Protection | HOGONN India",
      description:
        "HOGONN Windshield PPF at 163 microns protects against stone chips, road debris and minor cracks with optical clarity and no distortion. 2-year warranty.",
      canonical: "https://www.hogonnindia.com/products/windshield-ppf/",
    },

    breadcrumb: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/products/" },
      { name: "Windshield PPF", url: "/products/windshield-ppf/" },
    ],

    h1: "Windshield PPF",

    headings: {
      introH2: "Crystal Clear Protection",
      visibilityH2: "Maintaining Perfect Visibility",
      specificationsH2: "Specifications",
      warrantyH2: "2 Year Warranty",
      faqH2: "Frequently Asked Questions",
    },

    intro: [
      "Safeguard your vehicle's most vulnerable surface. HOGONN Windshield PPF is specially engineered for optical clarity and high impact resistance, protecting your windshield from stone chips, road debris, minor cracks and daily driving hazards.",
      "Designed to maintain perfect visibility, the film offers superior transparency without distortion, ensuring a safe and comfortable driving experience. Its hydrophobic surface improves water beading during rain, enhancing driving clarity in all weather conditions.",
      "Backed by a 2 Years Warranty, HOGONN Windshield PPF delivers reliable protection, extended glass life and peace of mind on every journey.",
    ],

    products: [
      {
        id: "windshield-ppf-gloss",
        slug: "windshield-ppf-gloss",
        name: "Windshield PPF Gloss",
        h3: "Windshield PPF Gloss - 2 Years",
        warranty: "2 Years",
        url: "/products/windshield-ppf/windshield-ppf-gloss/",
        shortDescription:
          "6.5 mil clear gloss TPU from Lubrizol. Optical clarity with no distortion and hydrophobic surface.",
      },
    ],

    comparison: null,

    features: [
      {
        id: "optical-clarity",
        h3: "Crystal Clear Protection, No Distortion",
        description:
          "Specially engineered for optical clarity, the film offers superior transparency without distortion — so the view through your windscreen is unchanged.",
      },
      {
        id: "impact-resistance",
        h3: "Impact Resistance Against Stone Chips and Road Debris",
        description:
          "Protects the most vulnerable surface on the vehicle from stone chips, road debris, minor cracks and daily driving hazards. A cracked windscreen is a replacement, not a repair.",
      },
      {
        id: "rain-visibility",
        h3: "Better Visibility in Rain",
        description:
          "The hydrophobic surface improves water beading during rainfall, enhancing driving clarity in all weather conditions — a safety benefit, not just a convenience.",
      },
      {
        id: "heat-healing",
        h3: "100% Heat Healing",
        description:
          "Light surface scratches close up with heat, so the glass keeps its clarity rather than accumulating wiper marks and wash swirls over time.",
      },
      {
        id: "lubrizol-tpu",
        h3: "163-Micron Film on Lubrizol TPU",
        description:
          "6.5 mil clear gloss TPU from Lubrizol with Ashland adhesive, UV resistance above 90%, and tear strength above 47 KN/M.",
      },
      {
        id: "warranty",
        h3: "2 Year Warranty and Extended Glass Life",
        description:
          "Reliable protection, extended glass life and peace of mind on every journey.",
      },
    ],

    beyondCars: null,

    specifications: [
      { label: "Thickness", value: "6.5 mil / 163 microns" },
      { label: "Roll Size", value: "1.52 by 15 metre" },
      { label: "TPU", value: "Lubrizol" },
      { label: "Adhesive", value: "Ashland" },
      { label: "UV Resistance", value: ">90%" },
      { label: "Tear Strength", value: ">47 KN/M" },
      { label: "Warranty", value: "2 Years" },
      { label: "Finish", value: "Clear Gloss" },
      { label: "Heat Healing", value: "100%" },
    ],

    faqs: [
      {
        q: "What is windshield paint protection film?",
        a: "Windshield PPF is a clear gloss film applied to the windscreen to protect against stone chips, road debris, minor cracks and daily driving hazards, while maintaining visibility.",
      },
      {
        q: "How thick is HOGONN Windshield PPF?",
        a: "Windshield PPF is 6.5 mil, which is 163 microns, supplied in 1.52 by 15 metre rolls.",
      },
      {
        q: "Will windshield film distort my view?",
        a: "The film is engineered for optical clarity and offers transparency without distortion. Its hydrophobic surface improves water beading during rain.",
      },
      {
        q: "What is Windshield PPF made from?",
        a: "Windshield PPF uses Lubrizol TPU with Ashland adhesive, with UV resistance greater than 90% and tear strength greater than 47 KN/M.",
      },
    ],

    crossLinks: [
      "paint-protection-film",
      "safety-glaze-window-film",
      "sunroof-ppf",
    ],

    // Special cross-link note — Windshield and Sunroof must highlight each other
    glassProtectionPartner: "sunroof-ppf",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // CATEGORY 4: SUNROOF PPF
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "sunroof-ppf",
    slug: "sunroof-ppf",
    name: "Sunroof PPF",
    shortDescription:
      "163-micron clear gloss film on Lubrizol TPU. Shields panoramic and conventional sunroofs with high optical clarity. 3-year warranty.",
    productCount: 1,
    productCountLabel: "1 Product",
    url: "/products/sunroof-ppf/",
    type: "product", // → Product schema (single-product category)

    metadata: {
      title: "Sunroof PPF | Panoramic Roof Protection | HOGONN India",
      description:
        "HOGONN Sunroof PPF at 163 microns shields panoramic and conventional sunroofs from scratches, minor impacts and UV exposure with high optical clarity.",
      canonical: "https://www.hogonnindia.com/products/sunroof-ppf/",
    },

    breadcrumb: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/products/" },
      { name: "Sunroof PPF", url: "/products/sunroof-ppf/" },
    ],

    h1: "Sunroof PPF",

    headings: {
      introH2: "Enhanced Protection for Your Panoramic View",
      surfaceDamageH2: "Reducing Surface Damage",
      specificationsH2: "Specifications",
      warrantyH2: "Warranty",
      faqH2: "Frequently Asked Questions",
    },

    intro: [
      "Protect your vehicle's sunroof with HOGONN Sunroof PPF, specially engineered to shield against scratches, minor impacts, UV exposure and environmental damage. Designed for high optical clarity, it maintains the original look of your glass while adding an extra layer of strength and durability.",
      "Its advanced protective layer helps reduce the risk of surface damage from road debris and daily wear, while the hydrophobic surface repels water and dust for easy maintenance.",
    ],

    products: [
      {
        id: "sunroof-protection-film",
        slug: "sunroof-protection-film",
        name: "Sunroof Protection Film",
        h3: "Sunroof Protection Film - 3 Years",
        warranty: "3 Years",
        url: "/products/sunroof-ppf/sunroof-protection-film/",
        shortDescription:
          "6.5 mil clear gloss TPU from Lubrizol. Panoramic and conventional sunroof protection with high optical clarity.",
      },
    ],

    comparison: null,

    features: [
      {
        id: "panoramic-protection",
        h3: "Enhanced Protection for Your Panoramic View",
        description:
          "Engineered for panoramic and conventional sunroofs, maintaining the original look of your glass while adding a layer of strength and durability.",
      },
      {
        id: "shields-scratches",
        h3: "Shields Against Scratches, Impacts and UV Exposure",
        description:
          "The horizontal surface most exposed to sun, falling debris and environmental fallout — and the one most often overlooked when a vehicle is protected.",
      },
      {
        id: "optical-clarity",
        h3: "High Optical Clarity",
        description:
          "Designed so the glass looks unchanged. Protection that is invisible from inside the cabin and from outside the vehicle.",
      },
      {
        id: "hydrophobic",
        h3: "Hydrophobic Surface for Easy Maintenance",
        description:
          "Repels water and dust, so a roof surface that is awkward to reach stays cleaner between washes.",
      },
      {
        id: "lubrizol-tpu",
        h3: "163-Micron Film on Lubrizol TPU",
        description:
          "6.5 mil clear gloss TPU from Lubrizol with Ashland adhesive, UV resistance above 90%, and 100% heat healing.",
      },
    ],

    beyondCars: null,

    specifications: [
      { label: "Thickness", value: "6.5 mil / 163 microns" },
      { label: "Roll Size", value: "1.52 by 15 metre" },
      { label: "TPU", value: "Lubrizol" },
      { label: "Adhesive", value: "Ashland" },
      { label: "UV Resistance", value: ">90%" },
      { label: "Tear Strength", value: ">47 KN/M" },
      { label: "Heat Healing", value: "100%" },
      { label: "Finish", value: "Clear Gloss" },
      { label: "Warranty", value: "3 Years" },
    ],

    faqs: [
      {
        q: "What is sunroof paint protection film?",
        a: "Sunroof PPF is a clear gloss film applied to a vehicle's sunroof to shield against scratches, minor impacts, UV exposure and environmental damage, while maintaining the original look of the glass.",
      },
      {
        q: "How thick is HOGONN Sunroof PPF?",
        a: "Sunroof PPF is 6.5 mil, which is 163 microns, supplied in 1.52 by 15 metre rolls.",
      },
      {
        q: "Does Sunroof PPF work on panoramic sunroofs?",
        a: "Yes. The film is designed for panoramic and conventional sunroofs, and is engineered for high optical clarity.",
      },
      {
        q: "What is Sunroof PPF made from?",
        a: "Sunroof PPF uses Lubrizol TPU with Ashland adhesive, with UV resistance greater than 90% and tear strength greater than 47 KN/M.",
      },
    ],

    crossLinks: [
      "paint-protection-film",
      "safety-glaze-window-film",
      "windshield-ppf",
    ],

    // Special cross-link note — Windshield and Sunroof must highlight each other
    glassProtectionPartner: "windshield-ppf",
  },
];
