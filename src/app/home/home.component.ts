import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private readonly route: Router) { }

  ngOnInit(): void {
  }

  navigateToStandard() {
    this.route.navigate(['quiz']);
  }

  navigateToDestroyer() {
    this.route.navigate(['destroyer']);
  }

  navigateToSearch() {
    this.route.navigate(['search']);
  }

}
