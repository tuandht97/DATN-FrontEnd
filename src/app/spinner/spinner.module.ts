import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { SpinnerComponent } from './spinner.component';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [SpinnerComponent],
  exports: [SpinnerComponent]
})

export class SpinnerModule { }
