import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from 'src/app/core/models/action.model';
import { CreateOption } from 'src/app/core/models/option.model';
import { Pagination } from 'src/app/core/models/pagination.model';
import { RequestQuery } from 'src/app/core/models/query.model';
import { ResponseList } from 'src/app/core/models/response-list.model';

@Component({
  selector: 'app-layout-cards-one',
  templateUrl: './layout-cards-one.component.html',
})
export class LayoutCardsOneComponent {
  @Input({ required: true }) action!: Action;
  @Input({ required: true }) listData!: ResponseList<CreateOption>;
  @Input({ required: true }) isLoading!: boolean;
  @Input({ required: true }) query!: RequestQuery;
  @Input({ required: true }) title!: string;

  @Output() fetchData = new EventEmitter<RequestQuery>();

  @Output() editEvent = new EventEmitter<CreateOption>();
  @Output() deleteEvent = new EventEmitter<CreateOption>();

  searchValue: string = '';

  onPageChange(pagination: Pagination) {
    this.query.pagination = pagination;
    this.fetchData.emit(this.query);
  }

  onSearch(searchValue: string) {
    this.searchValue = searchValue;
    this.query.search = searchValue;
    this.fetchData.emit(this.query);
  }
}
