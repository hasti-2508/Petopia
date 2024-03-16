 export interface ServicePlan {
    _id: string;
    serviceName: string;
    species: string;
    services: string[];
    price: number;
    average_rating: number;
    imageUrl?: string;
  }
  