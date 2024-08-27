import { Action } from './action.model';
import { Dropdown } from './dropdown.model';
import { FilterUI } from './filter.model';
import { Table } from './table.model';

export interface LayoutOne {
  title: string;
  mainAction: Action;
  filter: FilterUI;
  table: Table;
}
