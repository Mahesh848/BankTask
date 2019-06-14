import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css']
})
export class FavsComponent implements OnInit {

  banksDataSource;
  banksTableHeadings = ['fav', 'bank_id', 'bank_name', 'branch', 'ifsc', 'city', 'district', 'state', 'address'];

  constructor() {
    let favs;
    favs = localStorage.getItem('favs');
    if (favs) {
      favs = JSON.parse(favs);
      this.banksDataSource = new MatTableDataSource(favs);
    }
  }

  ngOnInit() {
  }

  removeFromFavs = (bank) => {
    let favs;
    favs = localStorage.getItem('favs');
    if (favs) {
      favs = JSON.parse(favs);
      const finalfavs = favs.filter((b) => {
        return bank.ifsc !== b.ifsc;
      });
      favs = finalfavs;
      console.log(favs);
      this.banksDataSource = new MatTableDataSource(favs);
      localStorage.setItem('favs', JSON.stringify(favs));
    }
  }

}
