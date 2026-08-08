// components/blog/blogData.js

export const categories = [
  { name: "Paint Protection", slug: "paint-protection" },
  { name: "Window Films", slug: "window-films" },
  { name: "Car Care Tips", slug: "car-care" },
  { name: "For Installers", slug: "for-installers" },
];

export const posts = [
  {
    slug: "how-to-protect-car-scratches",
    title:
      "How to Protect Your Car From Scratches, Stone Chips and Bird Droppings",
    excerpt:
      "Stone chips, swirl marks, bird droppings and UV exposure are the four things that actually age car paint in India. Here's what causes each, and where film earns its cost.",
    image: "/images/blog/protect-car-paint-hero.jpg",
    category: "Paint Protection",
    categorySlug: "paint-protection",
    date: "2026-08-05", // placeholder — update to actual publish date
    readTime: "6 min read",
    author: "HOGONN Technical Team", // placeholder — spec wants a named real person
    metaTitle: "How to Protect Your Car From Scratches and Stone Chips",
    metaDescription:
      "Stone chips, swirl marks and bird droppings are the four things that age car paint in India. Here is what causes each, what prevents it, and when film is worth it.",
    content: [
      {
        type: "p",
        text: "Most paint damage does not happen in one dramatic moment. It accumulates — a chip on the bonnet from a highway stone, a set of fine swirls from a roadside wash, a dull patch where a bird dropping sat in the sun for a day.",
      },
      {
        type: "p",
        text: "None of it is individually serious. Together, over three or four years, it is the difference between a car that looks its age and one that does not — and at resale, that difference is measured in money.",
      },
      {
        type: "p",
        text: "This guide covers what actually causes paint damage on Indian roads, what you can do about it for free, and where protective film genuinely earns its cost.",
      },
      { type: "image", src: "/images/blog/protect-car-paint-og.jpg", alt: "Stone chip damage on a car bonnet" },
      { type: "h2", text: "The Four Things That Actually Damage Car Paint" },
      { type: "h3", text: "Stone Chips and Road Debris" },
      {
        type: "p",
        text: "The most common cause of paint damage in India, and the hardest to repair invisibly. A stone thrown up at 80 km/h carries enough energy to break through clear coat and base coat in one strike. Bonnets, front bumpers, wing mirrors and the leading edge of the roof take the worst of it.",
      },
      { type: "h3", text: "Scratches and Swirl Marks" },
      {
        type: "p",
        text: "The fine cobweb pattern visible under direct sunlight. These come from washing more often than from anything else: a gritty sponge, a reused bucket, an automatic brush wash, or wiping dust off a dry panel.",
      },
      { type: "image", src: "/images/blog/swirl-marks.jpg", alt: "Swirl marks visible on dark car paint in sunlight" },
      { type: "h3", text: "Bird Droppings and Tree Sap" },
      {
        type: "p",
        text: "Bird droppings are acidic, and in direct sun they can etch through clear coat within hours. The lasting damage is not the stain but the chemical reaction beneath it. Tree sap behaves similarly and hardens, so scraping it off adds scratches to the etching.",
      },
      { type: "h3", text: "UV Exposure and Oxidation" },
      {
        type: "p",
        text: "The slowest of the four and the easiest to miss, because it happens evenly across the car. Ultraviolet radiation breaks down the clear coat over years, dulling colour and eventually causing a chalky surface.",
      },
      { type: "h2", text: "What You Can Do Without Spending Anything" },
      { type: "h3", text: "Change How You Wash the Car" },
      {
        type: "p",
        text: "Use two buckets: one with shampoo, one with plain water to rinse the mitt between panels. That single change keeps grit out of the wash and prevents most swirl marks. Avoid automatic brush washes entirely — the brushes hold grit from every car before yours.",
      },
      { type: "image", src: "/images/blog/two-bucket-wash.jpg", alt: "Two-bucket car washing method to prevent swirl marks" },
      { type: "h3", text: "Clean Contamination Immediately" },
      {
        type: "p",
        text: "Bird droppings and tree sap cause damage as a function of time and heat. Removed within a few hours, they usually leave nothing. Keep a detailing spray and a microfibre cloth in the car.",
      },
      { type: "h3", text: "Think About Where You Park" },
      {
        type: "p",
        text: "Shade reduces UV damage and keeps the surface cool. Covered parking is the single most effective free measure available.",
      },
      { type: "h3", text: "Keep Your Distance on Highways" },
      {
        type: "p",
        text: "Most stone chips come from the vehicle in front. Increasing following distance reduces both the number and the velocity of impacts.",
      },
      { type: "h2", text: "Where Everyday Care Stops Working" },
      {
        type: "p",
        text: "Good habits substantially reduce swirl marks, etching and UV damage. They do very little about stone chips. A stone strikes with force — the only thing that helps is a physical layer between the stone and the paint.",
      },
      { type: "h2", text: "Paint Protection Film: What It Is and What It Does" },
      {
        type: "p",
        text: "Paint protection film, usually shortened to PPF, is a transparent thermoplastic polyurethane film applied over painted panels. Quality body films are around 188 microns thick — roughly twice the thickness of a car's factory clear coat.",
      },
      {
        type: "p",
        text: "Modern films do more than absorb impact. A self-healing top coat closes light scratches when heat is applied. A hydrophobic surface makes water bead and roll off, resisting the acidic etching caused by bird droppings.",
      },
      { type: "image", src: "/images/blog/water-beading-film.jpg", alt: "Water beading on hydrophobic paint protection film" },
      { type: "h2", text: "Paint Protection Film or Ceramic Coating?" },
      {
        type: "p",
        text: "A ceramic coating is a liquid polymer measured in microns in the single digits — it does not stop stone chips. Paint protection film is roughly a hundred times thicker, and it does. Many owners apply both.",
      },
      { type: "h2", text: "What to Check Before Choosing a Film" },
      { type: "h3", text: "Thickness" },
      {
        type: "p",
        text: "Most quality body films are around 188 microns, or 7.5 mil. Films for glass, such as windshield and sunroof film, are typically thinner at around 163 microns.",
        links: [
          { text: "windshield", href: "/products/windshield-ppf/" },
          { text: "sunroof film", href: "/products/sunroof-ppf/" },
        ],
      },
      { type: "h3", text: "TPU Source" },
      {
        type: "p",
        text: "Ask which TPU the film uses. Established polymer producers such as Covestro, BASF and Lubrizol supply the global film industry — and a manufacturer willing to name its source is telling you something a brochure adjective cannot.",
      },
      { type: "h3", text: "Warranty and Anti-Yellowing Term" },
      {
        type: "p",
        text: "Ask two questions, not one: how long is the warranty, and is anti-yellowing covered for that full period? A ten-year warranty with three years of anti-yellowing cover is not a ten-year film.",
      },
      { type: "h3", text: "Self-Healing" },
      {
        type: "p",
        text: "Most quality films now self-heal. Ask whether that is rated at 100% heat healing, and try it on a sample.",
      },
      { type: "h2", text: "How Much of the Car Should You Cover?" },
      {
        type: "p",
        text: "Front-end coverage — bonnet, front bumper, wing mirrors and the leading edge of the roof — addresses the areas that take the overwhelming majority of stone chips. Full-body coverage protects everything, including doors, rear quarters and the boot.",
      },
      { type: "image", src: "/images/blog/film-application.jpg", alt: "Paint protection film being applied to a car bonnet" },
      { type: "quote", text: "For stone chips, film is the only answer that works." },
      {
        type: "p",
        text: "HOGONN manufactures paint protection film in India across six grades, with warranties from 6 to 10 years. If you would like to understand the options, explore our range or contact us and we will point you to an installer.",
      },
    ],
    faqs: [
      {
        q: "What causes most paint damage on Indian roads?",
        a: "Stone chips from highway driving are the most common cause, followed by swirl marks from washing, acidic etching from bird droppings and tree sap, and UV fading over time.",
      },
      {
        q: "Can bird droppings really damage car paint?",
        a: "Yes. Bird droppings are acidic and can etch through clear coat within hours in direct sun. Wiping them off late often leaves a permanent dull mark.",
      },
      {
        q: "Does ceramic coating protect against stone chips?",
        a: "No. A ceramic coating improves gloss and makes cleaning easier, but it does not absorb impact. Stone chip protection requires a physical film such as paint protection film.",
      },
      {
        q: "How thick should paint protection film be?",
        a: "Most quality body films are around 188 microns, which is 7.5 mil. HOGONN body films are 188 microns. Glass films are typically thinner at 163 microns.",
      },
      {
        q: "What is self-healing paint protection film?",
        a: "Self-healing film has a top coat formulated so light scratches close up when heat is applied. HOGONN films are rated 100% heat healing.",
      },
      {
        q: "Will paint protection film turn yellow in Indian sun?",
        a: "Lower-grade films can amber within a couple of seasons. HOGONN clear and matte films carry anti-yellowing cover for the full warranty term, up to 10 years on PPF VAJRA.",
      },
      {
        q: "Does paint protection film damage the original paint when removed?",
        a: "Quality film uses an adhesive designed for clean removal and can be taken off without lifting factory paint.",
      },
      {
        q: "How much of the car should be covered?",
        a: "Front-end coverage addresses the highest-impact areas. Full-body coverage protects everything including doors and rear panels. Discuss with an installer based on how the vehicle is used.",
      },
    ],
  },
];

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}