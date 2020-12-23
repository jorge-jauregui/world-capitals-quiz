import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { DestroyerComponent } from './destroyer/destroyer.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'destroyer', component: DestroyerComponent },
  { path: 'search', component: SearchComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)],
  ],
  exports: [
    [RouterModule],
  ],
})
export class AppRoutingModule { }
