import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionCreateComponent } from './transaction-create/transaction-create.component';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  declarations: [
    TransactionComponent,
    TransactionCreateComponent,
    TransactionListComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedModule
  ]
})
export class TransactionModule { }
