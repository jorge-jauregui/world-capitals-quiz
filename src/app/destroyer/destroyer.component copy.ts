import { Component, ElementRef, OnInit, Renderer2, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { CountryApiService } from '../country-api.service';
import { FormBuilder } from '@angular/forms';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destroyer',
  templateUrl: './destroyer.component.html',
  styleUrls: ['./destroyer.component.css']
})
export class DestroyerComponent implements OnInit {
  @ViewChildren('tableHeader', {read: ElementRef}) private tableHeader: QueryList<ElementRef>;
  @ViewChild('regionHeader', {static: true}) regionHeader: ElementRef;

  countryData;

  capitalForm;
  userInput: string = '';
  correctAnswerCount: number = 0;
  rendererRow;
  rendererText;

  startButtonDisabled = false;

  // counter = 300;
  counter: number = 10;
  tick: number = 1000;
  countdown;

  constructor(private readonly countryApiService: CountryApiService,
              private readonly fb: FormBuilder,
              private readonly renderer: Renderer2,
              private router: Router,
              public elem: ElementRef) {
    this.capitalForm = this.fb.group({
      capital: null
    })
  }

  /*
  ngOnInit submits an http.get() request to obtain all countries and sorts these by region.
  - The hook then subscribes to valueChanges in order to compare user input to a given capital
    within the countryData object array.
  - Within the subscribe method we use a for loop to do the comparison and to have renderer2
    display the new th elements dependent on whether the user has inputted correct capitals or not.
  */
  ngOnInit(): void {
    this.capitalForm.disable();
    this.countryApiService
      .getRegionData('world')
      .subscribe(data => {
        this.countryData = data;
        this.countryData = JSON.stringify(this.countryData)
                                .replace(/[á]/g, 'a')
                                .replace(/[é]/g, 'e')
                                .replace(/[í]/g, 'i')
                                .replace(/[ó]/g, 'o')
                                .replace(/[ú]/g, 'u');
        this.countryData = JSON.parse(this.countryData);
        this.countryData = this.countryData.filter(function(el) {
          return el.capital !== '';
        });
        this.countryData.sort((a, b) =>(a.region < b.region) ? -1: 1);
    })

    this.capitalForm.valueChanges.subscribe(value => {
      this.userInput = value.capital;
      for(let i = 0; i < this.countryData.length; i++) {
        if(this.countryData[i].name === "United States of America") {
          this.countryData[i].capital = "Washington";
        }
        let lowerCaseCapital = this.countryData[i].capital.toLowerCase();
        if(this.userInput === this.countryData[i].capital || this.userInput === lowerCaseCapital) {
          this.rendererRow = this.tableHeader.toArray()[i].nativeElement;
          this.rendererText = this.renderer.createText(this.countryData[i].capital);
          this.renderer.appendChild(this.rendererRow, this.rendererText);
          this.renderer.setStyle(this.rendererRow, 'background-color', '#d8ffd8');
          this.correctAnswerCount++;
          this.capitalForm.reset();
        }
      }
    })
  }

  startGame() {
    this.capitalForm.enable();
    this.countdown = timer(0, this.tick)
      .subscribe(() => {
        --this.counter
        if(this.counter === 0) {
          this.capitalForm.disable();
          this.countdown.unsubscribe();
          // this.renderer.appendChild
        };
      });
    this.startButtonDisabled = true;
  }

  resetGame() {
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['destroyer'])
      });
  }

}


