import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { InventorySupplyGetOne } from './inventory_supply.model';

export interface UpdateInventorySupply {
  id: number;
  status: 'pending' | 'cancelled' | 'done';
  productsSupply: UpdateProductSupply[];
}
export interface UpdateProductSupply {
  id: number;
  actualAmount: number;
}

export interface UpdateStockGroupFormControls {
  id: FormControl<number | null>;
  status: FormControl<string | null>;
  productsSupply: FormArray<
    FormGroup<{
      id: FormControl<number | null>;
      actualAmount: FormControl<number>;
    }>
  >;
}

export function InventorySupplyGetOneToUpdateInventorySupply(
  input: InventorySupplyGetOne,
): UpdateInventorySupply {
  return {
    id: input.id,
    status: input.status as 'pending' | 'cancelled' | 'done',
    productsSupply: input.productsSupply.map(product => ({
      id: product.id,
      actualAmount: product.actualAmount,
    })),
  };
}
