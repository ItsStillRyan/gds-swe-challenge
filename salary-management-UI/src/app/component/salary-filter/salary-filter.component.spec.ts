import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryFilterComponent } from './salary-filter.component';

describe('SalaryFilterComponent', () => {
  let component: SalaryFilterComponent;
  let fixture: ComponentFixture<SalaryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
