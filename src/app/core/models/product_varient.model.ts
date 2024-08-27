import { Image } from './image.model';

export interface BasicVarientForm {
  type: string;
  values: {
    value: string;
    id?: string;
  }[];
}

export interface BasicVarient {
  id?: string;
  type: string;
  value: string;
}

export interface Varient {
  id?: string;
  imageId?: string;
  value: string;
  image?: Image;
  SKU?: string;
}

export function convertBasicVarientToFormSchema(
  inputs: BasicVarient[]
): BasicVarientForm[] {
  const formSchemas: BasicVarientForm[] = [];

  // Grouping BasicVarients by type
  const groupedByType = inputs.reduce((acc, curr) => {
    if (!acc[curr.type]) {
      acc[curr.type] = [];
    }
    acc[curr.type].push(curr);
    return acc;
  }, {} as { [key: string]: BasicVarient[] });

  // Creating BasicVarientForm objects
  Object.keys(groupedByType).forEach((type) => {
    const formSchema: BasicVarientForm = {
      type,
      values: groupedByType[type].map((variant) => ({
        value: variant.value,
        id: variant.id,
      })),
    };
    formSchemas.push(formSchema);
  });

  return formSchemas;
}

export function convertToVarientsArray(
  basicVarientArray: BasicVarientForm[]
): Varient[] {
  const varientsArray: Varient[] = [];

  const valueArrays: { [key: string]: string[] } = {};

  for (const item of basicVarientArray) {
    if (!valueArrays[item.type]) {
      valueArrays[item.type] = [];
    }

    valueArrays[item.type].push(...item.values.map((v) => v.value));
  }

  const keys = Object.keys(valueArrays);
  const combinations = generateCombinations(keys, valueArrays);

  for (const combination of combinations) {
    const value = combination.join(' ');
    varientsArray.push({
      value,
    });
  }

  return varientsArray;
}

function generateCombinations(
  keys: string[],
  valueArrays: { [key: string]: string[] }
): string[][] {
  if (keys.length === 1) {
    return valueArrays[keys[0]].map((value) => [value]);
  }

  const combinations: string[][] = [];

  for (const value of valueArrays[keys[0]]) {
    const subCombinations = generateCombinations(keys.slice(1), valueArrays);
    for (const subCombination of subCombinations) {
      combinations.push([value, ...subCombination]);
    }
  }

  return combinations;
}
