export interface User {
    name: string;
    email: string;
    password: string;
    phoneNo: string;
    address: string;
    city: string;
    state: string;
  }
  
  export interface UserCardProps {
    owner: User;
  }