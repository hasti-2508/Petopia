export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    phoneNo: number;
    address: string;
    area: string;
    city: string;
    state: string;
    role: string;
    isActive: boolean;
    imageHistory: string[];
    pets: string[]; // Assuming pets are referenced by their IDs
    createdAt: string;
    updatedAt: string;
    __v: number;
    resetToken: string;
    resetTokenExpiration: string;
    petHistory: string[]; // Assuming pet history IDs
  }
  
  export interface UserCardProps {
    owner: User;
  }