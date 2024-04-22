import { Pet } from "./pet";

export interface UserData {
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
  export interface User {
    _id: string;
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
    owner: UserData;
  }