import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../_guards/auth.guard';

import { ItemComponent } from './item.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemListComponent } from './item-list/item-list.component';
import { Org } from '../_enum/org.enum';

const router: Routes = [
    {
        path: '',
        component: ItemComponent,
        children: [
            {
                path: '',
                component: ItemListComponent,
                canActivate: [AuthGuard],
                data: { roles: [Org.User, Org.Seller] }
            },
            {
                path: 'create',
                component: ItemCreateComponent,
                canActivate: [AuthGuard],
                data: { roles: [Org.User, Org.Seller] }
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
export class ItemRoutingModule { }
