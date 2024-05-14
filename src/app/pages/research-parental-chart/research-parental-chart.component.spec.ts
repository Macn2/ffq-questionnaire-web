import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ResearchParentalChartComponent } from "./research-parental-chart.component";

describe("ResearchParentalChartComponent", () => {
  let component: ResearchParentalChartComponent;
  let fixture: ComponentFixture<ResearchParentalChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResearchParentalChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchParentalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
