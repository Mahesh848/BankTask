import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavsComponent } from './favs/favs.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'banks',
    pathMatch: 'full'
  },
  {
    path: 'banks',
    loadChildren: './banks/banks.module#BanksModule'
  },
  {
    path: 'favs',
    component: FavsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
