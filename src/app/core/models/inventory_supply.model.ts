import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Inventory, StockPurchasePost } from './stock-purchase.model';
import { ProductGetPaged } from './product.model';
import { Image } from './image.model';

export interface InventorySupplyGetOne {
  id: number;
  inventoryId: number;
  PO: null;
  note: string;
  refNumber: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  cancelledAt: null;
  deletedAt: null;
  receivedAt: null;
  supplierId: number;
  inventory: Inventory;
  productsSupply: ProductSupply[];
}

interface ProductSupply {
  id: number;
  product: ProductGetPaged;
  actualAmount: number;
  Image?: Image;
  productId: number;
  inventorySupplyId: number;
  variantName: string;
  imageUrl: string;
  imageId: string;
  variantSKU: string;
  amount: number;
  confirmed: number;
  rejected: number;
  variantId: number;
  variant: {
    id: number;
    value: string;
    productId: number;
    imageId: null;
    SKU: string;
  };
}

export interface StockGroupFormControls {
  '0': FormGroup<{
    supplierId: FormControl<any>;
    id: FormControl<any>;
    inventoryId: FormControl<any>;
  }>;
  '1': FormArray<
    FormGroup<{
      productId: FormControl<any>;
      variantId: FormControl<any>;
      amount: FormControl<any>;
      imageUrl: FormControl<any>;
      imageId: FormControl<any>;
      SKU: FormControl<any>;
      name: FormControl<any>;
      variantName: FormControl<any>;
    }>
  >;
  '2': FormGroup<{
    refNumber: FormControl<any>;
    notes: FormControl<any>;
  }>;
}

export interface StockGroupFormInterface {
  '0': {
    supplierId: number;
    id?: number;
    inventoryId: number;
  };
  '1': {
    id?: number;
    productId: number;
    variantId: number;
    amount: number;
    imageUrl: string;
    imageId?: number;
    SKU: string;
    name?: string;
    variantName?: string;
  }[];
  '2': {
    refNumber?: string;
    notes?: string;
  };
}

export function StockFormInterfaceToStockPurchasePost(
  form: StockGroupFormInterface
): StockPurchasePost {
  return {
    id: form['0'].id ? form['0'].id.toString() : undefined,
    inventoryId: form['0'].inventoryId,
    supplierId: form['0'].supplierId,
    note: form['2'].notes,
    refNumber: form['2'].refNumber,
    productsSupply: form['1'].map((product) => ({
      id: product.id,
      productId: product.productId,
      variantName: product.variantName ?? '',
      variantSKU: product.SKU,
      amount: product.amount,
      imageUrl: product.imageUrl,
      imageId: product.imageId!,
      variantId: product.variantId,
    })),
  };
}

export function InventorySupplyToStockFormInterface(
  inventorySupply: InventorySupplyGetOne
): StockGroupFormInterface {
  const productsArray = inventorySupply.productsSupply.map((product) => ({
    id: product.id,
    productId: product.productId,
    variantId: product.variantId,
    amount: product.amount,
    imageUrl: product.imageUrl,
    imageId: parseInt(product.imageId),
    SKU: product.variantSKU,
    name: product.product.name,
    variantName: product.variantName,
  }));

  return {
    '0': {
      supplierId: inventorySupply.supplierId,
      id: inventorySupply.id,
      inventoryId: inventorySupply.inventoryId,
    },
    '1': productsArray,
    '2': {
      refNumber: inventorySupply.refNumber,
      notes: inventorySupply.note,
    },
  };
}
