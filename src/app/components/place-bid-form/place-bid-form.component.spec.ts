import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PlaceBidFormComponent } from './place-bid-form.component';

describe('PlaceBidFormComponent', () => {
  let component: PlaceBidFormComponent;
  let fixture: ComponentFixture<PlaceBidFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaceBidFormComponent],
      imports: [ReactiveFormsModule, HttpClientModule, MatSnackBarModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceBidFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
