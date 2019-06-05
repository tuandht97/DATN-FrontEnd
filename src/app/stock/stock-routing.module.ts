import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../_guards/auth.guard';

import { StockComponent } from './stock.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { Org } from '../_enum/org.enum';

const router: Routes = [
    {
        path: '',
        component: StockComponent,
        children: [
            {
                path: '',
                component: StockListComponent,
                canActivate: [AuthGuard],
                data: { roles: Org.Admin }
            },
            {
                path: ':id',
                component: StockDetailComponent,
                // canActivate: [AuthGuard],
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(router)
    ],
    exports: [RouterModule]
})
export class StockRoutingModule { }
