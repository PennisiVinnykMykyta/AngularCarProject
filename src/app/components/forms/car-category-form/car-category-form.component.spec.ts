import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCategoryFormComponent } from './car-category-form.component';

describe('CarCategoryFormComponent', () => {
  let component: CarCategoryFormComponent;
  let fixture: ComponentFixture<CarCategoryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarCategoryFormComponent]
    });
    fixture = TestBed.createComponent(CarCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
