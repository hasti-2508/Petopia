import { Pet } from "./pet";

export interface User {
    name: string;
    email: string;
    password: string;
    phoneNo: string;
    address: string;
    city: string;
    state: string;
    imageUrl: string;
    pets: Pet[];
  }
  
  export interface UserCardProps {
    owner: User;
  }