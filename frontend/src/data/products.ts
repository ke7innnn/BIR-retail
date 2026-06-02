import { Product, Category } from "../types";

export const CATEGORIES: Category[] = [
  {
    "id": "all",
    "name": "all",
    "label": "All Collections",
    "description": "Curated collection of all premium dry fruits and snacks.",
    "iconName": "Grid"
  },
  {
    "id": "classic",
    "name": "classic",
    "label": "Classic Dry Fruits",
    "description": "Premium selection of whole almonds, jumbo cashews, Chilean walnuts, and sweet dates.",
    "iconName": "Nut"
  },
  {
    "id": "crazy-bites",
    "name": "crazy-bites",
    "label": "Crazy Bites Flavors",
    "description": "Gourmet slow-roasted almonds and cashews infused with Himalayan pink salt, pepper, and peri-peri.",
    "iconName": "Sparkles"
  },
  {
    "id": "makhana",
    "name": "makhana",
    "label": "Makhana Masti",
    "description": "Super crispy, nutrient-dense fox nuts roasted to perfection in classic salted, peri-peri, and mint.",
    "iconName": "Flame"
  },
  {
    "id": "exotic-fruits",
    "name": "exotic-fruits",
    "label": "Exotic & Honey",
    "description": "Plump seedless raisins, organic pitted prunes, and pristine silver leaf forest honey.",
    "iconName": "Heart"
  },
  {
    "id": "gift-hampers",
    "name": "gift-hampers",
    "label": "Gift Packs & Hampers",
    "description": "Exquisite mandala-themed gift boxes containing assorted premium selections for your loved ones.",
    "iconName": "Gift"
  }
];

