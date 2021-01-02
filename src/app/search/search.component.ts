import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CountryApiService } from '../country-api.service';

import { startWith, map, mergeMapTo, mergeMap, catchError, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Observable, of, observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public countriesAutoComplete$: Observable<any>;
  searchCountriesCtrl = new FormControl();
  countryData;

  constructor(
    private countryApiService: CountryApiService,
    private http: HttpClient,) {};

  lookup(value: string): Observable<any> {
    return this.http.get(
      'https://restcountries.eu/rest/v2/name/' + value
    ).pipe(
      catchError(_ => {
        return of(null);
      })
    )
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.countriesAutoComplete$ = this.searchCountriesCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(100),
      switchMap(value => {
        if (value !== '') {
          return this.lookup(value);
        } else {
          return of(null);
        }
      })
    )
  }
  displayInfo(i) {
    let searchValue = this.searchCountriesCtrl.value;
    this.countryApiService
      .getCountryData(searchValue)
      .subscribe(data => {
        this.countryData = data;
        console.log(this.countryData[0]);
      })
  }


}
