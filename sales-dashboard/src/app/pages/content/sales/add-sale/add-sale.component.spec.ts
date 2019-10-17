import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSaleComponent } from './add-sale.component';

describe('AddSaleComponent', () => {
  let component: AddSaleComponent;
  let fixture: ComponentFixture<AddSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
