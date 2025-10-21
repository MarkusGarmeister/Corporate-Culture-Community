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
];
