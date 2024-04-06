export interface TrainingPlan {
    _id: string;
    TrainingName: string;
    species: string;
    Training: string[];
    requirements: string[];
    price: number;
    average_rating: number;
    imageUrl?: string;
  }
  