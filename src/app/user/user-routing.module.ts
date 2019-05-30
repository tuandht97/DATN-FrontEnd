import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../_guards/auth.guard';

import { UserComponent } from './user.component';
import { UserAssetsComponent } from './user-assets/user-assets.component';
import { UserCoinComponent } from './user-coin/user-coin.component';
import { UserListComponent } from './user-list/user-list.component';
import { Org } from '../_enum/org.enum';
import { UserDetailComponent } from './user-detail/user-detail.component';

const userRoutes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: '',
                component: UserAssetsComponent,
                canActivate: [AuthGuard],
                data: { roles: [Org.User, Org.Seller] }
            },
            {
                path: 'coin',
                component: UserCoinComponent,
                canActivate: [AuthGuard],
                data: { roles: Org.User }
            },
            {
                path: 'list',
                component: UserListComponent,
                canActivate: [AuthGuard],
                data: { roles: Org.Admin }
            },
            {
                path: ':username',
                component: UserDetailComponent,
                canActivate: [AuthGuard],
                data: { roles: Org.Admin }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule { }
