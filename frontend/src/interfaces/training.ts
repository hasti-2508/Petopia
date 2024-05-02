
export interface Training {
    _id: string;
    userId: string;
    TrainingPlanID: string;
    pet_species: string;
    pet_breed: string;
    pet_size: string;
    pet_gender: string;
    pet_age: string;
    aggressiveness: string;
    user_name: string;
    email: string;
    phoneNo: string;
    address: string;
    city: string;
    state: string;
    booking_date: string;
    booking_time: string;
    totalPrice: number;
    isConfirmed: boolean;
    isCompleted: boolean;
    isCancelled: boolean;
    trainerId: {
      name: string,
      phoneNo: string
    };
    averageRating: number;
    ratings: Rating[];
  }


  export interface Rating {
    rating: number;
    userId: string;
    TrainingPlanID?: string; 
  }