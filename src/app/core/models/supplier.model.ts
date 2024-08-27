import { FormControl, FormGroup } from '@angular/forms';
import { User } from './user.model';

export interface CreateSupplier {
  id?: number;
  name: string;
  company: string;
  company_address: string;
  phone: string;
  account: CreateSupplierAccount;
}

export interface CreateSupplierAccount {
  id?: number;
  account_number: string;
  account_name: string;
  bankId: number;
  bank_currencyId: number;
  supplier_id: number;
  bank_locationId: number;
}

export interface SupplierGetOne {
  id: number;
  name: string;
  company: string;
  phone: string;
  company_address: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  Account: SupplierAccountGetOne[];
}


export interface SupplierAccountGetOne {
  id: number;
  account_number: string;
  account_name: string;
  bankId: number;
  bank_currencyId: number;
  bank_locationId: number;
  supplierId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface SupplierGetPaged {
  id: number;
  name: string;
  company: string;
  company_address: string;
  phone: string;
}
export interface SupplierFormControls {
  '0': FormGroup<{
    id: FormControl<any>;
    name: FormControl<any>;
    company: FormControl<any>;
    company_address: FormControl<any>;
    phone: FormControl<any>;
  }>;
  '1': FormGroup<{
    id: FormControl<any>;
    account_number: FormControl<any>;
    account_name: FormControl<any>;
    bankId: FormControl<any>;
    bank_currencyId: FormControl<any>;
    bank_locationId: FormControl<any>;
  }>;
}

export interface SupplierFormInterface {
  '0': {
    id?: number;
    name: string;
    company?: string;
    company_address?: string;
    phone: number;
  };
  '1': {
    id?: number;
    account_number: string;
    account_name: string;
    bankId: number;
    bank_currencyId: number;
    bank_locationId: number;
  };
}

export function SupplierFormToCreateSupplier(
  input: SupplierFormInterface
): CreateSupplier {
  return {
    id: input['0'].id,
    name: input['0'].name,
    company: input['0'].company || '', // Fallback to an empty string if company is not provided
    company_address: input['0'].company_address || '', // Fallback to an empty string if company_address is not provided
    phone: input['0'].phone.toString(), // Convert phone number to string
    account: {
      id: input['1'].id,
      account_number: input['1'].account_number,
      account_name: input['1'].account_name,
      bankId: input['1'].bankId,
      bank_currencyId: input['1'].bank_currencyId,
      supplier_id: input['0'].id ?? 0, // Use the supplier's id or default to 0
      bank_locationId: input['1'].bank_locationId,
    },
  };
}

export function SupplierGetOneToSupplierForm(
  supplier: SupplierGetOne
): SupplierFormInterface {
  console.log(supplier, " be4 mapping")
  return {
    '0': {
      id: supplier.id,
      name: supplier.name,
      company: supplier.company,
      company_address: supplier.company_address,
      phone: parseInt(supplier.phone ?? '0'),
    },
    '1': {
      id: supplier.Account[0]?.id, // Access the first account only
      account_number: supplier.Account[0]?.account_number || '',
      account_name: supplier.Account[0]?.account_name || '',
      bankId: supplier.Account[0]?.bankId || 0,
      bank_currencyId: supplier.Account[0]?.bank_currencyId || 0,
      bank_locationId: supplier.Account[0]?.bank_locationId || 0,
    },
  };
}
