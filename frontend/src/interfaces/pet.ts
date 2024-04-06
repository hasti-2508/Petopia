export interface Pet {
    _id: string;
    pet_name: string;
    species: string;
    breed: string;
    age: number;
    gender: string;
    color: string;
    weight: number;
    health_conditions: string;
    allergies: string;
    additional_notes: string;
    imageUrl: string;
    isAdopted: boolean;
    owner: any[];
  }
  

  export interface PetDto{
    pet_name: string;
    species: string;
    breed: string;
    age: number;
    gender: string;
    color: string;
    weight: number;
    health_conditions: string;
    allergies: string;
    additional_notes: string;
    imageUrl: string;
    isAdopted: boolean;
  }
 export interface PetCardProps {
    pet: Pet;
  }