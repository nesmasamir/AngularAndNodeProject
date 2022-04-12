export interface User {
    id?: number;
    name?: string;
    email?: string;
    address?: Address;
    phone?: string;
  }
  export interface Address {
    street?: string;
    city?: string;
    zipcode?: string;
  }

  