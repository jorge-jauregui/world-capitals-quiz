import { Component, OnInit, ElementRef, ViewChildren, QueryList, Renderer2, ViewChild } from '@angular/core';
import { CountryApiService } from '../country-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  @ViewChildren('item') private element: QueryList<ElementRef>;
  @ViewChild('score', {static: false}) score: ElementRef;
  // Data controls
  regionData;
  quizItemIndexOne: number = 0;
  quizItemIndexTwo: number = 1;
  quizItemIndexThree: number = 2;
  quizItemIndexFour: number = 3;
  quizItemArray = [];
  index: number = 0;
  // Game controls
  reachedTen: boolean = false;
  correctAnswerCount: number = 0;
  answerAttempted: boolean = false;
  userAnswer
  correctAnswer = null;
  activeButton: string;

  constructor(private countryApiService: CountryApiService,
              private router: Router,
              private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  onRegionChosen(chosenRegion) {
    this.countryApiService
      .getRegionData(chosenRegion)
      .subscribe(data => {
        this.regionData = data;

        this.regionData = this.regionData.filter(function(el) {
          return el.capital !== ''
        });
        console.log(this.regionData);
        this.regionData.sort(() => Math.random() - 0.5);
        this.quizItemArray
          .push(this.regionData[this.quizItemIndexOne],
                this.regionData[this.quizItemIndexTwo],
                this.regionData[this.quizItemIndexThree],
                this.regionData[this.quizItemIndexFour]
                );
        this.shuffleQuizItemArray(this.quizItemArray);
      })
      let navigationExtras = { queryParams: { region: chosenRegion }};
      this.router.navigate(['quiz'], navigationExtras);
  }

  checkAnswer(i) {
    this.userAnswer = this.element.toArray()[i].nativeElement.innerHTML.trim();
    this.correctAnswer = this.regionData[this.index].capital;
    let scoreParagraph = this.score.nativeElement;
    if(this.userAnswer === this.correctAnswer) {
      this.correctAnswerCount++;
      this.correctAnswer = true;
      this.renderer.setStyle(scoreParagraph, 'color', 'green');
    } else {
      this.correctAnswer = false;
      this.renderer.setStyle(scoreParagraph, 'color', 'red');
    }
    this.blockAnswerButtons();

  }

  displayNextQuestion() {
    this.index++;
    this.quizItemIndexOne++;
    this.quizItemIndexTwo++;
    this.quizItemIndexThree++;
    this.quizItemIndexFour++;
    this.quizItemArray = [];
    this.quizItemArray.push(this.regionData[this.quizItemIndexOne], this.regionData[this.quizItemIndexTwo], this.regionData[this.quizItemIndexThree], this.regionData[this.quizItemIndexFour]);
    this.shuffleQuizItemArray(this.quizItemArray);
    let scoreParagraph = this.score.nativeElement;
    this.renderer.setStyle(scoreParagraph, 'color', 'white');
    if(this.index === 9) {
      this.reachedTen = true;
    }
    this.unblockAnswerButtons();
    this.correctAnswer = null;
  }

  // This function uses the Fisher-Yates shuffle to randomize the quiz items
  shuffleQuizItemArray(quizItemArray) {
    let i = 0;
    let j = 0;
    let temp = null;

    for (i = quizItemArray.length - 1; i > 0; i-= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = quizItemArray[i];
      quizItemArray[i] = quizItemArray[j];
      quizItemArray[j] = temp;
    }
  }

  unblockAnswerButtons() {
    this.answerAttempted = false;
  }

  blockAnswerButtons() {
    this.answerAttempted = true;
  }

  resetQuiz() {
    this.reachedTen = false;
    this.quizItemIndexOne = 0;
    this.quizItemIndexTwo = 1;
    this.quizItemIndexThree = 2;
    this.quizItemIndexFour = 3;
    this.quizItemArray = [];
    this.correctAnswerCount = 0;
    this.index = 0;
    this.answerAttempted = false;
    this.correctAnswer = null;
    this.renderer.setStyle(this.score.nativeElement, 'color', 'white');

  }

  setButtonActive(buttonName) {
    this.activeButton = buttonName;
  }

  isButtonActive(buttonName) {
    return this.activeButton === buttonName;
  }
}
