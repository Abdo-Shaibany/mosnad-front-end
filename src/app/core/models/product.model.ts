import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Image } from './image.model';
import { BasicVarient, Varient } from './product_varient.model';
import { Category } from './category.model';
import { SupplierGetOne } from './supplier.model';

export interface ProductGetPaged {
  id: number;
  category: Category;
  name: string;
  length: number;
  width: number;
  height: number;
  brand: string;
  SKU: string;
  status: number; // TODO: enum
  Variant: Varient[];
  Image?: Image;
  image?: Image;
  createdAt: Date;
  updatedAt: Date;
  expiredAt?: Date;
  deletedAt?: Date;
  supplierId: number;
  VariantBasic: BasicVarient[];
  supply: number;
  ProductForSale: {
    status: 'pending' | 'active';
  };
}

export interface ProductGetOne {
  id: number;
  categoryId: number;
  name: string;
  length: number;
  width: number;
  height: number;
  brand: string;
  SKU: string;
  status: number;
  createdAt: Date; // ISO 8601 format
  updatedAt: Date; // ISO 8601 format
  expiredAt: Date | null; // ISO 8601 format or null
  deletedAt: Date | null; // ISO 8601 format or null
  supplierId: number;
  imageId: number;
  image: Image;
  category: Category;
  Variant: Varient[];
  VariantBasic: BasicVarient[];
  ProductSupply: {
    id: number;
    inventorySupplyId: number;
    variantName: string;
    variantSKU: string;
    amount: number;
    actualAmount: number;
    imageId: number;
  }[];

  ProductForSale: {
    id: number;
    status: 'active' | 'pending';
    description: string;
    supplierId: number;
  }[];

  supplier: SupplierGetOne;
}

export interface CreateProduct {
  id: number;
  name: string;
  categoryId: number;
  length: number;
  width: number;
  height: number;
  brand: string;
  expiredAt?: Date;
  variantsBasic?: BasicVarient[];
  variants?: Varient[];
  supplierId: number;
  imageId: number;
}

export interface ProductGroupFormControls {
  '0': FormGroup<{
    id: FormControl<any>;
    name: FormControl<any>;
    cagetoryId: FormControl<any>;
    length: FormControl<any>;
    width: FormControl<any>;
    height: FormControl<any>;
    brand: FormControl<any>;
    expiredAt: FormControl<any>;
    supplierId: FormControl<any>;
  }>;
  '1': FormArray<
    FormGroup<{
      type: FormControl<any>;
      values: FormArray<
        FormGroup<{
          id: FormControl<any>;
          value: FormControl<any>;
        }>
      >;
    }>
  >;
  '2': FormGroup<{
    img: FormControl<any>;
    variants: FormArray<
      FormGroup<{
        id: FormControl<any>;
        value: FormControl<any>;
        imageId: FormControl<any>;
      }>
    >;
  }>;
}

export interface ProductGroupFormInterface {
  '0': {
    id?: number;
    name: string;
    cagetoryId: number;
    length?: number;
    width?: number;
    height?: number;
    brand?: string;
    expiredAt?: string;
    supplierId: number;
  };
  '1': {
    type?: string;
    values?: {
      id?: number;
      value: string;
    }[];
  }[];
  '2': {
    img: string;
    variants?: {
      id?: number;
      value: string;
      imageId?: number;
    }[];
  };
}

export function ProductFormInterfaceToCreateProduct(
  form: ProductGroupFormInterface
): CreateProduct {
  const {
    '0': productInfo,
    '1': basicVariantsArray,
    '2': imageAndVariants,
  } = form;

  // Map basic variants
  const variantsBasic: BasicVarient[] = [];

  basicVariantsArray.forEach((variantGroup) => {
    variantGroup.values?.forEach((variant) => {
      variantsBasic.push({
        id: variant.id?.toString(),
        type: variantGroup.type ?? '',
        value: variant.value,
      });
    });
  });

  // Map variants
  const variants: Varient[] =
    imageAndVariants.variants?.map((variant) => ({
      id: variant.id?.toString(),
      value: variant.value,
      imageId: variant.imageId?.toString(),
    })) || [];

  return {
    id: productInfo.id!,
    name: productInfo.name,
    categoryId: productInfo.cagetoryId,
    length: productInfo.length!,
    width: productInfo.width!,
    height: productInfo.height!,
    brand: productInfo.brand!,
    expiredAt: parseDateString(productInfo.expiredAt),
    variantsBasic,
    variants,
    supplierId: productInfo.supplierId,
    imageId: parseInt(imageAndVariants.img),
  };
}

export function ProductToProductFormInterface(
  product: ProductGetOne
): ProductGroupFormInterface {
  // Step 1: Map the basic product information
  const productInfo = {
    id: product.id,
    name: product.name,
    cagetoryId: product.categoryId,
    length: product.length,
    width: product.width,
    height: product.height,
    brand: product.brand,
    expiredAt: formatDateToString(product.expiredAt ?? undefined),
    supplierId: product.supplierId,
  };

  // Step 2: Map the basic variants, grouping them by type
  const basicVariantsMap: { [key: string]: { id?: number; value: string }[] } =
    {};

  product.VariantBasic.forEach((variant) => {
    if (!basicVariantsMap[variant.type]) {
      basicVariantsMap[variant.type] = [];
    }
    basicVariantsMap[variant.type].push({
      id: variant.id ? parseInt(variant.id) : undefined,
      value: variant.value,
    });
  });

  const basicVariantsArray = Object.keys(basicVariantsMap).map((type) => ({
    type,
    values: basicVariantsMap[type],
  }));

  // Step 3: Map the image and variants
  const imageAndVariants = {
    img: product.image.id.toString(), // Assuming that the main image is stored in the image object
    variants: product.Variant.map((variant) => ({
      id: variant.id ? parseInt(variant.id) : undefined,
      value: variant.value,
      imageId: variant.imageId ? parseInt(variant.imageId) : undefined,
    })),
  };

  // Return the mapped ProductGroupFormInterface
  return {
    '0': productInfo,
    '1': basicVariantsArray,
    '2': imageAndVariants,
  };
}

function parseDateString(dateString?: string): Date | undefined {
  if (!dateString) return undefined;

  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
}

function formatDateToString(date?: Date): string | undefined {
  if (!date) return undefined;
  date = new Date(date);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
