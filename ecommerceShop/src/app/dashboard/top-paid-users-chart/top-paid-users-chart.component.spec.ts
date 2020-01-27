import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPaidUsersChartComponent } from './top-paid-users-chart.component';

describe('TopPaidUsersChartComponent', () => {
  let component: TopPaidUsersChartComponent;
  let fixture: ComponentFixture<TopPaidUsersChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopPaidUsersChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPaidUsersChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
