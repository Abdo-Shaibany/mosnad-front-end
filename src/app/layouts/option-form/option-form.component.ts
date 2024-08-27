import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Bread } from 'src/app/core/models/bread.model';
import {
  CreateOption,
  mapOptionFormToCreateOption,
  OptionForm,
  OptionFormControls,
} from 'src/app/core/models/option.model';
import { APIService } from 'src/app/core/services/api.service';
import { MessageService } from 'src/app/core/services/message.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-option-form',
  templateUrl: './option-form.component.html',
})
export class OptionFormComponent implements OnInit {
  optionForm!: FormGroup;

  isSubmitValid = false;
  isSubmitting = false;

  @Input({ required: true }) breads!: Bread[];
  @Input({ required: true }) currentBread!: string;
  @Input({ required: true }) url!: string;

  currentItemId?: string;
  isLoading = false;

  public get textFormControl(): FormControl {
    return this.optionForm.get('text') as FormControl;
  }

  onSubmit() {
    if (this.isSubmitting) return;
    if (!this.isSubmitValid) return;

    this.isLoading = true;
    this.isSubmitting = true;

    const formData: OptionForm = this.optionForm.value;

    if (this.currentItemId) {
      this.updateItem(formData);
    } else this.createItem(formData);
  }

  updateItem(input: OptionForm) {
    this.apiService
      .updateItem<CreateOption>(mapOptionFormToCreateOption(input), this.url)
      .subscribe({
        next: (_) => {
          this.isLoading = false;
          this.utilService.goBack();
          this.messageService.publishMessage({
            message: 'تم التحديث بنجاح',
            type: 'success',
            duration: 3000,
          });
        },
        error: (_) => {
          this.isLoading = false;
          this.isSubmitting = false;
          this.messageService.publishMessage({
            message: 'حصل خطأ عند التحديث',
            type: 'error',
            duration: 3000,
          });
        },
      });
  }

  createItem(input: OptionForm) {
    this.apiService
      .createItem<CreateOption>(mapOptionFormToCreateOption(input), this.url)
      .subscribe({
        next: (_) => {
          this.isLoading = false;
          this.utilService.goBack();
          this.messageService.publishMessage({
            message: 'تم إنشاء العنصر بنجاح',
            type: 'success',
            duration: 3000,
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.isSubmitting = false;
          console.log(
            error,
            ' submitting supplier error when creating supplier'
          );
          this.messageService.publishMessage({
            message: 'حصل خطأ عند انشاء العنصر',
            type: 'error',
            duration: 3000,
          });
        },
      });
  }

  initForm() {
    this.optionForm = this.fb.group<OptionFormControls>({
      id: new FormControl<number | null>(null),
      text: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  constructor(
    private fb: FormBuilder,
    private apiService: APIService,
    private utilService: UtilService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.initForm();
    this.listenToStatues();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.currentItemId = id;
      this.isLoading = true;
      this.fetchDataAndMapIt(id);
    }
  }

  fetchDataAndMapIt(id: string) {
    this.apiService.getOne<CreateOption>(id, this.url).subscribe((res) => {
      this.optionForm.patchValue({
        id: res.id,
        text: res.text,
      });
      this.optionForm.updateValueAndValidity();
      this.isStepValid();
      this.isLoading = false;
    });
  }

  listenToStatues() {
    this.optionForm.statusChanges.subscribe((_) => {
      this.isStepValid();
    });
  }

  isStepValid() {
    this.isSubmitValid = this.optionForm.status === 'VALID';
  }
}
