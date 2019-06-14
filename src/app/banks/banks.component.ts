import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedCity: FormControl = new FormControl('BANGALURU');
  search: FormControl = new FormControl('');

  url = 'https://vast-shore-74260.herokuapp.com/banks';
  options = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  banksDataSource;
  banksTableHeadings = ['fav', 'bank_id', 'bank_name', 'branch', 'ifsc', 'city', 'district', 'state', 'address'];
  pageSizes = [];

  cacheMemory;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.generatePageSizes(5000);
    this.createCache();

    this.getAllBanksInCity(this.selectedCity.value);

    this.selectedCity.valueChanges.subscribe((value) => {
      this.getAllBanksInCity(value);
    });

    this.search.valueChanges.subscribe((value) => {
      this.searchBank(value);
    });
  }

  createCache = async () => {
    this.cacheMemory = await caches.open('bank-cache');
  }

  putCache = (request: Request, response: Response) => {
    this.cacheMemory.put(request, response);
  }

  getAllBanksInCity = (cityName) => {

    caches.open('bank-cache').then((cache) => {
      cache.match(new Request(`${this.url}?city=${cityName}`)).then((response) => {
        if (response !== undefined) {
          response.text().then((data) => {
            const result = JSON.parse(data);
            this.banksDataSource = new MatTableDataSource(result);
            this.banksDataSource.paginator = this.paginator;
          });
        } else {
          this.http.get(`${this.url}?city=${cityName}`).subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            (response: any) => {
              console.log(response);
              this.putCache(new Request(`${this.url}?city=${cityName}`), new Response(JSON.stringify(response)));
              this.banksDataSource = new MatTableDataSource(response);
              this.banksDataSource.paginator = this.paginator;
            },
            (error) => {
              console.log(error);
            }
          );
        }
      });
    });
  }

  generatePageSizes = (length) => {
    for (let i = 10; i <= length; i = i + 10) {
      this.pageSizes.push(i);
    }
    console.log(this.pageSizes);
  }

  searchBank = (text: string) => {
    this.banksDataSource.filter = text.trim().toLowerCase();
  }

  addToFavs = (bank) => {
    let favs;
    favs = localStorage.getItem('favs');
    if (favs) {
      favs = JSON.parse(favs);
      favs.push(bank);
      console.log(favs);
      localStorage.setItem('favs', JSON.stringify(favs));
    } else {
      favs = [];
      favs.push(bank);
      localStorage.setItem('favs', JSON.stringify(favs));
    }
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
      localStorage.setItem('favs', JSON.stringify(favs));
    }
  }

  checkFavOrNot = (bank) => {
    let favs;
    favs = localStorage.getItem('favs');
    if (favs) {
      favs = JSON.parse(favs);
      for (const b of favs) {
        if (b && b.ifsc === bank.ifsc) {
          return true;
        }
      }
    }
    return false;
  }
}
