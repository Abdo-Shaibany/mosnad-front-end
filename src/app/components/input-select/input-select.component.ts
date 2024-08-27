import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Option } from 'src/app/core/models/option.model';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
})
export class InputSelectComponent {
  @Input({ required: true }) options!: Option[];
  @Input({ required: true }) currentOption?: Option;

  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) class!: string;

  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) isSubmitted!: boolean;

  @Output() onSelect = new EventEmitter<Option>();

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  onOptionSelect(item: Option) {
    this.onSelect.emit(item);
    this.toggle();
    if (this.control) {
      this.control.setValue(item.id);
    }
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target) && this.isOpen) {
      this.toggle();
    }
  }

  constructor(private eRef: ElementRef) {}
}
