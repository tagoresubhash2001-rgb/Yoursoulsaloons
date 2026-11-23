# Image map

Every photo on the site, where it appears, and where it came from. **Each photo is used exactly once** —
run `npm run audit:images` (also runs automatically before every `npm run build`) to verify.

All photos are served from `public/images/<category>/<name>-<width>.webp` at 480/800/1200 px (heroes: 768/1280/1920 px) with `srcset`, lazy loading (except heroes) and `object-fit: cover`.
They are registered in `src/config/images.ts`; to use your own photos, replace the files and keep the same names (or edit the registry).

Source: photos marked `unsplash:<id>` are from Unsplash (free to use under the Unsplash License, https://unsplash.com/license). The 8 hero banners were already in this repo.

| # | Key | Category | File | Appears on | Source |
|---|---|---|---|---|---|
| 1 | `heroSalonHome` | salon-interior | `salon-interior-monochrome` | Salon › Home — hero banner (`src/config/siteContent.ts:36`) | existing banner |
| 2 | `heroSalonAbout` | women-hair | `women-hair-long-waves` | Salon › About — hero banner (`src/config/siteContent.ts:56`) | existing banner |
| 3 | `heroSalonServices` | women-hair | `women-hair-blowdry-styling` | Salon › Services — hero banner (`src/config/siteContent.ts:77`) | existing banner |
| 4 | `heroSalonContact` | salon-tools | `salon-styling-tools` | Salon › Contact — hero banner (`src/config/siteContent.ts:98`) | existing banner |
| 5 | `heroAcademyHome` | academy | `academy-blowdry-training` | Academy › Home — hero banner (`src/config/siteContent.ts:121`) | existing banner |
| 6 | `heroAcademyAbout` | salon-interior | `salon-interior-rose-chairs` | Academy › About — hero banner (`src/config/siteContent.ts:142`) | existing banner |
| 7 | `heroAcademyServices` | makeup | `makeup-brushes-studio` | Academy › Courses — hero banner (`src/config/siteContent.ts:163`) | existing banner |
| 8 | `heroAcademyContact` | salon-interior | `salon-interior-reception-hall` | Academy › Contact — hero banner (`src/config/siteContent.ts:184`) | existing banner |
| 9 | `homeHairStyling` | women-hair | `women-hair-curl-styling` | Salon › Home — card "Hair Styling & Haircuts" (`src/pages/HomePage.tsx:56`) | unsplash:1560869713-7d0a29430803 |
| 10 | `homeHairColour` | women-hair | `women-hair-colour-curls` | Salon › Home — card "Hair Colouring & Highlights" (`src/pages/HomePage.tsx:66`) | unsplash:1629397685944-7073f5589754 |
| 11 | `homeBridal` | saree-draping | `saree-draping-bridal-silk` | Salon › Home — card "Bridal Makeup & Occasion Styling" (`src/pages/HomePage.tsx:76`) | unsplash:1610030469983-98e550d6193c |
| 12 | `homeExtensions` | women-hair | `women-hair-long-volume` | Salon › Home — card "Hair Extensions & Enhancements" (`src/pages/HomePage.tsx:86`) | unsplash:1492106087820-71f1a00d2b11 |
| 13 | `homeNails` | nails | `nails-gel-manicure` | Salon › Home — card "Nail Care & Extensions" (`src/pages/HomePage.tsx:96`) | unsplash:1632345031435-8727f6897d53 |
| 14 | `homeSkin` | skin | `skin-facial-mask` | Salon › Home — card "Skin Care & Beauty Treatments" (`src/pages/HomePage.tsx:106`) | unsplash:1570172619644-dfd03ed5d881 |
| 15 | `homeScalp` | skin | `skin-scalp-head-massage` | Salon › Home — card "Scalp Detox & Trichology Therapy" (`src/pages/HomePage.tsx:116`) | unsplash:1596178060671-7a80dc8059ea |
| 16 | `homeTexture` | women-hair | `women-hair-wash-treatment` | Salon › Home — card "Texture Realignment & Cysteine" (`src/pages/HomePage.tsx:126`) | unsplash:1634449571010-02389ed0f9b0 |
| 17 | `homeMens` | beard | `beard-hot-towel-shave` | Salon › Home — card "Men's Atelier Grooming & Beard Design" (`src/pages/HomePage.tsx:136`) | unsplash:1503951914875-452162b0f3f1 |
| 18 | `homeRetail` | salon-products | `salon-aftercare-products` | Salon › Home — Aftercare / retail desk (`src/pages/HomePage.tsx:724`) | unsplash:1631729371254-42c2892f0e6e |
| 19 | `homeApproachCut` | men-haircut | `men-haircut-precision` | Salon › Home — "Sculpting Form to Facial Geometry" row (`src/pages/HomePage.tsx:815`) | unsplash:1622286342621-4bd786c2447c |
| 20 | `homeApproachBasin` | skin | `skin-hot-stone-therapy` | Salon › Home — "Warm Basalt Stones…" row (`src/pages/HomePage.tsx:841`) | unsplash:1600334089648-b0d9d3028eb2 |
| 21 | `svcHaircut` | salon-team | `salon-stylists-team` | Salon › Services — "Hair Design & Architectural Haircuts" (`src/components/ServicesListing.tsx:56`) | unsplash:1559599101-f09722fb4948 |
| 22 | `svcColour` | women-hair | `women-hair-balayage` | Salon › Services — "Colour Chemistry & French Balayage" (`src/components/ServicesListing.tsx:73`) | unsplash:1554519934-e32b1629d9ee |
| 23 | `svcBridal` | makeup | `makeup-lip-artistry` | Salon › Services — "Bridal Makeup & Haute Occasion Styling" (`src/components/ServicesListing.tsx:90`) | unsplash:1487412947147-5cebf100ffc2 |
| 24 | `svcExtensions` | women-hair | `women-hair-occasion-updo` | Salon › Services — "Seamless Hair Extensions & Volume" (`src/components/ServicesListing.tsx:107`) | unsplash:1582095133179-bfd08e2fc6b3 |
| 25 | `svcDermal` | skin | `skin-facial-treatment` | Salon › Services — "Cellular Dermal Care & Sculptural Facials" (`src/components/ServicesListing.tsx:124`) | unsplash:1616394584738-fc6e612e71b9 |
| 26 | `svcTrichology` | women-hair | `women-hair-basin-ritual` | Salon › Services — "Trichology Scalp Therapy & Basalt Basins" (`src/components/ServicesListing.tsx:141`) | unsplash:1595476108010-b4d1f102b1b1 |
| 27 | `svcNails` | nails | `nails-polish-application` | Salon › Services — "Nail Atelier & Sterile Dry Manicures" (`src/components/ServicesListing.tsx:158`) | unsplash:1457972729786-0411a3b2b626 |
| 28 | `aboutFounders` | salon-tools | `salon-craft-tools-hands` | Salon › About — "About Our Founders" (`src/config/siteContent.ts:221`) | unsplash:1595475884562-073c30d45670 |
| 29 | `aboutVision` | salon-interior | `salon-interior-modern` | Salon › About — Vision section (`src/config/siteContent.ts:248`) | unsplash:1633681926022-84c23e8cb2d6 |
| 30 | `aboutMission` | men-grooming | `men-grooming-tool-kit` | Salon › About — Mission section (`src/config/siteContent.ts:275`) | unsplash:1621605815971-fbc98d665033 |
| 31 | `aboutApproach` | skin | `skin-body-massage-ritual` | Salon › About — Approach section (`src/config/siteContent.ts:303`) | unsplash:1544161515-4ab6ce6db874 |
| 32 | `acadTrainers` | academy | `academy-classroom-seminar` | Academy › About — Trainers section (`src/config/siteContent.ts:337`) | unsplash:1524178232363-1fb2b075b655 |
| 33 | `acadVision` | skin | `skin-serum-science` | Academy › About — Vision section (`src/config/siteContent.ts:364`) | unsplash:1515377905703-c4788e51af15 |
| 34 | `acadMission` | skin | `skin-clinical-facial` | Academy › About — Mission section (`src/config/siteContent.ts:391`) | unsplash:1552693673-1bf958298935 |
| 35 | `acadApproach` | salon-interior | `salon-interior-studio-mirrors` | Academy › About — Teaching approach section (`src/config/siteContent.ts:418`) | unsplash:1600948836101-f9ffda59d250 |
| 36 | `acadHomeTrainers` | salon-interior | `salon-interior-white-studio` | Academy › Home — Trainers story (`src/pages/HomePage.tsx:242`) | unsplash:1595944024804-733665a112db |
| 37 | `acadHomeApproach` | salon-interior | `salon-interior-ornate-mirrors` | Academy › Home — Teaching approach story (`src/pages/HomePage.tsx:243`) | unsplash:1633681138600-295fcd688876 |
| 38 | `courseHaircut` | men-haircut | `men-haircut-blowdry` | Academy › Courses — Precision Haircutting Diploma (`src/components/ServicesListing.tsx:178`) | unsplash:1605497788044-5a32c7078486 |
| 39 | `courseColour` | women-hair | `women-hair-vivid-colour` | Academy › Courses — Balayage & Colour Correction Masterclass (`src/components/ServicesListing.tsx:195`) | unsplash:1470259078422-826894b933aa |
| 40 | `courseEsthetics` | skin | `skin-botanical-oil` | Academy › Courses — Clinical Esthetics Diploma (`src/components/ServicesListing.tsx:212`) | unsplash:1617897903246-719242758050 |
| 41 | `courseMakeup` | makeup | `makeup-palette-artist` | Academy › Courses — Bridal & Editorial Makeup Masterclass (`src/components/ServicesListing.tsx:229`) | unsplash:1596704017254-9b121068fb31 |
| 42 | `modeBasicHome` | salon-interior | `salon-interior-training-floor` | Academy › Home — BASIC learning mode (`src/config/siteContent.ts:715`) | unsplash:1626383137804-ff908d2753a2 |
| 43 | `modeStandardHome` | men-haircut | `men-haircut-texture-barber` | Academy › Home — STANDARD learning mode (`src/config/siteContent.ts:788`) | unsplash:1567894340315-735d7c361db0 |
| 44 | `modeAdvancedHome` | makeup | `makeup-eye-artistry` | Academy › Home — ADVANCED learning mode (`src/config/siteContent.ts:859`) | unsplash:1613966802194-d46a163af70d |
| 45 | `modeExpertHome` | bridal | `bridal-ethnic-wear` | Academy › Home — EXPERT learning mode (`src/config/siteContent.ts:940`) | unsplash:1583391733956-3750e0ff4e8b |
| 46 | `modeBasicSvc` | makeup | `makeup-brush-kit` | Academy › Courses — BASIC learning mode (`src/config/siteContent.ts:716`) | unsplash:1500840216050-6ffa99d75160 |
| 47 | `modeStandardSvc` | men-haircut | `men-haircut-scissor-comb` | Academy › Courses — STANDARD learning mode (`src/config/siteContent.ts:789`) | unsplash:1647140655214-e4a2d914971f |
| 48 | `modeAdvancedSvc` | skin | `skin-active-formulations` | Academy › Courses — ADVANCED learning mode (`src/config/siteContent.ts:860`) | unsplash:1580870069867-74c57ee1bb07 |
| 49 | `modeExpertSvc` | salon-interior | `salon-interior-barber-lounge` | Academy › Courses — EXPERT learning mode (`src/config/siteContent.ts:941`) | unsplash:1585747860715-2ba37e788b70 |
| 50 | `modeBasicSalon` | makeup | `makeup-starter-kit` | Salon › Home — Academy teaser, BASIC (`src/config/siteContent.ts:717`) | unsplash:1522335789203-aabd1fc54bc9 |
| 51 | `modeStandardSalon` | men-haircut | `men-haircut-razor-lineup` | Salon › Home — Academy teaser, STANDARD (`src/config/siteContent.ts:790`) | unsplash:1599351431202-1e0f0137899a |
| 52 | `modeAdvancedSalon` | skin | `skin-care-products` | Salon › Home — Academy teaser, ADVANCED (`src/config/siteContent.ts:861`) | unsplash:1598440947619-2c35fc9aa908 |
| 53 | `modeExpertSalon` | nails | `nails-lilac-art` | Salon › Home — Academy teaser, EXPERT (`src/config/siteContent.ts:942`) | unsplash:1607779097040-26e80aa78e66 |

The brand logo (`public/images/brand/`) is the only image intentionally shown in more than one place (header + footer).
