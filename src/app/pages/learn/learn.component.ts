import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {

  constructor(private readonly router: Router) {
    this.router.navigateByUrl('/dashboard');
  }

  ngOnInit(): void {
  }

}
