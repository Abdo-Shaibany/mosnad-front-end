import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Filter } from 'src/app/core/models/filter.model';
import { LayoutTwo } from 'src/app/core/models/layout-two.model';
import { Option } from 'src/app/core/models/option.model';
import { Pagination } from 'src/app/core/models/pagination.model';
import { RequestQuery } from 'src/app/core/models/query.model';
import { ResponseList } from 'src/app/core/models/response-list.model';
import { Sort } from 'src/app/core/models/sort.model';
import { CurrentSupplierService } from 'src/app/core/services/current-supplier.service';

@Component({
  selector: 'app-layout-two',
  templateUrl: './layout-two.component.html',
})
export class LayoutTwoComponent implements OnChanges {
  @Input({ required: true }) meta!: LayoutTwo;
  @Input({ required: true }) listData!: ResponseList<any>;
  @Input() dropdownOptions?: Option[];
  @Input({ required: true }) isLoading!: boolean;
  @Input({ required: true }) query!: RequestQuery;

  @Output() fetchData = new EventEmitter<RequestQuery>();
  @Output() processCreateAction = new EventEmitter<void>();
  @Output() emitDropdownOption = new EventEmitter<Filter>();

  currentDropdownOption?: Option;
  currentFilters: Filter[] = [];
  currentDropdownFilter?: Filter;

  // itemsSelected: Product[] = [];

  sort?: Sort;
  searchValue: string = '';

  onPageChange(pagination: Pagination) {
    this.query.pagination = pagination;
    this.fetchData.emit(this.query);
  }

  onSort(sort?: Sort) {
    this.sort = sort;
    this.query.sorts = sort ? [sort] : [];
    this.fetchData.emit(this.query);
  }

  onSearch(searchValue: string) {
    this.searchValue = searchValue;
    this.query.search = searchValue;
    this.fetchData.emit(this.query);
  }

  onItemsSelected(items: any[]) {
    // this.itemsSelected = items;
  }

  onOptionSelect(item: Option, type: string) {
    if (type === 'main-dropdown' && this.meta.dropdown) {
      this.currentDropdownOption = item;
      this.currentDropdownFilter = {
        field: {
          id: this.meta.dropdown.key,
          text: '',
        },
        condition: {
          id: 'equals',
          text: '',
        },
        value: item.id,
      };
      this.emitDropdownOption.emit(this.currentDropdownFilter);
      this.updateFilters();
    }
  }

  addFilter(filter: Filter) {
    this.currentFilters.push(filter);
    this.updateFilters();
  }

  onRemoveFilter(index: number) {
    this.currentFilters.splice(index, 1);
    this.updateFilters();
  }

  updateFilters() {
    this.query.filters = [];
    this.query.filters.push(
      ...this.currentFilters.map((el) => {
        return {
          field: el.field.id,
          condition: el.condition.id,
          value: el.value,
        };
      })
    );
    if (this.currentDropdownFilter)
      this.query.filters.push(
        ...[this.currentDropdownFilter].map((el) => {
          return {
            field: el.field.id,
            condition: el.condition.id,
            value: el.value,
          };
        })
      );

    this.fetchData.emit(this.query);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dropdownOptions']) {
      this.currentDropdownFilter =
        this.currentSupplierService.getCurrentSupplier();
      this.updateFilters();
      this.currentDropdownOption = this.dropdownOptions?.find(
        (el) => el.id === this.currentDropdownFilter?.value
      );
    }
  }

  constructor(private currentSupplierService: CurrentSupplierService) { }
}
