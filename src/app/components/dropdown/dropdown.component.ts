import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Option } from 'src/app/core/models/option.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  @Input({ required: true }) options!: Option[];
  @Input({ required: true }) currentOption?: Option;

  @Input({ required: true }) placeholder!: string;
  @Input({ required: false }) label?: string;
  @Input({ required: true }) class!: string;

  @Output() onSelect = new EventEmitter<Option>();

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  onOptionSelect(item: Option) {
    this.onSelect.emit(item);
    this.toggle();
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target) && this.isOpen) {
      this.toggle();
    }
  }

  constructor(private eRef: ElementRef) {}
}
