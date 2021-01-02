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
  @ViewChild('timerParagraph', {static: true}) timerParagraph: ElementRef;

  countryData;

  capitalForm;
  userInput: string = '';
  correctAnswerCount: number = 0;
  rendererRow;
  rendererText;

  startButtonDisabled: boolean = false;
  pauseButtonDisabled: boolean = null;

  counter: number = 300;
  tick: number = 1000;
  countdown;

  constructor(private readonly countryApiService: CountryApiService,
              private readonly fb: FormBuilder,
              private readonly renderer: Renderer2,
              private router: Router,
              public elem: ElementRef,) {
    this.capitalForm = this.fb.group({
      capital: null
    })
  }

  ngOnInit(): void {
    this.capitalForm.disable();
    this.countryApiService
      .getRegionData('world')
      .subscribe(data => {
        this.countryData = data;
        this.cleanUpCountryData();
    })
    this.monitorForm();
  }

  cleanUpCountryData(){
    this.countryData = JSON.stringify(this.countryData)
      .replace(/[á]/g, 'a')
      .replace(/[é]/g, 'e')
      .replace(/[í]/g, 'i')
      .replace(/[ó]/g, 'o')
      .replace(/[ú]/g, 'u');
    this.countryData = JSON.parse(this.countryData);
    this.countryData = this.countryData.filter(function(country) {
      return country.capital !== '' && country.name !== 'Holy See';
    });
    this.countryData.sort((a, b) =>(a.region < b.region) ? -1: 1);
    this.countryData.forEach(country => {
      if(country.name === "United States of America") {
        country.capital = "Washington";
      }
      else if(country.name === "Italy") {
        country.capital = "Rome";
      }
    })
  }

  monitorForm() {
    this.capitalForm.valueChanges.subscribe(value => {
      this.userInput = value.capital;
      this.createTableElements();
    })
  }

  createTableElements() {
    for(let i = 0; i < this.countryData.length; i++) {
      let lowerCaseCapital = this.countryData[i].capital.toLowerCase();
      if(this.userInput === this.countryData[i].capital || this.userInput === lowerCaseCapital) {
        this.rendererRow = this.tableHeader.toArray()[i].nativeElement;
        this.rendererText = this.renderer.createText(this.countryData[i].capital);
        this.renderer.appendChild(this.rendererRow, this.rendererText);
        this.renderer.setStyle(this.rendererRow, 'border-color', '#d8ffd8');
        this.correctAnswerCount++;
        this.capitalForm.reset();
        this.countryData[i].capital = "Capital is guessed. Do not repeat new headers";
      }
    }
  }

  startTimer() {
      this.capitalForm.enable();
      this.countdown = timer(0, this.tick)
        .subscribe(() => {
          --this.counter
          this.checkTimer();
        });
      this.startButtonDisabled = true;
      this.renderer.setStyle(this.timerParagraph.nativeElement, 'color', 'yellow');
  }

  checkTimer() {
    if(this.counter === 0) {
      this.capitalForm.disable();
      this.countdown.unsubscribe();
      this.pauseButtonDisabled = true;
      this.startButtonDisabled = true;
      this.renderer.setStyle(this.timerParagraph.nativeElement, 'color', 'red');
    };
  }

  pauseTimer() {
    this.capitalForm.disable();
    this.countdown.unsubscribe();
    this.startButtonDisabled = false;
    this.renderer.setStyle(this.timerParagraph.nativeElement, 'color', 'gray');
  }

  reloadPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['destroyer'])
      });
  }

}


