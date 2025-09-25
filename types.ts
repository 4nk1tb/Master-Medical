
export enum Category {
  Inyectables = "Inyectables",
  Orales = "Orales",
  BienestarSexual = "Bienestar Sexual",
  Salud = "Salud",
  QuemaGrasa = "Quema Grasa",
}

export enum Form {
  Inyectable = "Inyectable",
  Oral = "Oral",
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  category: Category;
  form: Form;
  lab: string;
  price: number;
  presentation: string;
  image: string;
  ingredients: string[];
  usage: string;
  warnings: string;
}
