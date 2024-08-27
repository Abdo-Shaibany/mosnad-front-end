import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter } from 'src/app/core/models/filter.model';

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
})
export class FiltersBarComponent {
  @Input({ required: true }) filters!: Filter[];
  @Output() onRemoveFilter = new EventEmitter<number>();
}
