import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';

import { GrowthChartsPageComponent } from "./growth-charts-page.component";

describe("GrowthChartsPageComponent", () => {
  let component: GrowthChartsPageComponent;
  let fixture: ComponentFixture<GrowthChartsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrowthChartsPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthChartsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