export const PRODUCTS: Product[] = [
  {
    "id": "makhana-masti-pudina",
    "name": "Makhana Masti - Pudina",
    "description": "...",
    "longDescription": "Sourced from the finest local organic orchards and laboratories, every batch represents the peak of nutritional value, clean processing, and crunchy freshness. Hand-packed in a FSSAI-compliant clean facility to deliver uncompromised gourmet taste.",
    "price": 9.95,
    "originalPrice": 11.95,
    "rating": 4.6,
    "reviewsCount": 144,
    "image": "/images/products/makhana-masti-pudina.png",
    "images": [
      "/images/products/makhana-masti-pudina.png"
    ],
    "category": "makhana",
    "categoryLabel": "Makhana Masti",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 23,
    "variants": [
      "35g Pack",
      "100g Jar"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "makhana-masti-peri-peri",
    "name": "Makhana Masti - Peri Peri",
    "description": "...",
    "longDescription": "Sourced from the finest local organic orchards and laboratories, every batch represents the peak of nutritional value, clean processing, and crunchy freshness. Hand-packed in a FSSAI-compliant clean facility to deliver uncompromised gourmet taste.",
    "price": 9.95,
    "rating": 4.9,
    "reviewsCount": 192,
    "image": "/images/products/makhana-masti-peri-peri.jpg",
    "images": [
      "/images/products/makhana-masti-peri-peri.jpg"
    ],
    "category": "makhana",
    "categoryLabel": "Makhana Masti",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 34,
    "variants": [
      "35g Pack",
      "100g Jar"
    ]
  },
  {
    "id": "makhana-masti-salted",
    "name": "Makhana Masti- Salted",
    "description": "...",
    "longDescription": "Sourced from the finest local organic orchards and laboratories, every batch represents the peak of nutritional value, clean processing, and crunchy freshness. Hand-packed in a FSSAI-compliant clean facility to deliver uncompromised gourmet taste.",
    "price": 9.95,
    "rating": 4.7,
    "reviewsCount": 76,
    "image": "/images/products/makhana-masti-salted.jpg",
    "images": [
      "/images/products/makhana-masti-salted.jpg"
    ],
    "category": "makhana",
    "categoryLabel": "Makhana Masti",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 38,
    "variants": [
      "35g Pack",
      "100g Jar"
    ]
  },
  {
    "id": "crazy-dates",
    "name": "Crazy Dates",
    "description": "...",
    "longDescription": "Sourced from the finest local organic orchards and laboratories, every batch represents the peak of nutritional value, clean processing, and crunchy freshness. Hand-packed in a FSSAI-compliant clean facility to deliver uncompromised gourmet taste.",
    "price": 24.95,
    "originalPrice": 30.95,
    "rating": 4.6,
    "reviewsCount": 213,
    "image": "/images/products/crazy-dates.jpg",
    "images": [
      "/images/products/crazy-dates.jpg"
    ],
    "category": "crazy-bites",
    "categoryLabel": "Crazy Bites Flavors",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 35,
    "variants": [
      "200g",
      "400g",
      "800g"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "family-pack-of-5-premium-dry-fruits-i-blue-750g-with-blue-mandala-sleeves",
    "name": "Family Pack of 5 Premium Dry Fruits I Blue | 750g with Blue Mandala Sleeves.",
    "description": "This Diwali, kindle the spirit of togetherness with our Family Pack of 5 Premium Dry Fruits. Inside the beautifully crafted box, you'll find a careful...",
    "longDescription": "This Diwali, kindle the spirit of togetherness with our Family Pack of 5 Premium Dry Fruits. Inside the beautifully crafted box, you'll find a carefully curated selection of 5 Classic Dry Fruits, chosen for their premium quality &amp; wellness benefits. Beautifully presented in a stunning, limited-edition, Blue Mandala festive theme, this hamper is sure to pamper every recipient. Make it a gift to remember by personalizing the outer sleeve with your name or logo, adding a subtle yet warm touch. Inclusions: California Almonds (150g) Premium Walnuts (125g) California Pistachios (125g) Golden Raisins (175g) Oman Dates (175g)",
    "price": 84.95,
    "rating": 4.7,
    "reviewsCount": 108,
    "image": "/images/products/family-pack-of-5-premium-dry-fruits-i-blue-750g-with-blue-mandala-sleeves.jpg",
    "images": [
      "/images/products/family-pack-of-5-premium-dry-fruits-i-blue-750g-with-blue-mandala-sleeves.jpg"
    ],
    "category": "gift-hampers",
    "categoryLabel": "Gift Packs & Hampers",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 15,
    "variants": [
      "Gift Pack Standard",
      "Family Premium Size"
    ]
  },
  {
    "id": "family-pack-of-5-premium-dry-fruits-i-purple-750g-with-purple-floral-sleeves",
    "name": "Family Pack of 5 Premium Dry Fruits I Purple | 750g with Purple Chakra Sleeves.",
    "description": "This Diwali, kindle the spirit of togetherness with our Family Pack of 5 Premium Dry Fruits. Inside the beautifully crafted box, you'll find a careful...",
    "longDescription": "This Diwali, kindle the spirit of togetherness with our Family Pack of 5 Premium Dry Fruits. Inside the beautifully crafted box, you'll find a carefully curated selection of 5 Classic Dry Fruits, chosen for their premium quality &amp; wellness benefits. Beautifully presented in a stunning, limited-edition, Purple Chakra festive theme, this hamper is sure to pamper every recipient. Make it a gift to remember by personalizing the outer sleeve with your name or logo, adding a subtle yet warm touch. Inclusions: California Almonds (150g) Dried Figs (125g) Premium Walnuts (125g) Golden Raisins (175g) Oman Dates (175g)",
    "price": 89.95,
    "rating": 4.5,
    "reviewsCount": 221,
    "image": "/images/products/family-pack-of-5-premium-dry-fruits-i-purple-750g-with-purple-floral-sleeves.jpg",
    "images": [
      "/images/products/family-pack-of-5-premium-dry-fruits-i-purple-750g-with-purple-floral-sleeves.jpg"
    ],
    "category": "gift-hampers",
    "categoryLabel": "Gift Packs & Hampers",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 19,
    "variants": [
      "Gift Pack Standard",
      "Family Premium Size"
    ],
    "badge": "New Arrival"
  },
  {
    "id": "family-pack-of-5-premium-dry-fruits-i-red-750g-with-golden-pattern-sleeves",
    "name": "Family Pack of 5 Premium Dry Fruits I Red | 750g with Golden Pattern Sleeves.",
    "description": "This Diwali, kindle the spirit of togetherness with our Family Pack of 5 Premium Dry Fruits. Inside the beautifully crafted box, you'll find a careful...",
    "longDescription": "This Diwali, kindle the spirit of togetherness with our Family Pack of 5 Premium Dry Fruits. Inside the beautifully crafted box, you'll find a carefully curated selection of 5 Classic Dry Fruits, chosen for their premium quality &amp; wellness benefits. Beautifully presented in a stunning, limited-edition, golden festive theme sleeve, this hamper is sure to pamper every recipient. Make it a gift to remember by personalizing the outer sleeve with your name or logo, adding a subtle yet warm touch. Inclusions: California Almonds (150g) Premium Cashews (150g) Golden Raisins (150g) California Pistachios (125g) Oman Dates (175g)",
    "price": 49.95,
    "originalPrice": 74.95,
    "rating": 4.8,
    "reviewsCount": 167,
    "image": "/images/products/family-pack-of-5-premium-dry-fruits-i-red-750g-with-golden-pattern-sleeves.jpg",
    "images": [
      "/images/products/family-pack-of-5-premium-dry-fruits-i-red-750g-with-golden-pattern-sleeves.jpg"
    ],
    "category": "gift-hampers",
    "categoryLabel": "Gift Packs & Hampers",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 17,
    "variants": [
      "Gift Pack Standard",
      "Family Premium Size"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "california-almonds-1-kg",
    "name": "Premium California Almonds 1 KG (Badaam/Badam) FREE Container",
    "description": "Nonpareil Premium California Almonds | Badaam - Sourced from the best farms. FREE Container - Packed in a 100% food grade, bpa-free plastic storage co...",
    "longDescription": "Nonpareil Premium California Almonds | Badaam - Sourced from the best farms. FREE Container - Packed in a 100% food grade, bpa-free plastic storage container. Packed with Protein, Vitamin E &amp; Fiber. Perfect for Snacking or adding a Nutty twist to your recipes. Free Shipping on Almonds (Badam) Ministry of Nuts Almonds are bigger and crunchier, and uniform in size. These almonds are premium quality, handpicked and 100% natural. The almonds are stored hygienically in food grade packaging material and go through multiple levels of checks during the processing stage to retain their freshness, crunchiness and uniformity in terms of size, taste and color. They are rich in dietary fibre which is generally known to be an essential part of a healthy &amp; balanced diet. Sourced from the best farms. Packed with protein, vitamin E &amp;amp; fiber. Perfect for snacking or adding a nutty twist to your recipes. Packed in a 100% food grade, airtight, bpa-free plastic storage container. .a_plus_image_with_text_five { position: relative; text-align: center; color: white; } /* Bottom left text */ .bottom-left { position: absolute; bottom: 8px; left: 16px; } /* Top text */ .top { position: absolute; top: 0; padding: 6%; } /* Top left text */ .top-left { position: absolute; top: 8px; left: 16px; } /* Top right text */ .top-right { position: absolute; top: 8px; right: 16px; } /* Bottom right text */ .bottom-right { position: absolute; bottom: 8px; right: 16px; } /* Centered text */ .centered { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); } .a_plus_heading { color: #6f082d; font-size: 70px; line-height: 6rem; font-weight: 600; } .a_plus_texting { color: #812a42; font-weight: 500; font-size: 34px; line-height: 3.5rem; text-align: justify; } .highlight{ color: #6f082d; } /*--------------------------------*/ img.lifestyle { position: absolute; bottom: 0; left: 0; right: 0; } .a_plus_image_with_text { position: relative; text-align: center; color: white; } .background-color{ background: #f6cdbf; } .a_plus_heading_one_desc { position: absolute; bottom: 130px; font-size: 55px; margin: auto; width: 100%; } .a_plus_heading_one_head { position: absolute; bottom: 45px; font-size: 67px; width: 100%; font-weight: 600; } .a_plus_heading_three_head { position: absolute; top: 0; text-align: left; font-size: 34px; color: #8f1035; font-weight: 500; margin-top: 15px; left: 10px; } .a_plus_heading_three_desc { position: absolute; top: 50px; color: #8f1035; } .a_plus_heading_three_desc { position: absolute; top: 70px; color: #8f1035; font-size: 24px; line-height: 2rem; text-align: left; left: 10px; } .a_plus_thrird_second_div { position: absolute; bottom: 40px; display: flex; justify-content: space-around; width: 100%; padding: 10px; } .a_plus_thrird_second_div_left { text-align: left; width: 50%; } .a_plus_heading_three_second_head { font-size: 50px; color: #8f1035; } .a_plus_thrird_second_div_right { text-align: right; width: 50%; } .a_plus_thrird_second_div_left,.a_plus_thrird_second_div_right p { font-size: 10px; color: #905b6d; } p.a_plus_heading_three_second_desc { font-size: 40px; } h4.storage_container { position: absolute; top: 64px; font-size: 60px; width: 100%; } .height-90vh { height: 200vh; } .card_text { padding: 5%; text-align: center; } @media (max-width: 720px) { .a_plus_heading { color: #6f082d; font-size: 22px; line-height: 2rem; font-weight: 600; } .a_plus_texting { color: #812a42; font-weight: 500; font-size: 14px; line-height: 2rem; text-align: justify; } img.lifestyle { position: absolute; bottom: 0; left: 0; right: 0; } .a_plus_image_with_text { position: relative; text-align: center; color: white; } .height-90vh{ height: 90vh; } .background-color{ background: #f6cdbf; } .a_plus_heading_one_desc { bottom: 45px; font-size: 20.3px; } .a_plus_heading_one_head { position: absolute; bottom: 0; width: 100%; font-size: 25px; font-weight: 600; } .a_plus_heading_three_head { position: absolute; top: 0; text-align: left; font-size: 18px; color: #8f1035; font-weight: 500; margin-top: 15px; left: 10px; } .a_plus_heading_three_desc { position: absolute; top: 50px; color: #8f1035; } .a_plus_heading_three_desc { position: absolute; top: 50px; color: #8f1035; font-size: 12px; line-height: 1.1rem; text-align: left; left: 10px; } .a_plus_thrird_second_div { position: absolute; bottom: 0; display: flex; justify-content: space-around; width: 100%; padding: 10px; } .a_plus_thrird_second_div_left { text-align: left; width: 50%; } .a_plus_heading_three_second_head { font-size: 12px; color: #8f1035; } .a_plus_thrird_second_div_right { text-align: right; width: 50%; } .a_plus_thrird_second_div_left,.a_plus_thrird_second_div_right p { font-size: 10px; color: #905b6d; } p.a_plus_heading_three_second_desc { font-size: 10px; } h4.storage_container { top: 14px; font-size: 18px; } } Crunch into the goodness of CALIFORNIA ALMONDS! What Is Activated Almonds? Simply soaking almonds for a few hours will make them activated. Easy to digest Almonds contains enzyme inhibitors &amp; tannins that can make them hard to digest. Soaking almonds breaks down this inhibitors making them easier on digestive system. Absorption of minerals Activation also reduces phytic acid improving the body’s ability to absorb essential minerals. Storing Almonds For Maximum Freshness How many almonds should we eat daily? If you’re new to eating almonds daily, then it's best to begin with just 2 almonds. After having 5 almonds daily for good 3 weeks, you can increase the daily intake to 10 almonds (only if you don’t suffer from any digestive issues). Now for the people with optimum digestive capacity, who exercises daily, drinks enough water and habituated to have almonds since long can have 20 almonds daily. Popular Searches Q. Almonds Nutrition A. A serving of Almonds contains 162 Calories, 15g of Healthy Fats, 6g of Protein, and 3g of Fiber. Additionally, Almonds are rich in Vitamin E, Magnesium, and antioxidants. Q. Almonds Benefits A. Almonds are a great source of Vitamin E and Antioxidants, which benefit skin and heart health respectively. They also aid in muscle repair post exercise. Q. How To Eat Almonds? A. Here are three ways to enjoy almonds: eat them as a snack, blend them into milk, or use them as a mix-in for your desserts. Q. Types Of Almonds A. Almonds have two types: Pareil and Non-Pareil. Nonpareil almonds have a thin outer shell and a smooth surface, making them easy to process. Q. Almonds Benefits For Women A. Almonds are beneficial for women, especially during their teenage years when they face a lot of skin issues. Almonds contain Healthy Fatty Acids and Vitamin E, which support healthy skin. Additionally, they are good Q. Almonds Nutrition Facts 100g A. In a 100-gram serving of Almonds, you can find 21 grams of Protein, 44 grams of Healthy Fats and 11.8 grams of Dietary Fiber. Q. How Many Almonds To Eat Per Day? A. There's no set number of Almonds to eat daily since everyone's digestive capacity is different. If you're new to eating Almonds, start with five and gradually increase to 10 over three weeks if you don't experience Q. How Many Almonds Should I Eat In A Day To Build Muscle? A. To build muscle, you can eat up to 20 Almonds per day if you exercise regularly and stay hydrated. When using dry fruits in recipes, add cooling ingredients like fennel, melon seeds, poppy seeds, or rose petals. Q. Almond Benefit For Male A. Almonds are rich in Protein, Zinc, and Fiber, which can improve men's sexual health. They also promote healthy skin and hair. Q. Almond Benefits For Skin A. The Fatty Acids in Almonds prevent skin dryness, and Vitamin E helps reduce wrinkles and dark circles. Q. Benefits Of Almonds For Brain A. Almonds are rich in L-carnitine and Riboflavin, which promote growth of brain cells. Additionally, they contain Phenylalanine, a chemical that enhances cognitive function. Q. How To Eat Almonds In The Morning? A. Soak 5 Almonds at night and peel them to have in the morning. Q. How To Eat Almonds For Weight Gain? A. To gain weight, try having Almond Banana Smoothies or freezing Almonds with dark chocolate. Q. Is It Better To Eat Almonds With Skin Or Without Skin? A. Almonds with skin contain enzyme inhibitors and tannins. Soaking them overnight enhances their digestibility and nutrient absorption. Q. Almonds Protein Per 100g A. Almonds have 21 grams of Protein per 100g. Q. Fat In Almonds Per 100g A. Almonds contain 49g of Total Fat per 100g, with 44g being Healthy Fats. Q. Almonds For Heart Health A. Almonds are rich in Monounsaturated and Polyunsaturated Fats, which can help lower LDL cholesterol levels, making them a heart-healthy snack option. Q. Almonds For Diabetic Patients A. Almonds are high in Protein, Fibre and Fat but low in carbs and sugar to support blood sugar balance.",
    "price": 79.95,
    "rating": 4.8,
    "reviewsCount": 274,
    "image": "/images/products/california-almonds-1-kg.jpg",
    "images": [
      "/images/products/california-almonds-1-kg.jpg"
    ],
    "category": "classic",
    "categoryLabel": "Classic Dry Fruits",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": false,
    "stockCount": 0,
    "variants": [
      "200g",
      "400g",
      "800g"
    ]
  },
  {
    "id": "crazy-cashew-green-chilli-flavour-100g",
    "name": "Crazy Cashew Green Chilli Flavour 100g",
    "description": "Spice up your snacking with our roasted Chilli Flavour Crazy Cashews (Kaju) (200g). A fiery delight that’s impossible to resist. Loaded with Healthy F...",
    "longDescription": "Spice up your snacking with our roasted Chilli Flavour Crazy Cashews (Kaju) (200g). A fiery delight that’s impossible to resist. Loaded with Healthy Fats, Protein and Fiber. Buy roasted Chilli Flavour Cashews online in India at the best price.",
    "price": 10.95,
    "rating": 4.7,
    "reviewsCount": 82,
    "image": "/images/products/crazy-cashew-green-chilli-flavour-100g.jpg",
    "images": [
      "/images/products/crazy-cashew-green-chilli-flavour-100g.jpg"
    ],
    "category": "crazy-bites",
    "categoryLabel": "Crazy Bites Flavors",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 29,
    "variants": [
      "200g",
      "400g",
      "800g"
    ]
  },
  {
    "id": "crazy-cashew-black-pepper-salt-flavour-100g",
    "name": "Crazy Cashew Black Pepper & Salt Flavour 100g",
    "description": "Salt &amp; Black Pepper Flavour Cashews (Kaju) (200g) are perfectly roasted and seasoned with a blend of salt &amp; black pepper. High in protein, ess...",
    "longDescription": "Salt &amp; Black Pepper Flavour Cashews (Kaju) (200g) are perfectly roasted and seasoned with a blend of salt &amp; black pepper. High in protein, essential minerals, &amp; heart-healthy fats. It’s a nutritious snack to satisfy your fiery cravings! Buy Salt &amp; Black Pepper Cashews at the best price online in India.",
    "price": 10.95,
    "originalPrice": 13.95,
    "rating": 4.9,
    "reviewsCount": 53,
    "image": "/images/products/crazy-cashew-black-pepper-salt-flavour-100g.jpg",
    "images": [
      "/images/products/crazy-cashew-black-pepper-salt-flavour-100g.jpg"
    ],
    "category": "crazy-bites",
    "categoryLabel": "Crazy Bites Flavors",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 39,
    "variants": [
      "200g",
      "400g",
      "800g"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "crazy-cashew-himalayan-pink-salt-flavour-100g",
    "name": "Crazy Cashew Himalayan Pink Salt Flavour 100g",
    "description": "Indulge in perfectly roasted premium Cashews. Delicately seasoned with the finest Himalayan Pink Salt. They are a rich source of Magnesium, Zinc, &amp...",
    "longDescription": "Indulge in perfectly roasted premium Cashews. Delicately seasoned with the finest Himalayan Pink Salt. They are a rich source of Magnesium, Zinc, &amp; Heart Healthy Fats. Making them the ultimate guilt-free snack.. Buy Salted Cashews at the best price online in India.",
    "price": 10.95,
    "rating": 4.7,
    "reviewsCount": 81,
    "image": "/images/products/crazy-cashew-himalayan-pink-salt-flavour-100g.jpg",
    "images": [
      "/images/products/crazy-cashew-himalayan-pink-salt-flavour-100g.jpg"
    ],
    "category": "crazy-bites",
    "categoryLabel": "Crazy Bites Flavors",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 11,
    "variants": [
      "200g",
      "400g",
      "800g"
    ],
    "badge": "New Arrival"
  },
  {
    "id": "crazy-almonds-peri-peri-flavour-100g",
    "name": "Crazy Almonds Peri Peri Flavour 100g",
    "description": "Our Peri Peri Flavour Crazy Almonds (Badaam) is a hit among the ones who loves it medium spicy. Roasted to perfection &amp; coated with Peri Peri seas...",
    "longDescription": "Our Peri Peri Flavour Crazy Almonds (Badaam) is a hit among the ones who loves it medium spicy. Roasted to perfection &amp; coated with Peri Peri seasoning. They are loaded with Protein, Healthy Fats, and Vitamin E.",
    "price": 10.95,
    "rating": 4.6,
    "reviewsCount": 219,
    "image": "/images/products/crazy-almonds-peri-peri-flavour-100g.jpg",
    "images": [
      "/images/products/crazy-almonds-peri-peri-flavour-100g.jpg"
    ],
    "category": "crazy-bites",
    "categoryLabel": "Crazy Bites Flavors",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 39,
    "variants": [
      "200g",
      "400g",
      "800g"
    ]
  },
  {
    "id": "crazy-almond-himalayan-pink-salt-200g-1",
    "name": "Crazy Almond Himalayan Pink Salt 100g",
    "description": "Our Salted Flavour Crazy Almonds (Badaam) are a classic comfort snack. Roasted to perfection &amp; coated with Himalayan Pink Salt seasoning. Loaded w...",
    "longDescription": "Our Salted Flavour Crazy Almonds (Badaam) are a classic comfort snack. Roasted to perfection &amp; coated with Himalayan Pink Salt seasoning. Loaded with Protein, Healthy Fats, and Vitamin E.",
    "price": 10.95,
    "originalPrice": 13.95,
    "rating": 4.5,
    "reviewsCount": 205,
    "image": "/images/products/crazy-almond-himalayan-pink-salt-200g-1.jpg",
    "images": [
      "/images/products/crazy-almond-himalayan-pink-salt-200g-1.jpg"
    ],
    "category": "crazy-bites",
    "categoryLabel": "Crazy Bites Flavors",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 9,
    "variants": [
      "200g",
      "400g",
      "800g"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "ministry-of-nuts-pack-of-3-premium-dry-fruits-california-almonds-200g-whole-cashew-nuts-200g-dates-200g-total-600g",
    "name": "Ministry Of Nuts Pack of 3 Premium Dry Fruits California Almonds 200g, Whole Cashew Nuts 200g, Dates 200g Total 600g",
    "description": "Our California Almonds or Badam are sourced from the best farms. Packed with Protein, Vitamin E &amp; Fiber. Our Whole Cashews or Kaju are bigger &amp...",
    "longDescription": "Our California Almonds or Badam are sourced from the best farms. Packed with Protein, Vitamin E &amp; Fiber. Our Whole Cashews or Kaju are bigger &amp; uniform in size. Source of Calcium, Magnesium &amp; Vitamin K. Dates - Source of quick and sustained energy Packed with Fiber, Vitamins &amp; Minerals",
    "price": 40.95,
    "rating": 4.8,
    "reviewsCount": 273,
    "image": "/images/products/ministry-of-nuts-pack-of-3-premium-dry-fruits-california-almonds-200g-whole-cashew-nuts-200g-dates-200g-total-600g.jpg",
    "images": [
      "/images/products/ministry-of-nuts-pack-of-3-premium-dry-fruits-california-almonds-200g-whole-cashew-nuts-200g-dates-200g-total-600g.jpg"
    ],
    "category": "gift-hampers",
    "categoryLabel": "Gift Packs & Hampers",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 32,
    "variants": [
      "Gift Pack Standard",
      "Family Premium Size"
    ]
  },
  {
    "id": "ministry-of-nuts-pitted-prunes-400gm",
    "name": "Ministry Of Nuts Pitted Prunes 400gm",
    "description": "Our Pitted Prunes or Dried Plums are a Fibre-filled delight! Known to promote Digestive Health. Have more Antioxidants than their fresh counterparts. ...",
    "longDescription": "Our Pitted Prunes or Dried Plums are a Fibre-filled delight! Known to promote Digestive Health. Have more Antioxidants than their fresh counterparts. Toss them in your cereals or savour them as they are. Enjoy Free Shipping on order above Rs. 499. Popular Searches Q. Prunes Benefits A. Prunes stand out as a notable Potassium source, essential for regulating blood pressure . With their high Fiber content, they act as effective laxatives, offering relief from constipation in aged adults and infants. Additionally, Prunes boast significant levels of Boron and Vitamin K, crucial for maintaining bone health . Q. Prunes Benefits For Weight Loss A. Prunes are rich in Fiber , which promotes satiety and aids in weight management. Q. Prunes Benefits For Skin A. Prunes contain Antioxidants that protect skin cells from free radicals . They also have Iron, Vitamin K, and Beta-carotene, which help in delay signs of aging . Q. Prunes Benefits For Female A. Prunes offer a trio of key nutrients - Potassium, Vitamin K, and Manganese - vital for strong bones . Plus, they aid in Estrogen balance and support a regular menstrual cycle. Q. Best Time To Eat Prunes A. The best time to consume Prunes is either in the morning or before bedtime. Q. How Many Prunes A Day? A. If you're looking to enjoy some yummy Prunes, a good amount to have is about 5 to 6 per day. Q. Pitted Prunes Uses A. Here are three quick ways to enjoy Pitted Prunes: as a standalone snack , as a filling for baked goods , or as a binding ingredient in no-bake snacks like energy balls. Q. Pitted Prunes Price A. Ministry of Nuts offers a 200g pack of Pitted Prunes for Rs. 299. Q. Calories In 5 Prunes A. A serving of 5 Pitted Prunes contains 115 Calories . Q. How Much Fiber In 5 Prunes A. A serving of 5 Pitted Prunes contains 3.5 grams of Dietary Fibre . Q. Eating Prunes At Night A. Eating Prunes at night can be beneficial for your sleep. Prunes, also known as Dried Plums, are a great source of Vitamins and Minerals such as Vitamin B6, Calcium, and Magnesium. These nutrients can help in the production of Melatonin, the hormone that regulates sleep . You can add prunes as a topping on your dessert or eat them on their own a few hours before going to bed to improve your sleep quality. Q. Pitted Prunes Uses For Skin Pigmentation A. Prunes, also known as Khushk Alobukhara, are a superfood for the skin due to their high Vitamin C content , which helps prevent skin pigmentation. Q. Dried Plum Meaning A. Plums are small, sweet fruits that are dark reddish-purple in colour. They have smooth, edible skin, juicy flesh, and a hard pit in the middle. When the fruit is fresh, we call it a Plum. However, when it is dried, it is referred to as a Prune. Q. Sukha Aloo Bukhara Kahan Milta Hai A. Ministry Of Nuts offers Sukha Aloo Bukhara (Pitted Prunes) in a 200-gram pack.",
    "price": 24.95,
    "rating": 4.8,
    "reviewsCount": 162,
    "image": "/images/products/ministry-of-nuts-pitted-prunes-400gm.jpg",
    "images": [
      "/images/products/ministry-of-nuts-pitted-prunes-400gm.jpg"
    ],
    "category": "exotic-fruits",
    "categoryLabel": "Exotic & Honey",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 25,
    "variants": [
      "200g",
      "400g",
      "800g"
    ]
  },
  {
    "id": "ministry-of-nuts-pack-of-3-premium-dry-fruits-dates-200g-walnut-200g-figs-200g-total-600g",
    "name": "Ministry Of Nuts Pack Of 3 Premium Dry Fruits Dates 200g, Walnut 200g, Figs 200g Total 600g",
    "description": "Premium quality, chewy Dried Anjeer (Dried Figs). Loaded with Antioxidants, Vitamins &amp; Fiber. Dates - Source of quick and sustained energy Packed ...",
    "longDescription": "Premium quality, chewy Dried Anjeer (Dried Figs). Loaded with Antioxidants, Vitamins &amp; Fiber. Dates - Source of quick and sustained energy Packed with Fiber, Vitamins &amp; Minerals Our Premium Walnuts or Akhrot are a rare plant-based source of Omega-3 Fatty Acids. Beneficial for both Brain and Heart Health.",
    "price": 56.95,
    "originalPrice": 70.95,
    "rating": 4.7,
    "reviewsCount": 64,
    "image": "/images/products/ministry-of-nuts-pack-of-3-premium-dry-fruits-dates-200g-walnut-200g-figs-200g-total-600g.jpg",
    "images": [
      "/images/products/ministry-of-nuts-pack-of-3-premium-dry-fruits-dates-200g-walnut-200g-figs-200g-total-600g.jpg"
    ],
    "category": "gift-hampers",
    "categoryLabel": "Gift Packs & Hampers",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 22,
    "variants": [
      "Gift Pack Standard",
      "Family Premium Size"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "ministry-of-nuts-raisins-dates-walnut-200g-each-total-600g",
    "name": "Ministry Of Nuts Raisins, Dates, Walnut (200g each) Total 600g",
    "description": "Raisins - Hand-sorted &amp; Free from Twigs. Have more concentrated nutrition levels than Grapes. Dates - Source of quick and sustained energy Packed ...",
    "longDescription": "Raisins - Hand-sorted &amp; Free from Twigs. Have more concentrated nutrition levels than Grapes. Dates - Source of quick and sustained energy Packed with Fiber, Vitamins &amp; Minerals Our Premium Walnuts or Akhrot are a rare plant-based source of Omega-3 Fatty Acids. Beneficial for both Brain and Heart Health.",
    "price": 41.95,
    "rating": 4.7,
    "reviewsCount": 168,
    "image": "/images/products/ministry-of-nuts-raisins-dates-walnut-200g-each-total-600g.jpg",
    "images": [
      "/images/products/ministry-of-nuts-raisins-dates-walnut-200g-each-total-600g.jpg"
    ],
    "category": "exotic-fruits",
    "categoryLabel": "Exotic & Honey",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 38,
    "variants": [
      "200g",
      "400g",
      "800g"
    ]
  },
  {
    "id": "ministry-of-nuts-almond-walnut-figs-200g-each-total-600g",
    "name": "Ministry Of Nuts Almond, Walnut, Figs (200g each) Total 600g",
    "description": "Our California Almonds or Badam are sourced from the best farms. Packed with Protein, Vitamin E &amp; Fiber. Premium quality, chewy Dried Anjeer (Drie...",
    "longDescription": "Our California Almonds or Badam are sourced from the best farms. Packed with Protein, Vitamin E &amp; Fiber. Premium quality, chewy Dried Anjeer (Dried Figs). Loaded with Antioxidants, Vitamins &amp; Fiber. Our Premium Walnuts or Akhrot are a rare plant-based source of Omega-3 Fatty Acids. Beneficial for both Brain and Heart Health.",
    "price": 62.95,
    "rating": 4.6,
    "reviewsCount": 197,
    "image": "/images/products/ministry-of-nuts-almond-walnut-figs-200g-each-total-600g.jpg",
    "images": [
      "/images/products/ministry-of-nuts-almond-walnut-figs-200g-each-total-600g.jpg"
    ],
    "category": "classic",
    "categoryLabel": "Classic Dry Fruits",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": false,
    "stockCount": 0,
    "variants": [
      "200g",
      "400g",
      "800g"
    ]
  },
  {
    "id": "ministry-of-nuts-california-almonds-dates-figs-200g-each-total-600g",
    "name": "Ministry of Nuts California Almonds, Dates, Figs (200g each) Total 600g",
    "description": "Our California Almonds or Badam are sourced from the best farms. Packed with Protein, Vitamin E &amp; Fiber. Premium quality, chewy Dried Anjeer (Drie...",
    "longDescription": "Our California Almonds or Badam are sourced from the best farms. Packed with Protein, Vitamin E &amp; Fiber. Premium quality, chewy Dried Anjeer (Dried Figs). Loaded with Antioxidants, Vitamins &amp; Fiber. Dates - Source of quick and sustained energy Packed with Fiber, Vitamins &amp; Minerals",
    "price": 46.95,
    "originalPrice": 58.95,
    "rating": 4.9,
    "reviewsCount": 159,
    "image": "/images/products/ministry-of-nuts-california-almonds-dates-figs-200g-each-total-600g.jpg",
    "images": [
      "/images/products/ministry-of-nuts-california-almonds-dates-figs-200g-each-total-600g.jpg"
    ],
    "category": "classic",
    "categoryLabel": "Classic Dry Fruits",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 7,
    "variants": [
      "200g",
      "400g",
      "800g"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "family-pack-of-5-premium-dry-fruits-375g",
    "name": "Family Pack Of 5 Premium Dry Fruits (375g)",
    "description": "Family Pack of 5 Premium Dry Fruits (375g) is a constant on the family table. Treat yourself and your family to a treasure trove of hand-selected Dry ...",
    "longDescription": "Family Pack of 5 Premium Dry Fruits (375g) is a constant on the family table. Treat yourself and your family to a treasure trove of hand-selected Dry Fruits. These fresh nuts are power-packed with Vitamins &amp; Minerals. The Dry Fruits box contains California Almonds/Badam(75g), Pista/Pistachios (75g), Whole Cashew/Kaju (75g), Raisins/Kishmish (75g) &amp; Dates/Khajoor (75g).",
    "price": 29.95,
    "rating": 4.7,
    "reviewsCount": 246,
    "image": "/images/products/family-pack-of-5-premium-dry-fruits-375g.jpg",
    "images": [
      "/images/products/family-pack-of-5-premium-dry-fruits-375g.jpg"
    ],
    "category": "gift-hampers",
    "categoryLabel": "Gift Packs & Hampers",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 15,
    "variants": [
      "Gift Pack Standard",
      "Family Premium Size"
    ]
  },
  {
    "id": "family-pack-of-5-premium-dry-fruits-i-purple-750g-gift-pack",
    "name": "Family Pack of 5 Premium Dry Fruits I Purple | 750g | Gift Pack",
    "description": "Family Pack of 5 Premium Dry Fruits is a constant on the family table. These fresh nuts are power-packed with Vitamins &amp; Minerals . It's a perfect...",
    "longDescription": "Family Pack of 5 Premium Dry Fruits is a constant on the family table. These fresh nuts are power-packed with Vitamins &amp; Minerals . It's a perfect, thoughtful gift for your friends, family, colleagues, clients, or loved ones. Go ahead &amp; buy dry fruits now! Family Pack of 5 Combo Contains: Almonds/Badaam (150g), Dried figs/Anjeer (125g), Walnuts/Akhrot (125g), Raisins/Kishmish (175g), &amp; Dates/Khajoor (175g). * Return Policy : Eligible for Return in 7 Days post Delivery. * Terms &amp; Conditions Apply Manufactured By: Candor Food Ptv. Ltd. W-202A MIDC,TTC Industrial Area, Kopar Khairane, Navi Mumbai, Thane Maharashtra 400710.",
    "price": 84.95,
    "rating": 4.8,
    "reviewsCount": 103,
    "image": "/images/products/family-pack-of-5-premium-dry-fruits-i-purple-750g-gift-pack.jpg",
    "images": [
      "/images/products/family-pack-of-5-premium-dry-fruits-i-purple-750g-gift-pack.jpg"
    ],
    "category": "gift-hampers",
    "categoryLabel": "Gift Packs & Hampers",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 20,
    "variants": [
      "Gift Pack Standard",
      "Family Premium Size"
    ],
    "badge": "New Arrival"
  },
  {
    "id": "crazy-cashews-cheese-flavour-1-x-35g",
    "name": "Crazy Cashews Cheese Flavour 35g | Cheese Cashews",
    "description": "Cheese Flavour Crazy Cashews (Kaju) (35g) - A treat for cheese lovers! Loaded with Healthy Fats , Protein and Fiber . Roasted evenly to satisfy your c...",
    "longDescription": "Cheese Flavour Crazy Cashews (Kaju) (35g) - A treat for cheese lovers! Loaded with Healthy Fats , Protein and Fiber . Roasted evenly to satisfy your cravings guilt-free. Buy Cheese Cashews at the best price online in India.",
    "price": 2.95,
    "originalPrice": 3.95,
    "rating": 4.6,
    "reviewsCount": 164,
    "image": "/images/products/crazy-cashews-cheese-flavour-1-x-35g.webp",
    "images": [
      "/images/products/crazy-cashews-cheese-flavour-1-x-35g.webp"
    ],
    "category": "crazy-bites",
    "categoryLabel": "Crazy Bites Flavors",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 16,
    "variants": [
      "200g",
      "400g",
      "800g"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "ministry-of-nuts-pack-of-4-premium-walnuts-i-akhrot",
    "name": "Ministry Of Nuts Pack Of 4 Premium Walnuts I Akhrot",
    "description": "Our Premium Walnuts or Akhrot are a rare plant-based source of Omega-3 Fatty Acids. Beneficial for both Brain and Heart Health. Indulge in them as a s...",
    "longDescription": "Our Premium Walnuts or Akhrot are a rare plant-based source of Omega-3 Fatty Acids. Beneficial for both Brain and Heart Health. Indulge in them as a snack or use them to elevate your recipes to a new height of yumminess.",
    "price": 99.95,
    "rating": 4.5,
    "reviewsCount": 59,
    "image": "/images/products/ministry-of-nuts-pack-of-4-premium-walnuts-i-akhrot.jpg",
    "images": [
      "/images/products/ministry-of-nuts-pack-of-4-premium-walnuts-i-akhrot.jpg"
    ],
    "category": "gift-hampers",
    "categoryLabel": "Gift Packs & Hampers",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 39,
    "variants": [
      "Gift Pack Standard",
      "Family Premium Size"
    ]
  },
  {
    "id": "silver-leaf-honey-200g",
    "name": "Silver Leaf Honey 200g",
    "description": "Silver Leaf Honey | Shahad - I'm made with honey &amp; 100% pure silver leaves. Better than refined sugar with Minerals, Vitamins, &amp; Enzymes. A gr...",
    "longDescription": "Silver Leaf Honey | Shahad - I'm made with honey &amp; 100% pure silver leaves. Better than refined sugar with Minerals, Vitamins, &amp; Enzymes. A great addition to salad dressings, overnight oats, &amp; french toast. Free Shipping on Silver Leaf Honey (Shahad).",
    "price": 14.95,
    "rating": 4.6,
    "reviewsCount": 290,
    "image": "/images/products/silver-leaf-honey-200g.jpg",
    "images": [
      "/images/products/silver-leaf-honey-200g.jpg"
    ],
    "category": "exotic-fruits",
    "categoryLabel": "Exotic & Honey",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 21,
    "variants": [
      "200g",
      "400g",
      "800g"
    ]
  },
  {
    "id": "spicy-chatpata-cranberry-100g",
    "name": "spicy chatpata cranberry 100g",
    "description": "...",
    "longDescription": "Sourced from the finest local organic orchards and laboratories, every batch represents the peak of nutritional value, clean processing, and crunchy freshness. Hand-packed in a FSSAI-compliant clean facility to deliver uncompromised gourmet taste.",
    "price": 9.95,
    "originalPrice": 11.95,
    "rating": 4.8,
    "reviewsCount": 62,
    "image": "https://images.unsplash.com/photo-1508061253366-f7da158b6d96?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d96?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "exotic-fruits",
    "categoryLabel": "Exotic & Honey",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 33,
    "variants": [
      "200g",
      "400g",
      "800g"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "silver-leaf-honey",
    "name": "Silver Leaf Honey 450g",
    "description": "Silver Leaf Honey | Shahad - I'm made with honey &amp; 100% pure silver leaves. Better than refined sugar with Minerals, Vitamins, &amp; Enzymes. A gr...",
    "longDescription": "Silver Leaf Honey | Shahad - I'm made with honey &amp; 100% pure silver leaves. Better than refined sugar with Minerals, Vitamins, &amp; Enzymes. A great addition to salad dressings, overnight oats, &amp; french toast. Free Shipping on Silver Leaf Honey (Shahad).",
    "price": 29.95,
    "rating": 4.8,
    "reviewsCount": 247,
    "image": "/images/products/silver-leaf-honey-200g.jpg",
    "images": [
      "/images/products/silver-leaf-honey-200g.jpg"
    ],
    "category": "exotic-fruits",
    "categoryLabel": "Exotic & Honey",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 18,
    "variants": [
      "200g",
      "400g",
      "800g"
    ],
    "badge": "New Arrival"
  },
  {
    "id": "roasted-salted-pistachios-30g",
    "name": "Roasted & Salted Pistachios (30g)",
    "description": "...",
    "longDescription": "Sourced from the finest local organic orchards and laboratories, every batch represents the peak of nutritional value, clean processing, and crunchy freshness. Hand-packed in a FSSAI-compliant clean facility to deliver uncompromised gourmet taste.",
    "price": 2.95,
    "rating": 4.7,
    "reviewsCount": 92,
    "image": "https://images.unsplash.com/photo-1508061253366-f7da158b6d96?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d96?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "crazy-bites",
    "categoryLabel": "Crazy Bites Flavors",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 28,
    "variants": [
      "200g",
      "400g",
      "800g"
    ]
  },
  {
    "id": "seedless-raisins-500g",
    "name": "Seedless Raisins 500 Grams (Premium Kishmish)",
    "description": "Raisins - Hand-sorted &amp; Free from Twigs. Have more concentrated nutrition levels than Grapes. Enjoy them as a snack or use them as a natural sweet...",
    "longDescription": "Raisins - Hand-sorted &amp; Free from Twigs. Have more concentrated nutrition levels than Grapes. Enjoy them as a snack or use them as a natural sweetener for cookies, muffins, and kheer.",
    "price": 19.95,
    "originalPrice": 24.95,
    "rating": 4.5,
    "reviewsCount": 204,
    "image": "/images/products/seedless-raisins-500g.webp",
    "images": [
      "/images/products/seedless-raisins-500g.webp"
    ],
    "category": "exotic-fruits",
    "categoryLabel": "Exotic & Honey",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": false,
    "stockCount": 0,
    "variants": [
      "200g",
      "400g",
      "800g"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "black-raisins-200g",
    "name": "Ministry Of Nuts Premium Black Raisins (Kishmish)",
    "description": "Our Black Raisins or Kali Kishmish have sweetness in every bite! Rich in Dietary Fibre, Iron and Antioxidants. Indulge in them straight out of the pac...",
    "longDescription": "Our Black Raisins or Kali Kishmish have sweetness in every bite! Rich in Dietary Fibre, Iron and Antioxidants. Indulge in them straight out of the pack or mix them into your desserts. Enjoy Free Shipping on Order above Rs. 499. Popular Searches Q. Black Raisins Benefits A. You know, adding Black Raisins to our diet can do wonders for our hearts! They help check our blood pressure and cholesterol levels , which is super important for heart health. And get this, they're loaded with Potassium , which is like a special treat for our hearts, keeping them strong. Oh, and let's not forget the fibre -packed goodness in Black Raisins – it helps maintain digestive health . Q. Black Raisins Nutrition A. Black Raisins are a nutrient-dense snack, containing about 373 Calories per 100 grams. They include 10% of the daily recommended Iron , 8% of the daily recommended Magnesium , and 16% of the daily recommended Potassium . Q. Black Raisins Uses A. You can replace sugar with Black Raisins in desserts like cookies, cakes, and kheer for a touch of natural sweetness. You can also amp up the nutrition in your smoothies by adding a handful of Black Raisins. Q. Black Raisins Benefits For Skin A. Black Raisins are rich in Antioxidants such as Vitamin C and Flavonoids. These Antioxidants help fight free radicals , which may harm your skin cells. Inadequate Iron levels can also cause a pale complexion and dark bags beneath the eyes. However, Black Raisins contain a lot of Iron, so eating them will help you battle Iron deficiency Anaemia and minimize dark circles . Q. Black Raisins Benefits For Male A. The natural sugars in Black Raisins provide a rapid energy boost , which can be useful for strenuous activity and maintaining energy levels throughout the day. Black raisins include Potassium, which is essential for muscular function and recovery from exercise. Including Black Raisins in post-workout snacks or meals can assist replace electrolytes and aid muscle repair Q. Black Raisins Benefits For Female A. Black Raisins are loaded with Calcium &amp; Boron, which are crucial for keeping your bones strong and healthy . This is especially important for women, as they're more prone to bone issues as they age. Trying to shed some pounds? Black Raisins are a low-fat, low-calorie snack that can help you feel full and satisfied without packing on extra pounds. Q. Black Raisins Benefits In Pregnancy A. They're packed with all sorts of essential nutrients that are super beneficial for both the mom-to-be and her growing baby during pregnancy. Now, let's talk about constipation – it's a common struggle for many pregnant women, right? But guess what? These fibre-rich Black Raisins help ease constipation and those uncomfortable tummy pains, making life a little easier for moms-to-be. Q. 10 Black Raisins Calories A. There are approximately 33 Calories in 10 Black Raisins (Munakka). Q. Black Raisins Calories 100g A. Black Raisins contain approximately 373 Calories per 100 grams. Q. Black Raisins In India Online A. Ministry Of Nuts offers 200 grams of Black Raisins (Munakka) for Rs. 159. Q. Munakka Vs Kishmish A. Munakka is like the superhero of Raisins, especially for people with low iron levels. These raisins are larger, darker, and slightly chewier than the more usual golden brown \"Kishmish\".",
    "price": 8.95,
    "rating": 4.9,
    "reviewsCount": 85,
    "image": "/images/products/black-raisins-200g.webp",
    "images": [
      "/images/products/black-raisins-200g.webp"
    ],
    "category": "exotic-fruits",
    "categoryLabel": "Exotic & Honey",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 18,
    "variants": [
      "200g",
      "400g",
      "800g"
    ]
  },
  {
    "id": "family-pack-of-5-premium-dry-fruits-i-red-750g-with-blue-spiritual-sleeves",
    "name": "Family Pack of 5 Premium Dry Fruits I Red | 750g with Blue Spiritual Sleeves.",
    "description": "...",
    "longDescription": "Sourced from the finest local organic orchards and laboratories, every batch represents the peak of nutritional value, clean processing, and crunchy freshness. Hand-packed in a FSSAI-compliant clean facility to deliver uncompromised gourmet taste.",
    "price": 74.95,
    "rating": 4.7,
    "reviewsCount": 84,
    "image": "/images/products/family-pack-of-5-premium-dry-fruits-i-red-750g-with-blue-spiritual-sleeves.jpg",
    "images": [
      "/images/products/family-pack-of-5-premium-dry-fruits-i-red-750g-with-blue-spiritual-sleeves.jpg"
    ],
    "category": "gift-hampers",
    "categoryLabel": "Gift Packs & Hampers",
    "specs": {
      "Brand": "Ministry of Nuts",
      "Processing": "Sun-dried & Low-temperature Roasted",
      "Packaging": "Airtight Resealable Premium Canister",
      "Certification": "100% Organic & FSSAI Compliant",
      "Shelf Life": "9 Months"
    },
    "inStock": true,
    "stockCount": 26,
    "variants": [
      "Gift Pack Standard",
      "Family Premium Size"
    ]
  }
];
