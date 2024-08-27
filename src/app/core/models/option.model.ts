import { FormControl } from '@angular/forms';

export interface Option {
  id: string;
  text: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface CreateOption {
  id?: number;
  text: string;
}

export interface OptionFormControls {
  id: FormControl<number | null>;
  text: FormControl<string | null>;
}

export interface OptionForm {
  id: string | null;
  text: string | null;
}

export function mapOptionFormToCreateOption(form: OptionForm): CreateOption {
  return {
    id: form.id ? parseInt(form.id) : undefined, // Use `undefined` if `id` is `null`
    text: form.text ?? '',
  };
}

export function mapOptionToOptionForm(option: Option): OptionForm {
  return {
    id: option.id ? option.id : null, // Convert `id` to number or set to `null` if undefined
    text: option.text || null,
  };
}
