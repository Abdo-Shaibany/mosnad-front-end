import { RequestFilter } from './filter.model';
import { Pagination } from './pagination.model';
import { Sort } from './sort.model';

export interface RequestQuery {
  search?: string;
  filters?: RequestFilter[];
  pagination: Pagination;
  sorts?: Sort[];
}
