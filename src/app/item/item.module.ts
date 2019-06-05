import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemListComponent } from './item-list/item-list.component';

import { ItemRoutingModule } from './item-routing.module';
import { SharedModule } from '../_shared/shared.module';
import { SpinnerModule } from '../spinner/spinner.module';

@NgModule({
  declarations: [
    ItemComponent,
    ItemCreateComponent,
    ItemListComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    SharedModule,
    SpinnerModule
  ]
})
export class ItemModule { }
