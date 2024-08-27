import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ProductGetPaged } from './product.model';
import { Image } from './image.model';

export interface ProductForSale {
  product: ProductGetPaged;
  images: Image[];
  id: number;
  productId: number;
  status: string;
  title: string | null;
  description: string | null;
  supplierId: number;
  VariantForSale: {
    id: number;
    value: string;
    cost: number | null;
    price: number | null;
    productForSaleId: number;
    imageId: number | null;
    SKU: string;
    cost_currencyId: number | null;
    price_currencyId: number | null;
    status: boolean;
    image: {
      id: number;
      url: string;
      thumbnail_url: string;
    };
  }[];
  selected: boolean;
}



export interface VariantForSale {
  id: number;
  value: string;
  cost: number | null;
  price: number | null;
  productForSaleId: number;
  imageId: number | null;
  SKU: string;
  cost_currencyId: number | null;
  price_currencyId: number | null;
  status: boolean;
  image?: Image | null;
}

export interface ProductForSalePut {
  id: number;
  status?: 'active' | 'pending';
  title: string;
  description: string;
  images: number[];
  variants?: {
    id: string;
    cost: string;
    costCurrency: string;
    priceCurrency: string;
    price: string;
  }[];
}

// TODO: see why FormControl<any> for any field with any type return error -_-
export interface ProductForSaleGroupFormControls {
  id: any;
  title: any;
  status: any;
  description: any;
  images: FormArray<
    FormGroup<{
      imageId: FormControl<any>;
      imageThumbnail: FormControl<any>;
      imageURL: FormControl<any>;
    }>
  >;
  variants: FormArray<
    FormGroup<{
      id: FormControl<any>;
      imageUrl: FormControl<any>;
      imageId: FormControl<any>;
      value: FormControl<any>;
      cost: FormControl<any>;
      costCurrency: FormControl<any>;
      price: FormControl<any>;
      priceCurrency: FormControl<any>;
      status: FormControl<any>;
    }>
  >;
  categoryId: any;
}

export interface ProductForSaleGroupFormInterface {
  id?: number;
  title: string;
  status: string;
  description?: string;
  images: {
    imageId: number;
    imageThumbnail: string;
    imageURL: string;
  }[];
  variants: {
    id: number;
    imageUrl?: string;
    imageId?: number;
    value: string;
    cost: number;
    costCurrency: number;
    price: number;
    priceCurrency: number;
    status: string;
  }[];
  categoryId: number;
}

export function mapProductForSaleFormToProductForSalePut(
  form: ProductForSaleGroupFormInterface
): ProductForSalePut {
  return {
    id: form.id!,
    status: form.status as 'active' | 'pending' | undefined,
    title: form.title,
    description: form.description || '',
    images: form.images.map((image) => image.imageId),
    variants: form.variants.map((variant) => ({
      id: variant.id.toString(),
      cost: variant.cost.toString(),
      costCurrency: variant.costCurrency.toString(),
      price: variant.price.toString(),
      priceCurrency: variant.priceCurrency.toString(),
      status: variant.status,
    })),
  };
}

export function mapProductForSaleToGroupForm(
  product: ProductForSale
): ProductForSaleGroupFormInterface {
  return {
    id: product.id,
    title: product.product.name || '', // Default to empty string if null
    status: product.status,
    description: product.description || '', // Default to empty string if null
    images: product.images.map((image: any) => ({
      imageId: image.id,
      imageThumbnail: image.thumbnail_url,
      imageURL: image.url,
    })),
    variants: product.VariantForSale.map((variant) => ({
      id: variant.id,
      imageUrl: variant.image?.thumbnail_url || '', // Default to empty string if image is null
      imageId: variant.imageId || 0, // Default to 0 if imageId is null
      value: variant.value,
      cost: variant.cost || 0, // Default to 0 if cost is null
      costCurrency: variant.cost_currencyId || 0, // Default to 0 if cost_currencyId is null
      price: variant.price || 0, // Default to 0 if price is null
      priceCurrency: variant.price_currencyId || 0, // Default to 0 if price_currencyId is null
      status: variant.status ? 'active' : 'inactive', // Convert boolean to string
    })),
    categoryId: product.product.category.id, // Map from nested product
  };
}
