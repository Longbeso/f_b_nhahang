// menu.interface.ts
interface IDishVariant {
  id: number;
  name: string;
  price: number;
  isDefault: boolean;
}

interface IDish {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  dishVariants: IDishVariant[];
}

export interface IMenuCategory {
  id: number;
  name: string;
  dishes: IDish[];
}
