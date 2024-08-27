import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Filter } from 'src/app/core/models/filter.model';
import { Option } from 'src/app/core/models/option.model';
import { DROPDOWN_CLASSES_FILTER } from '../dropdown/dorpdown.classes';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  @Input({ required: true }) fields!: Option[];
  @Input({ required: true }) conditions!: Option[];

  @Output() onSelect = new EventEmitter<Filter>();

  isOpen = false;

  currentField?: Option;
  currentCondition?: Option;
  currentValue?: string;
  DROPDOWN_CLASSES_FILTER = DROPDOWN_CLASSES_FILTER;

  onOptionSelect(item: Option, type: string) {
    if (type === 'condition') this.currentCondition = item;
    else if (type === 'field') this.currentField = item;
  }

  submit() {
    if (this.currentField && this.currentCondition && this.currentValue) {
      this.onSelect.emit({
        field: this.currentField,
        condition: this.currentCondition,
        value: this.currentValue,
      });

      this.toggle();
      this.clean();
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target) && this.isOpen) {
      this.toggle();
      this.clean();
    }
  }

  constructor(private eRef: ElementRef) {}

  clean() {
    this.isOpen = false;
    this.currentCondition = undefined;
    this.currentField = undefined;
    this.currentValue = undefined;
  }
}
