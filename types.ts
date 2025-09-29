
export enum Category {
  Promo = "Promociones",
  Inyectables = "Inyectables",
  Orales = "Orales",
  HGHPeptides = "HGH & Péptidos",
  HealthWellness = "Salud y Bienestar",
  SexualWellness = "Bienestar Sexual y Estimulantes",
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
