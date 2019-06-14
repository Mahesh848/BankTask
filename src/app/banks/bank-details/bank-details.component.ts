import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {

  selectedBank;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.selectedBank = params.id;
    });
  }

  ngOnInit() {
  }

}
