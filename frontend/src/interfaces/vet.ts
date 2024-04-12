export interface VetData {
    name: string;
    email: string;
    password: string;
    phoneNo: string;
    address: string;
    city: string;
    state: string;
    YearsOfExperience: number;
    services: string[];
  }
  
  export interface Vet {
    _id: string
    name: string;
    email: string;
    password: string;
    phoneNo: string;
    address: string;
    city: string;
    state: string;
    YearsOfExperience: number;
    imageUrl: string;
    bookings: string[];
    isHavingCall: boolean;
    services  : string[];
  }