const products = [
  {
    id: 1,
    name: "The Alchemist",
    category: "Books",
    price: 399,
    image: "https://m.media-amazon.com/images/I/617lxveUjYL._SL1500_.jpg",
    topDeal: false,
    rating: "5",
    description:
      "A philosophical journey of a young shepherd. Embark on a quest of destiny and dreams. Paulo Coelho's timeless story inspires. A must-read for all ages and dreamers.",
  },
  {
    id: 2,
    name: "The Hitchhiker's Guide To The Galaxy",
    category: "Books",
    price: 399,
    image: "https://m.media-amazon.com/images/I/71Mt00Ge1XL._SY466_.jpg",
    topDeal: false,
    rating: "5",
    description:
      "A hilarious sci-fi adventure awaits. Travel across galaxies with absurd fun. Douglas Adams' wit is unmatched here. A cult classic with cosmic charm.",
  },
  {
    id: 3,
    name: "A Brief History Of Time",
    category: "Books",
    price: 499,
    image: "https://m.media-amazon.com/images/I/81DBK93b6jL._SL1500_.jpg",
    topDeal: false,
    rating: "5",
    description:
      "Explore space, time, and black holes. Stephen Hawking simplifies the universe. Science meets imagination and wonder. A brilliant mind's gift to the curious.",
  },
  {
    id: 4,
    name: "Quantum Theory",
    category: "Books",
    price: 999,
    image: "https://m.media-amazon.com/images/I/61yyRK2t2aL._SL1000_.jpg",
    topDeal: true,
    rating: "5",
    description:
      "Dive deep into particle physics basics. Quantum mechanics demystified for all. Ideal for curious scientific minds. A modern take on classic physics.",
  },
  {
    id: 5,
    name: "Apple iPhone 16 Pro",
    category: "Electronics",
    price: 129999,
    image: "https://m.media-amazon.com/images/I/61JvFLHZ6NL._SL1500_.jpg",
    topDeal: true,
    rating: "4",
    description:
      "Apple's latest innovation in your palm. Blazing-fast performance and camera. A sleek design with all-day battery. Experience premium tech effortlessly.",
  },
  {
    id: 6,
    name: "Apple Watch Series 10",
    category: "Electronics",
    price: 59999,
    image: "https://m.media-amazon.com/images/I/81kq5wkaqAL._SX679_.jpg",
    topDeal: false,
    rating: "3",
    description:
      "Track health and fitness with ease. Stay connected on the go. Modern design meets powerful features. Your smart companion, always on.",
  },
  {
    id: 7,
    name: "Apple 2023 MacBook Pro",
    category: "Electronics",
    price: 369999,
    image: "https://m.media-amazon.com/images/I/61RcOfisl7L._SX679_.jpg",
    topDeal: true,
    rating: "1",
    description:
      "Unmatched speed with M-series chip. Designed for pros and creatives. Sleek, durable, and reliable build. A premium laptop experience.",
  },
  {
    id: 8,
    name: "Sony Playstation 5",
    category: "Electronics",
    price: 54990,
    image: "https://m.media-amazon.com/images/I/51Ex3GcYMIL._SL1000_.jpg",
    topDeal: false,
    rating: "2",
    description:
      "Next-gen gaming with stunning graphics. Ultra-fast load times and fluid play. A gamer’s dream console is here. Experience immersive worlds today.",
  },
  {
    id: 9,
    name: "Men's Denim Jacket",
    category: "Clothing",
    price: 1999,
    image: "https://m.media-amazon.com/images/I/41ke4gQb8LL._SY741_.jpg",
    topDeal: true,
    rating: "0",
    description:
      "Classic style with rugged texture. Perfect for casual street looks. Comfortable fit and durable build. Upgrade your winter wardrobe now.",
  },
  {
    id: 10,
    name: "Women's Floral Dress",
    category: "Clothing",
    price: 1499,
    image: "https://m.media-amazon.com/images/I/81kbbwTA1AL._SY606_.jpg",
    topDeal: false,
    rating: "2",
    description:
      "Elegant florals for every occasion. Lightweight, breezy and stylish. Great for brunches or beach walks. Feel fresh and fashionable always.",
  },
  {
    id: 11,
    name: "Hooded Sweatshirt",
    category: "Clothing",
    price: 1099,
    image: "https://m.media-amazon.com/images/I/51aQzPbLwpL._SX466_.jpg",
    topDeal: false,
    rating: "3",
    description:
      "Soft, cozy and perfect for winter. Comes with a stylish hoodie cap. Versatile for casual or gym wear. A must-have layering essential.",
  },
  {
    id: 12,
    name: "Men's Formal Shirt",
    category: "Clothing",
    price: 899,
    image: "https://m.media-amazon.com/images/I/51Ze6s3CdGL._SY606_.jpg",
    topDeal: false,
    rating: "3",
    description:
      "Smart choice for office and events. Crisp design and clean cuts. Comfortable and breathable material. Refined fashion for professionals.",
  },
  {
    id: 13,
    name: "Modern Wooden Coffee Table",
    category: "Furniture",
    price: 3499,
    image:
      "https://m.media-amazon.com/images/I/41URSuk2uML._SX300_SY300_QL70_FMwebp_.jpg",
    topDeal: true,
    rating: "2",
    description:
      "Elegant addition to your living room. Modern finish with sturdy design. Perfect for books, décor and cups. A centerpiece with natural charm.",
  },
  {
    id: 14,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 5299,
    image: "https://m.media-amazon.com/images/I/818hqgJuNoL._SL1500_.jpg",
    topDeal: true,
    rating: "5",
    description:
      "Designed for long working hours. Adjustable comfort and lumbar support. Breathable mesh and soft cushions. A must for your work-from-home setup.",
  },
  {
    id: 15,
    name: "Queen Size Bed with Storage",
    category: "Furniture",
    price: 15999,
    image: "https://m.media-amazon.com/images/I/61GjxTtKs3L._SL1000_.jpg",
    topDeal: false,
    rating: "1",
    description:
      "Spacious comfort with hidden storage. Ideal for compact urban bedrooms. Sturdy frame and elegant look. Sleep well and stay organized.",
  },
  {
    id: 16,
    name: "Wooden Bookshelf Rack",
    category: "Furniture",
    price: 2999,
    image: "https://m.media-amazon.com/images/I/51w+DLPfj4L._SY300_SX300_.jpg",
    topDeal: false,
    rating: "3",
    description:
      "Showcase your favorite reads in style. Compact and fits any corner easily. Smooth wood finish, blends with décor. Your personal mini library setup.",
  },
];

export default products;
