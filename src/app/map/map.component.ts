import { Component, OnInit, Input } from '@angular/core';
import { mapStyle } from './mapStyle';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() country;

  mapOptions = {
    zoom: 4,
    styles: mapStyle,
    streetViewControl: false,
  }

  constructor() { }

  ngOnInit(): void {
  }

}
