import { FormControl, FormGroup } from "@angular/forms";

export interface SellerCreate {
    name: string;
    address: string;
    phone: string;
    user: {
        email: string;
        username: string;
    }
}

export interface SellerGetOne {
    id?: string;
    name: string;
    address: string;
    status: boolean;
    phone: string;
}

export interface SellerUpdate {
    id: number;
    name: string;
    address: string;
    phone: string;
}

export interface SellerFormValues {
    '0': {
        name: string;
        address: string;
        phone: string;
    },
    "1": {
        email: string;
        username: string;
    }
}

export function mapSellerFormValuesToSellerCreate(formValues: SellerFormValues): SellerCreate {
    return {
        name: formValues['0'].name,
        address: formValues['0'].address,
        phone: formValues['0'].phone,
        user: {
            email: formValues['1'].email,
            username: formValues['1'].username,
        },
    };
}