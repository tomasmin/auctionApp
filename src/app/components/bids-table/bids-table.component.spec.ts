import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidsTableComponent } from './bids-table.component';

describe('BidsTableComponent', () => {
  let component: BidsTableComponent;
  let fixture: ComponentFixture<BidsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
