import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  MatFormFieldModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatInputModule,
  MatSortModule,
  MatAutocompleteModule,
  MatOptionModule
} from '@angular/material';

import { NgxEditorModule } from 'ngx-editor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    ToastrModule,
    MatPaginatorModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatSortModule,
    NgxEditorModule,
    HttpClientModule,
    NgbModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
