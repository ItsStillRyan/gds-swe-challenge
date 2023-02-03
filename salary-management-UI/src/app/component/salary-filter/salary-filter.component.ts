import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  template: `
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        Filter
      </mat-expansion-panel-header>

      <div class="nested-filter-container">
        <p>By Salary range:</p>

        <mat-form-field>
          <input matInput placeholder="Minimum" formControlName="minimum" />
        </mat-form-field>

        <p>to</p>

        <mat-form-field>
          <input matInput placeholder="Maximum" formControlName="maximum" />
        </mat-form-field>

        <button
          mat-raised-button
          class="nested-filter-button"
          (click)="applyFilter()"
        >
          Submit
        </button>

        <p *ngIf="minimum.value === null && maximum.value === null">
          Minimum and maximum values are null.
        </p>
      </div>
    </mat-expansion-panel>
  `
})
export class SalaryFilterComponent {
  form = new FormGroup({
    minimum: new FormControl(null),
    maximum: new FormControl(null)
  });

  get minimum() {
    return this.form.get('minimum');
  }

  get maximum() {
    return this.form.get('maximum');
  }

  applyFilter() {
    console.log(this.form.value);

    if (this.minimum.value === null && this.maximum.value === null) {
      console.log("both null")
    }
  }
}
