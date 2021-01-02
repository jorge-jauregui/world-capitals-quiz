import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-info',
  templateUrl: './search-info.component.html',
  styleUrls: ['./search-info.component.css']
})
export class SearchInfoComponent implements OnInit {

  @Input() country;

  constructor() { }

  ngOnInit(): void {
  }

}
