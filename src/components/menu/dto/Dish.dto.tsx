import type { dishVariantDTO } from "./DishVariant.dto";

export type dishDTO = {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  dishVariants: dishVariantDTO[];
};
