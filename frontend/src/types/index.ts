import {components} from "./api"

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


export type Location = components["schemas"]["Location"]
export type Rating = components["schemas"]["Rating"]