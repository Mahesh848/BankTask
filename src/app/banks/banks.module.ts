import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanksRoutingModule } from './banks-routing.module';
import { BanksComponent } from './banks.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, MatIconModule, MatPaginatorModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [BanksComponent, BankDetailsComponent],
  imports: [
    CommonModule,
    BanksRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatPaginatorModule
  ]
})
export class BanksModule { }
