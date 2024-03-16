export interface Pet {
    _id: string;
    pet_name: string;
    species: string;
    breed: string;
    age: number;
    gender: string;
    color: string;
    weight: number;
    health_status: string;
    allergies: string;
    additional_notes: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    imageHistory: string[];
    imageUrl: string;
    isAdopted: boolean;
    owner: any[];
  }
  
 export interface PetCardProps {
    pet: Pet;
  }