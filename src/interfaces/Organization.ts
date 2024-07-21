import { Address } from "./Address";

export interface Organization {
  id?: string;
  responsible: string;
  email: string;
  address: Address;
  whatsapp: string;
  user_id: string;
}
