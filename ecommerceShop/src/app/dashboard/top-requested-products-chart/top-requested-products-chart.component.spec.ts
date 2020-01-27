import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRequestedProductsChartComponent } from './top-requested-products-chart.component';

describe('TopRequestedProductsChartComponent', () => {
  let component: TopRequestedProductsChartComponent;
  let fixture: ComponentFixture<TopRequestedProductsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopRequestedProductsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRequestedProductsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
