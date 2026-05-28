import type { dishVariantDTO } from "./dishVariant.dto";

export type dishDTO = {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  dishVariant: dishVariantDTO[];
};
