import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserAssetsComponent } from './user-assets/user-assets.component';
import { SharedModule } from '../_shared/shared.module';
import { UserCoinComponent } from './user-coin/user-coin.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserCreateComponent } from './user-create/user-create.component';

@NgModule({
  declarations: [
    UserComponent,
    UserAssetsComponent,
    UserCoinComponent,
    UserListComponent,
    UserDetailComponent,
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
