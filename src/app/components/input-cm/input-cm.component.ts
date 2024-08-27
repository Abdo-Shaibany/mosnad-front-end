import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-cm',
  templateUrl: './input-cm.component.html',
})
export class InputCmComponent {
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) isSubmitted!: boolean;
  @Input({ required: false }) errorMessage?: string;
  @Input() unit = 'CM';
}
