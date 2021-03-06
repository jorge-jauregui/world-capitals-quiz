import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { CountryApiService } from './country-api.service';
import { CountryInfoComponent } from './country-info/country-info.component';
import { MapComponent } from './map/map.component';
import { QuizComponent } from './quiz/quiz.component';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { DestroyerComponent } from './destroyer/destroyer.component';
import { ChangeModeBarComponent } from './change-mode-bar/change-mode-bar.component';
import { TimerPipe } from './destroyer/timer.pipe';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Autocomplete
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { MAPS_API_KEY } from '../../secrets';
import { SearchInfoComponent } from './search/search-info/search-info.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    CountryInfoComponent,
    MapComponent,
    QuizComponent,
    HomeComponent,
    DestroyerComponent,
    ChangeModeBarComponent,
    TimerPipe,
    SearchComponent,
    SearchInfoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: MAPS_API_KEY
    }),
    AppRoutingModule,
    BrowserAnimationsModule,

    //Autocomplete
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    NgbModule,
  ],
  providers: [CountryApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
