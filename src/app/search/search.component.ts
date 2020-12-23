import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CountryApiService } from '../country-api.service';

import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  countrySearchForm = new FormControl();
  filteredResults;
  countryData;

  errorMessage: string;
  isLoading:boolean = false;


  constructor(
    private countryApiService: CountryApiService,
    private http: HttpClient,) {
    }

  ngOnInit(): void {
    this.countrySearchForm.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMessage = "";
          this.filteredResults = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get(
            'https://restcountries.eu/rest/v2/name/' + value
            )
          .pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          )
        )
      )
      .subscribe(data => {
        this.countryData = data;
        for(let i = 0; i < this.countryData.length; i++) {
          if(data[i] == undefined) {
            this.errorMessage = data['Error'];
            this.filteredResults = [];
          } else {
            this.errorMessage = "";
            this.filteredResults = data[i];
          }
          console.log(this.filteredResults);
        }
      });
  }

  // sendToRestCountriesApi(formValues) {
  //   this.countryApiService
  //     .getCountryData(formValues.countryName)
  //     .subscribe(data => {
  //       this.countryData = data;
  //       // this.countrySearchEvent.emit(this.countryData);
  //       console.log(this.countryData);
  //       console.log(this.countryData[0].name);
  //     })
  // }

}
