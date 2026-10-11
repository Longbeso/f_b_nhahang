// import type { dishVariantDTO } from "./DishVariant.dto";

import type { IDishVariant } from "./DishVariant.dto";

// export type dishDTO = {
//   id: number;
//   imageUrl: string;
//   name: string;
//   description: string;
//   dishVariants: dishVariantDTO[];
// };

export interface IDish {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  dishVariants: IDishVariant[];
}
