import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { ExchangeComponent } from './exchange/exchange.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'exchange', component: ExchangeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path: 'transaction',
    loadChildren: './transaction/transaction.module#TransactionModule'
  },
  {
    path: 'stock',
    loadChildren: './stock/stock.module#StockModule'
  },
  {
    path: 'item',
    loadChildren: './item/item.module#ItemModule'
  },
  {
    path: 'estate',
    loadChildren: './estate/estate.module#EstateModule'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

