import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../_guards/auth.guard';

import { EstateComponent } from './estate.component';
import { EstateCreateComponent } from './estate-create/estate-create.component';
import { EstateDetailComponent } from './estate-detail/estate-detail.component';
import { EstateListComponent } from './estate-list/estate-list.component';

import { Org } from '../_enum/org.enum';
import { EstateUpdateComponent } from './estate-update/estate-update.component';

const router: Routes = [
    {
        path: '',
        component: EstateComponent,
        children: [
            {
                path: '',
                component: EstateListComponent,
                canActivate: [AuthGuard],
                data: { roles: [Org.Admin, Org.Seller] }
            },
            {
                path: 'create',
                component: EstateCreateComponent,
                canActivate: [AuthGuard],
                data: { roles: Org.Seller }
            },
            {
                path: 'update/:id',
                component: EstateUpdateComponent,
                canActivate: [AuthGuard],
                data: { roles: Org.Seller }
            },
            {
                path: ':id',
                component: EstateDetailComponent,
                canActivate: [AuthGuard],
                data: { roles: [Org.Admin, Org.Seller] }
            }
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
export class EstateRoutingModule { }
