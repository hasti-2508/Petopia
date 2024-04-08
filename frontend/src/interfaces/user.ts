import { Pet } from "./pet";
import { ObjectId } from 'mongodb';

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