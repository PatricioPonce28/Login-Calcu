import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalcuPage } from './calcu.page';

describe('CalcuPage', () => {
  let component: CalcuPage;
  let fixture: ComponentFixture<CalcuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
