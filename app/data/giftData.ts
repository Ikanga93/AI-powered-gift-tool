export interface Gift {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  ageGroups: string[];
  interests: string[];
  recipientTypes: string[];
  image?: string;
}

export const giftDatabase: Gift[] = [
  // Tech & Gadgets
  {
    id: "1",
    name: "Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation",
    price: 150,
    category: "Technology",
    ageGroups: ["teen", "young-adult", "adult"],
    interests: ["technology", "music", "fitness"],
    recipientTypes: ["friend", "sibling", "colleague"]
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Fitness tracking smartwatch with health monitoring",
    price: 250,
    category: "Technology",
    ageGroups: ["young-adult", "adult"],
    interests: ["fitness", "technology", "health"],
    recipientTypes: ["partner", "friend", "parent"]
  },
  {
    id: "3",
    name: "Portable Charger",
    description: "High-capacity portable battery pack",
    price: 40,
    category: "Technology",
    ageGroups: ["teen", "young-adult", "adult"],
    interests: ["technology", "travel"],
    recipientTypes: ["friend", "colleague", "sibling"]
  },

  // Books & Learning
  {
    id: "4",
    name: "Bestselling Novel",
    description: "Latest bestselling fiction book",
    price: 25,
    category: "Books",
    ageGroups: ["teen", "young-adult", "adult", "senior"],
    interests: ["reading", "literature"],
    recipientTypes: ["friend", "parent", "grandparent", "colleague"]
  },
  {
    id: "5",
    name: "Cookbook",
    description: "Gourmet cooking recipes and techniques",
    price: 35,
    category: "Books",
    ageGroups: ["young-adult", "adult", "senior"],
    interests: ["cooking", "food"],
    recipientTypes: ["partner", "parent", "friend"]
  },

  // Fashion & Accessories
  {
    id: "6",
    name: "Silk Scarf",
    description: "Elegant silk scarf with beautiful patterns",
    price: 80,
    category: "Fashion",
    ageGroups: ["young-adult", "adult", "senior"],
    interests: ["fashion", "style"],
    recipientTypes: ["partner", "mother", "grandmother", "colleague"]
  },
  {
    id: "7",
    name: "Leather Wallet",
    description: "Premium leather wallet with RFID protection",
    price: 60,
    category: "Fashion",
    ageGroups: ["young-adult", "adult"],
    interests: ["fashion", "practical"],
    recipientTypes: ["partner", "father", "friend", "colleague"]
  },

  // Home & Living
  {
    id: "8",
    name: "Scented Candles Set",
    description: "Luxury scented candles for home ambiance",
    price: 45,
    category: "Home",
    ageGroups: ["young-adult", "adult", "senior"],
    interests: ["home-decor", "relaxation"],
    recipientTypes: ["partner", "friend", "parent", "colleague"]
  },
  {
    id: "9",
    name: "Coffee Maker",
    description: "Single-serve coffee maker with multiple brew sizes",
    price: 120,
    category: "Home",
    ageGroups: ["young-adult", "adult", "senior"],
    interests: ["coffee", "practical"],
    recipientTypes: ["partner", "parent", "colleague", "friend"]
  },

  // Sports & Fitness
  {
    id: "10",
    name: "Yoga Mat",
    description: "Premium non-slip yoga mat with carrying strap",
    price: 50,
    category: "Fitness",
    ageGroups: ["teen", "young-adult", "adult"],
    interests: ["fitness", "yoga", "health"],
    recipientTypes: ["friend", "partner", "sibling"]
  },
  {
    id: "11",
    name: "Water Bottle",
    description: "Insulated stainless steel water bottle",
    price: 30,
    category: "Fitness",
    ageGroups: ["teen", "young-adult", "adult"],
    interests: ["fitness", "health", "environment"],
    recipientTypes: ["friend", "colleague", "sibling"]
  },

  // Arts & Crafts
  {
    id: "12",
    name: "Art Supply Set",
    description: "Complete drawing and painting supply kit",
    price: 70,
    category: "Arts",
    ageGroups: ["child", "teen", "young-adult", "adult"],
    interests: ["art", "creativity"],
    recipientTypes: ["child", "sibling", "friend", "partner"]
  },
  {
    id: "13",
    name: "Puzzle Set",
    description: "1000-piece jigsaw puzzle with beautiful artwork",
    price: 20,
    category: "Games",
    ageGroups: ["teen", "young-adult", "adult", "senior"],
    interests: ["puzzles", "relaxation"],
    recipientTypes: ["parent", "grandparent", "friend"]
  },

  // Food & Treats
  {
    id: "14",
    name: "Gourmet Chocolate Box",
    description: "Assorted premium chocolates in elegant packaging",
    price: 40,
    category: "Food",
    ageGroups: ["teen", "young-adult", "adult", "senior"],
    interests: ["food", "sweets"],
    recipientTypes: ["partner", "friend", "parent", "colleague"]
  },
  {
    id: "15",
    name: "Tea Sampler Set",
    description: "Collection of premium teas from around the world",
    price: 35,
    category: "Food",
    ageGroups: ["young-adult", "adult", "senior"],
    interests: ["tea", "relaxation", "health"],
    recipientTypes: ["parent", "grandparent", "colleague", "friend"]
  },

  // Kids & Toys
  {
    id: "16",
    name: "Building Blocks Set",
    description: "Creative building blocks for imaginative play",
    price: 60,
    category: "Toys",
    ageGroups: ["child"],
    interests: ["building", "creativity"],
    recipientTypes: ["child", "nephew", "niece"]
  },
  {
    id: "17",
    name: "Board Game",
    description: "Family-friendly strategy board game",
    price: 45,
    category: "Games",
    ageGroups: ["child", "teen", "young-adult", "adult"],
    interests: ["games", "strategy"],
    recipientTypes: ["family", "friend", "child"]
  },

  // Beauty & Self-Care
  {
    id: "18",
    name: "Skincare Set",
    description: "Complete skincare routine with natural ingredients",
    price: 85,
    category: "Beauty",
    ageGroups: ["teen", "young-adult", "adult"],
    interests: ["beauty", "self-care", "health"],
    recipientTypes: ["partner", "friend", "sibling"]
  },
  {
    id: "19",
    name: "Essential Oils Diffuser",
    description: "Ultrasonic aromatherapy diffuser with starter oils",
    price: 55,
    category: "Wellness",
    ageGroups: ["young-adult", "adult", "senior"],
    interests: ["wellness", "relaxation", "aromatherapy"],
    recipientTypes: ["partner", "parent", "friend"]
  },

  // Experience & Gift Cards
  {
    id: "20",
    name: "Streaming Service Gift Card",
    description: "3-month subscription to popular streaming service",
    price: 45,
    category: "Entertainment",
    ageGroups: ["teen", "young-adult", "adult"],
    interests: ["movies", "entertainment"],
    recipientTypes: ["friend", "sibling", "colleague"]
  }
];

export const interestOptions = [
  "technology", "music", "fitness", "health", "reading", "literature", 
  "cooking", "food", "fashion", "style", "practical", "home-decor", 
  "relaxation", "coffee", "yoga", "environment", "art", "creativity", 
  "puzzles", "games", "strategy", "sweets", "tea", "building", 
  "beauty", "self-care", "wellness", "aromatherapy", "movies", "entertainment"
];

export const recipientTypeOptions = [
  "partner", "friend", "parent", "sibling", "colleague", "child", 
  "grandparent", "mother", "father", "nephew", "niece", "family"
];

export const ageGroupOptions = [
  { value: "child", label: "Child (0-12)" },
  { value: "teen", label: "Teen (13-17)" },
  { value: "young-adult", label: "Young Adult (18-30)" },
  { value: "adult", label: "Adult (31-60)" },
  { value: "senior", label: "Senior (60+)" }
];
