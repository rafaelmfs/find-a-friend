export interface Pet {
  name: string;
  description: string;
  age: number;
  stature: number;
  energyLevel: number;
  independencieLevel: number;
  environmentLevel: number;
  adoptionRequirements: string[];
  city: string;
  organization_id: string;
  pictures?: string[];
  id: string;
}
