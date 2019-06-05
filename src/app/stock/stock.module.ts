import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';

import { StockRoutingModule } from './stock-routing.module';
import { SharedModule } from '../_shared/shared.module';
import { SpinnerModule } from '../spinner/spinner.module';

@NgModule({
  declarations: [
    StockComponent,
    StockListComponent,
    StockDetailComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    SharedModule,
    SpinnerModule
  ]
})
export class StockModule { }
