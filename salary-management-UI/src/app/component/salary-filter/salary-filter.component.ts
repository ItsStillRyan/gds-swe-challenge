import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './salary-filter.component.html',
  styleUrls: ['./salary-filter.component.css'],
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

  @Output() filterApplied = new EventEmitter<{ minimum: number, maximum: number }>();

  applyFilter() {
    console.log(this.maximum.value, this.minimum.value)
    if (this.minimum.value !== null || this.maximum.value !== null) {
      this.filterApplied.emit({ minimum: this.minimum.value, maximum: this.maximum.value });
    }
  }
}
