import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BanksComponent } from './banks.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';

const routes: Routes = [
  {
    path: '',
    component: BanksComponent
  },
  {
    path: ':id',
    component: BankDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanksRoutingModule { }
