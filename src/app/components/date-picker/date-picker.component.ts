import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
})
export class DatePickerComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) isSubmitted!: boolean;
  @Input({ required: false }) errorMessage?: string;
}
