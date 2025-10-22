export interface Venue {
  id: number;
  name: string;
  image: string;
  address: string;
  city: string;
  rating: number;
  description: string;
  priceRange: string;
  capacity: number;
}

export const mockVenues: Venue[] = [
  {
    id: 1,
    name: "Modern Conference Center",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600",
    address: "123 Business Street",
    city: "Berlin",
    rating: 4.5,
    description:
      "Spacious conference center with modern amenities, perfect for corporate events and team meetings.",
    priceRange: "€150-300/day",
    capacity: 100,
  },
  {
    id: 2,
    name: "Creative Co-Working Hub",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600",
    address: "456 Startup Lane",
    city: "Munich",
    rating: 4.8,
    description:
      "Vibrant co-working space with flexible seating, high-speed internet, and collaborative atmosphere.",
    priceRange: "€50-120/day",
    capacity: 50,
  },
  {
    id: 3,
    name: "Executive Boardroom",
    image: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=600",
    address: "789 Corporate Plaza",
    city: "Frankfurt",
    rating: 4.3,
    description:
      "Professional boardroom with premium furniture, video conferencing, and catering services.",
    priceRange: "€200-400/day",
    capacity: 20,
  },
  {
    id: 4,
    name: "Innovation Lab",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600",
    address: "321 Tech Avenue",
    city: "Hamburg",
    rating: 4.7,
    description:
      "State-of-the-art innovation space with whiteboards, prototyping tools, and brainstorming areas.",
    priceRange: "€100-200/day",
    capacity: 30,
  },
  {
    id: 5,
    name: "Garden Event Space",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
    address: "555 Park View",
    city: "Cologne",
    rating: 4.9,
    description:
      "Beautiful outdoor venue with garden setting, ideal for team building and summer events.",
    priceRange: "€180-350/day",
    capacity: 80,
  },
  {
    id: 6,
    name: "Tech Startup Loft",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600",
    address: "888 Innovation Drive",
    city: "Berlin",
    rating: 4.6,
    description:
      "Industrial-style loft space with exposed brick, perfect for tech meetups and hackathons.",
    priceRange: "€80-150/day",
    capacity: 60,
  },
  {
    id: 7,
    name: "Luxury Hotel Conference Suite",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600",
    address: "999 Grand Boulevard",
    city: "Munich",
    rating: 4.4,
    description:
      "Premium hotel conference suite with full catering, AV equipment, and concierge services.",
    priceRange: "€300-500/day",
    capacity: 150,
  },
  {
    id: 8,
    name: "Minimalist Meeting Room",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600",
    address: "222 Zen Street",
    city: "Stuttgart",
    rating: 4.2,
    description:
      "Clean, minimalist space designed for focus and productivity with natural lighting.",
    priceRange: "€60-100/day",
    capacity: 15,
  },
  {
    id: 9,
    name: "Rooftop Terrace Venue",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600",
    address: "777 Sky Tower",
    city: "Frankfurt",
    rating: 4.8,
    description:
      "Stunning rooftop venue with panoramic city views, perfect for networking events and celebrations.",
    priceRange: "€250-450/day",
    capacity: 120,
  },
  {
    id: 10,
    name: "Historic Villa Meeting Space",
    image: "https://images.unsplash.com/photo-1519167758481-83f29da8c310?w=600",
    address: "444 Heritage Lane",
    city: "Dresden",
    rating: 4.5,
    description:
      "Elegant meeting space in a restored historic villa, combining charm with modern facilities.",
    priceRange: "€180-320/day",
    capacity: 40,
  },
  {
    id: 11,
    name: "Sports & Activity Center",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600",
    address: "666 Athletic Way",
    city: "Dortmund",
    rating: 4.3,
    description:
      "Active venue with sports facilities, perfect for team building and wellness events.",
    priceRange: "€120-220/day",
    capacity: 70,
  },
  {
    id: 12,
    name: "Waterfront Conference Hall",
    image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=600",
    address: "111 Harbor View",
    city: "Hamburg",
    rating: 4.7,
    description:
      "Modern conference hall with beautiful waterfront views and maritime atmosphere.",
    priceRange: "€200-380/day",
    capacity: 200,
  },
  {
    id: 13,
    name: "Cozy Workshop Studio",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600",
    address: "333 Craft Street",
    city: "Leipzig",
    rating: 4.1,
    description:
      "Intimate workshop space with hands-on facilities, ideal for training sessions and small groups.",
    priceRange: "€40-80/day",
    capacity: 12,
  },
  {
    id: 14,
    name: "Ultra-Modern Tech Hub",
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=600",
    address: "1000 Digital Plaza",
    city: "Berlin",
    rating: 4.9,
    description:
      "Cutting-edge technology hub with smart rooms, VR equipment, and advanced presentation systems.",
    priceRange: "€280-500/day",
    capacity: 90,
  },
  {
    id: 15,
    name: "Countryside Retreat Center",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=600",
    address: "2000 Rural Road",
    city: "Munich",
    rating: 4.6,
    description:
      "Peaceful countryside venue away from the city, perfect for strategic planning and off-site retreats.",
    priceRange: "€160-280/day",
    capacity: 45,
  },
];
