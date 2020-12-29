import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map, tap } from 'rxjs/operators';



@Injectable()
export class CountryApiService {

  constructor(private http: HttpClient) {}

  getCountryData(countryName): Observable<any> {
    return this.http.get(
      'https://restcountries.eu/rest/v2/name/' + countryName
    ).pipe(
      catchError(this.handleError)
    )
  }

  handleError(httpErrorResponse: HttpErrorResponse) {
    if(httpErrorResponse.error instanceof ErrorEvent) {
      console.log(httpErrorResponse.error.message)
    } else {
      console.log(httpErrorResponse.status)
    }
    return throwError(
      console.log('Oops, something went wrong!')
    )
  }

  getRegionData(chosenRegion) {
    if(chosenRegion === 'world') {
      return this.http.get(
        'https://restcountries.eu/rest/v2/all'
      )
    } else {
      return this.http.get(
        'https://restcountries.eu/rest/v2/region/' + chosenRegion
      )
    }
  }

}
