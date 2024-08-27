import { Component, Input, OnInit } from '@angular/core';
import { Option } from 'src/app/core/models/option.model';
import { DROPDOWN_CLASSES_MAIN } from '../dropdown/dorpdown.classes';
import { APIService } from 'src/app/core/services/api.service';
import { FormControl } from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-input-select-entity',
  templateUrl: './input-select-entity.component.html',
})
export class InputSelectEntityComponent implements OnInit {
  @Input({ required: true }) url!: string;
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) isSubmitted!: boolean;

  options: Option[] = [];
  currentOption?: Option;

  DROPDOWN_CLASSES_MAIN = DROPDOWN_CLASSES_MAIN;

  ngOnInit(): void {
    this.getOptions();
  }

  onSelectOption(item: Option) {
    this.currentOption = item;
  }

  getOptions() {
    this.apiService.getAll<Option>(this.url).subscribe({
      next: (result) => {
        this.options = result;

        if (this.control.value) {
          this.currentOption = this.options.find(
            (el) => el.id === this.control.value
          );
        }
      },
      error: (err) => {
        this.messageService.publishMessage({
          type: 'error',
          message: err.msg,
          duration: 3000,
        });
        console.log(err, ' error fetching ', this.url);
      },
    });
  }

  constructor(
    private apiService: APIService,
    private messageService: MessageService
  ) { }
}
