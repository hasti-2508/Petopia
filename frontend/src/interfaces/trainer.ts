export interface TrainerData {
    name: string;
    email: string;
    password: string;
    phoneNo: string;
    address: string;
    city: string;
    state: string;
    YearsOfExperience: number;
    NumberOfPetsTrained: number
    trainings: string[];
  } 
  export interface Trainer {
    _id: string;
    name: string;
    email: string;
    password: string;
    phoneNo: string;
    address: string;
    city: string;
    state: string;
    YearsOfExperience: number;
    NumberOfPetsTrained: number
    trainings: string[];
    bookings: string[];
    imageUrl: string;
    OnGoingTraining: string[];
  }
  