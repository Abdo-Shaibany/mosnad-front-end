import { Option } from './option.model';

export interface Filter {
  field: Option;
  condition: Option;
  value: string;
}

export interface RequestFilter {
  field: string;
  condition: string;
  value: string;
}

export interface FilterUI {
  fields: Option[];
  conditions: Option[];
}
