import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthNewRecordFormComponent } from './growth-new-record-form.component';

describe('GrowthNewRecordFormComponent', () => {
  let component: GrowthNewRecordFormComponent;
  let fixture: ComponentFixture<GrowthNewRecordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowthNewRecordFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthNewRecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
