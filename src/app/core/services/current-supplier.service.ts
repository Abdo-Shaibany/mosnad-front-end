import { Injectable } from '@angular/core';
import { Filter } from '../models/filter.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentSupplierService {
  constructor() {}

  updateCurrentSupplier(input: Filter) {
    // save the whole object
    localStorage.setItem('currentSupplier', JSON.stringify(input));
  }

  getCurrentSupplier(): Filter | undefined {
    // get the whole object
    return JSON.parse(
      localStorage.getItem('currentSupplier') as string
    ) as Filter;
  }
}
