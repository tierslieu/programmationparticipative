template = new Map([
  [
    "Chantier",
    [
      {
        name: "Participer au chantier",
        description:
          "Pense à prendre des chaussures fermées, de quoi te protéger du soleil, et tu peux prendre une douche sur place",
        min: 1,
        max: 99,
        active: true,
        slug: "Participer",
        minuteEnAvance: 0,
      },
      {
        name: "Préparation du repas bénévole",
        description: "",
        min: 1,
        max: 99,
        active: true,
        slug: "Repas",
        minuteEnAvance: 0,
      },
    ],
  ],

  [
    "Réunion",
    [
      {
        name: "Participer à la réunion",
        description:
          "Venir en tant que participant. Aucune connaissance particulière requise, seulement de la bonne volonté",
        min: 1,
        max: 20,
        active: false,
        slug: "Participer",
        minuteEnAvance: 0,
      },
      {
        name: "Animer la réunion",
        description:
          "Permettre que la réunion se passe dans de bonnes conditions en facilitant la prise de parole de toustes",
        min: 1,
        max: 2,
        active: true,
        slug: "Animer",
        minuteEnAvance: 30,
      },
    ],
  ],

  [
    "Soirée",
    [
      {
        name: "Aide au Bar",
        description: "Aider au service des boissons. Un bienveillant est présent pour encadrer l'équipe. Aucune compétence particullière n'est requise, seule la bonne volonté et la bonne humeur suffisent",
        min: 2,
        max: 3,
        active: true,
        slug: "Bar",
        moitie: false,
        minuteEnAvance: 30,
      },
      {
        name: "Aide à la cuisine",
        description: "Aider à la préparation du repas et au dressage des assiettes. Un bienveillant est présent pour encadrer l'équipe. Aucune compétence particullière n'est requise, seule la bonne volonté et la bonne humeur suffisent",
        min: 2,
        max: 4,
        active: true,
        slug: "Cuisine",
        moitie: true,
        minuteEnAvance: 150,
        image: "https://programme.laraffinerie.re/public/oceco-restauration.jpg",
      },
      {
        name: "Aide à l'accueil",
        description: "Accueillir les gens qui viennent à l'événement, prendre les nouvelles adhésions et faire les recharges de cartes cashless",
        min: 2,
        max: 3,
        active: true,
        slug: "Accueil",
        moitie: false,
        minuteEnAvance: 30,
        image: "https://programme.laraffinerie.re/public/oceco-accueil.jpg",
      },
      {
        name: "Volontaire polyvalent",
        description: "couteau suisse",
        min: 1,
        max: 3,
        active: true,
        slug: "Polyvalent",
        moitie: true,
        minuteEnAvance: 30,
        image: "https://programme.laraffinerie.re/public/oceco-volant.jpg",
      },
      {
        name: "Volontaire à la technique",
        description: "Nécessite d'avoir participé à une formation sur le matériel technique (sono / vidéo)",
        min: 1,
        max: 2,
        active: true,
        slug: "Technique",
        moitie: false,
        minuteEnAvance: 30,
      },
    ],
  ],

  [
    "Atelier",
    [
      {
        name: "Participer à l'atelier'",
        description:
          "Les ateliers sont des moments de pratique en commun. Chacun vient avec ce qu'il sait faire pour le partager ou apprendre des autres.",
        min: 1,
        max: 15,
        active: true,
        slug: "Participer",
        minuteEnAvance: 0,
      },
      {
        name: "Animer l'atelier",
        description:
          "L'animateur de l'atelier fait en sorte que l'atelier se déroule dans de bonnes conditions : il prévoit le matériel, l'espace, permet à chacun.e d'être inclus.e'",
        min: 1,
        max: 2,
        active: true,
        slug: "Animer",
        minuteEnAvance: 30,
      },
    ],
  ],

  [
    "Formation",
    [
      {
        name: "Participer à la formation",
        description: "Participer à la formation pour apprendre ou développer quelque chose",
        min: 1,
        max: 20,
        active: true,
        slug: "Participer",
        minuteEnAvance: 00,
      },
      {
        name: "Animer la formation",
        description: "Le formateur crée le contenu de sa formation et la transmet aux participants",
        min: 1,
        max: 2,
        active: true,
        slug: "Animer",
        minuteEnAvance: 90,
        creditsNegatif: true
      },
    ],
  ],
]);
