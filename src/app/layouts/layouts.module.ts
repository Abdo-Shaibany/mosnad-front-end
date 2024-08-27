import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutTwoComponent } from './layout-two/layout-two.component';
import { ComponentsModule } from '../components/components.module';
import { LayoutOneComponent } from './layout-one/layout-one.component';
import { LayoutCardsOneComponent } from './layout-cards-one/layout-cards-one.component';
import { OptionFormComponent } from './option-form/option-form.component';
import { ScaffoldOneComponent } from './scaffold-one/scaffold-one.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { LayoutThreeComponent } from './layout-three/layout-three.component';

@NgModule({
  declarations: [
    LayoutTwoComponent,
    LayoutOneComponent,
    LayoutCardsOneComponent,
    OptionFormComponent,
    ScaffoldOneComponent,
    LayoutThreeComponent
  ],
  imports: [CommonModule, ComponentsModule, RouterModule],
  exports: [
    LayoutTwoComponent,
    LayoutOneComponent,
    LayoutCardsOneComponent,
    OptionFormComponent,
    LayoutThreeComponent
  ],
})
export class LayoutsModule { }
