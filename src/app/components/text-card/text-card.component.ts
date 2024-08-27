import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreateOption } from 'src/app/core/models/option.model';

@Component({
  selector: 'app-text-card',
  templateUrl: './text-card.component.html',
})
export class TextCardComponent {
  @Input({ required: true }) text!: CreateOption;
  @Output() editEvent = new EventEmitter<CreateOption>();
  @Output() deleteEvent = new EventEmitter<CreateOption>();
}
