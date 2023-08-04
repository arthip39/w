import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineesettingComponent } from './traineesetting.component';

describe('TraineesettingComponent', () => {
  let component: TraineesettingComponent;
  let fixture: ComponentFixture<TraineesettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineesettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineesettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
