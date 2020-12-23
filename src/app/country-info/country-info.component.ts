import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.css']
})
export class CountryInfoComponent implements OnInit {
  // @Input() countryData;
  @Input() country;
  constructor() { }

  ngOnInit(): void {
  }

}
