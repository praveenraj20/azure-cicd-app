import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  _selection: TSelection = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        filter(e => !!e && !!e?.selection),
        first()
      ).subscribe((e) => {
        this._selection = ['partner', 'owner', 'seeker'].includes(e?.selection) ? e?.selection : '';
      });
  }

  selection(j: TSelection): void {
    this._selection = j;
    this.router.navigate(['/register'], { queryParams: { selection: j } }).then(() => { })
  }
}

type TSelection = 'partner' | 'owner' | 'seeker' | '';
