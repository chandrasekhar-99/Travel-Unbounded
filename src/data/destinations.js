export const destinations = [
  // India
  {
    id: 1,
    name: "Kerala",
    country: "India",
    category: "india",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    description:
      "Explore serene backwaters, lush landscapes, beautiful beaches, and the rich culture of God's Own Country.",
    price: "₹24,999",
  },
  {
    id: 2,
    name: "Himachal Pradesh",
    country: "India",
    category: "india",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    description:
      "Discover snow-capped mountains, peaceful valleys, charming villages, and unforgettable Himalayan adventures.",
    price: "₹19,999",
  },
  {
    id: 3,
    name: "Ladakh",
    country: "India",
    category: "india",
    image:
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=80",
    description:
      "Experience dramatic mountain landscapes, high-altitude lakes, monasteries, and unforgettable road journeys.",
    price: "₹29,999",
  },
  {
    id: 4,
    name: "Andaman",
    country: "India",
    category: "india",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    description:
      "Relax on pristine beaches, explore coral reefs, and enjoy tropical island adventures in crystal-clear waters.",
    price: "₹27,999",
  },
  {
    id: 5,
    name: "Goa",
    country: "India",
    category: "india",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    description:
      "Enjoy golden beaches, vibrant nightlife, Portuguese heritage, local cuisine, and laid-back coastal experiences.",
    price: "₹14,999",
  },

  // International
  {
    id: 6,
    name: "Kenya",
    country: "Kenya",
    category: "international",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    description:
      "Go on unforgettable safari adventures and witness incredible wildlife across Kenya's spectacular landscapes.",
    price: "₹89,999",
  },
  {
    id: 7,
    name: "Vietnam",
    country: "Vietnam",
    category: "international",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    description:
      "Explore ancient cities, stunning coastlines, vibrant street food, and the spectacular landscapes of Vietnam.",
    price: "₹59,999",
  },
  {
    id: 8,
    name: "Tanzania",
    country: "Tanzania",
    category: "international",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
    description:
      "Experience extraordinary wildlife, vast savannahs, and breathtaking natural wonders across Tanzania.",
    price: "₹94,999",
  },
  {
    id: 9,
    name: "Iceland",
    country: "Iceland",
    category: "international",
    image:
      "https://images.unsplash.com/photo-1520769945061-0a448c463865?auto=format&fit=crop&w=1200&q=80",
    description:
      "Discover glaciers, waterfalls, volcanic landscapes, black-sand beaches, and the magic of Iceland.",
    price: "₹1,19,999",
  },
  {
    id: 10,
    name: "Sri Lanka",
    country: "Sri Lanka",
    category: "international",
    image:
      "https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      
    description:
      "Explore tropical beaches, ancient heritage, tea plantations, wildlife, and warm island hospitality.",
    price: "₹39,999",
  },
];

export const indiaDestinations = destinations.filter(
  (destination) => destination.category === "india"
);

export const internationalDestinations = destinations.filter(
  (destination) => destination.category === "international"
);