import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../_guards/auth.guard';

import { TransactionComponent } from './transaction.component';
import { TransactionCreateComponent } from './transaction-create/transaction-create.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { Org } from '../_enum/org.enum';

const router: Routes = [
    {
        path: '',
        component: TransactionComponent,
        children: [
            {
                path: '',
                component: TransactionListComponent,
                canActivate: [AuthGuard],
                data: { roles: [Org.User, Org.Seller] }
            },
            {
                path: 'create',
                component: TransactionCreateComponent,
                canActivate: [AuthGuard],
                data: { roles: Org.User }
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(router)
    ],
    exports: [
        RouterModule
    ]
})
export class TransactionRoutingModule { }
