import { Action } from './action.model';
import { Dropdown } from './dropdown.model';
import { FilterUI } from './filter.model';
import { Table } from './table.model';

export interface LayoutTwo {
  dropdown?: Dropdown;
  mainAction?: Action;
  filter: FilterUI;
  table: Table;
}
