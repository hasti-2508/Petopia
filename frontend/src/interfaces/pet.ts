export interface Pet {
    _id: string;
    pet_name: string;
    species: string;
    breed: string;
    age: string;
    gender: string;
    color: string;
    weight: string;
    health_conditions: string;
    allergies: string;
    additional_notes: string;
    imageUrl: string;
    isAdopted: boolean;
    owner: string[];
  }
  

  export interface PetDto{
    pet_name: string;
    species: string;
    breed: string;
    age: string;
    gender: string;
    color: string;
    weight: string;
    health_conditions: string;
    allergies: string;
    additional_notes: string;
    imageUrl: string;
    isAdopted: boolean;
  }
 export interface PetCardProps {
    pet: Pet;
  }