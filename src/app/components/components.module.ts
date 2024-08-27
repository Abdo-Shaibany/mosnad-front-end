import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MainSideMenuComponent } from './main-side-menu/main-side-menu.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FilterComponent } from './filter/filter.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FiltersBarComponent } from './filters-bar/filters-bar.component';
import { LoadingSkeletonComponent } from './loading-skeleton/loading-skeleton.component';
import { ProgressComponent } from './progress/progress.component';
import { InputTextComponent } from './input-text/input-text.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { InputSelectEntityComponent } from './input-select-entity/input-select-entity.component';
import { StepsComponent } from './steps/steps.component';
import { MessageComponent } from './message/message.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { InputCmComponent } from './input-cm/input-cm.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { InputTextIconComponent } from './input-text-icon/input-text-icon.component';
import { AddNewOneComponent } from './add-new-one/add-new-one.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { ChoiceImageStateComponent } from './image-picker/choice-image-state/choice-image-state.component';
import { ImagePreviewStateComponent } from './image-picker/image-preview-state/image-preview-state.component';
import { TextCardComponent } from './text-card/text-card.component';
import { TextareaComponent } from './textarea/textarea.component';
import { TagComponent } from './tag/tag.component';
import { InputEditorComponent } from './input-editor/input-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { InputMoneyComponent } from './input-money/input-money.component';

@NgModule({
  declarations: [
    TopBarComponent,
    MainSideMenuComponent,
    SearchComponent,
    ButtonComponent,
    DropdownComponent,
    FilterComponent,
    TableComponent,
    PaginationComponent,
    FiltersBarComponent,
    LoadingSkeletonComponent,
    ProgressComponent,
    InputTextComponent,
    BreadcrumbComponent,
    InputSelectComponent,
    InputSelectEntityComponent,
    StepsComponent,
    MessageComponent,
    ConfirmComponent,
    InputCmComponent,
    DatePickerComponent,
    InputTextIconComponent,
    AddNewOneComponent,
    ImagePickerComponent,
    ChoiceImageStateComponent,
    ImagePreviewStateComponent,
    TextCardComponent,
    TextareaComponent,
    TagComponent,
    InputEditorComponent,
    InputMoneyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CKEditorModule,
  ],
  exports: [
    TopBarComponent,
    MainSideMenuComponent,
    SearchComponent,
    DropdownComponent,
    FilterComponent,
    ButtonComponent,
    TableComponent,
    PaginationComponent,
    FiltersBarComponent,
    LoadingSkeletonComponent,
    ProgressComponent,
    InputTextComponent,
    BreadcrumbComponent,
    InputSelectComponent,
    InputSelectEntityComponent,
    StepsComponent,
    MessageComponent,
    ConfirmComponent,
    InputCmComponent,
    DatePickerComponent,
    InputTextIconComponent,
    AddNewOneComponent,
    ImagePickerComponent,
    TextCardComponent,
    TextareaComponent,
    TagComponent,
    InputEditorComponent,
    InputMoneyComponent,
  ],
  providers: [provideNgxMask()],
})
export class ComponentsModule {}
