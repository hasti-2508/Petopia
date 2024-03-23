export interface TrainerData {
    name: string;
    email: string;
    password: string;
    phoneNo: string;
    address: string;
    city: string;
    state: string;
    YearsOfExperience: number;
    NumberOfPetTrained: number
    services: string[];
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
    NumberOfPetTrained: number
    trainings: string[];
    imageUrl: string;
    OnGoingTraining: string[];
  }
  