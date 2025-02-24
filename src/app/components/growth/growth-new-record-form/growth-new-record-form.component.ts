import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Gender, LbUnitsOfMeasurement, UnitsOfMeasurement } from "src/app/models/Enums";
import { FFQChildren } from "src/app/models/ffqchildren";
import { GrowthService } from "src/app/services/growth/growth-service";

@Component({
  selector: "growth-new-record-form",
  templateUrl: "./growth-new-record-form.component.html",
  styleUrls: ["./growth-new-record-form.component.css"],
})
export class GrowthNewRecordFormComponent implements OnInit {
  @Input() isParticipant: boolean = false;
  weightUnitOptions: UnitsOfMeasurement = UnitsOfMeasurement.kg;
  heightUnitOptions: UnitsOfMeasurement = UnitsOfMeasurement.cm;
  gender: Gender = Gender.NotAssigned;
  height: string = "";
  weight: string = "";
  ounces: string = "";
  age: string = "";
  // constant to validate the max and min values allowed
  readonly MAX_AGE_MONTHS = 24;
  readonly MIN_AGE_MONTHS = 0;
  // these are mutable depends on the units of measurements, by default they are in metric system.
  MAX_HEIGHT = 110;
  MIN_HEIGHT = 40;
  MAX_WEIGHT = 30;
  MIN_WEIGHT = 1;

  constructor(
    private growthService: GrowthService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  getStandardUnitValue(value, unit, ounces = "0") {
    if (unit === UnitsOfMeasurement.lb) {
      return Math.round(((parseFloat(value) + parseFloat(ounces) / 16) / FFQChildren.KG_TO_LB) * 100) / 100;
    }
    if (unit === UnitsOfMeasurement.in)
      return Math.round(parseFloat(value) * FFQChildren.IN_TO_CM * 100) / 100;
    return value;
  }

  onSubmitNewRecord(childInformationForm: NgForm): void {
    if (!childInformationForm.valid) return;
    const data = {
      gender: this.gender,
      weight: this.getStandardUnitValue(this.weight, this.weightUnitOptions, this.ounces),
      height: this.getStandardUnitValue(this.height, this.heightUnitOptions, this.ounces),
      age: Number(this.age),
      timestamp: new Date(),
    };

    this.growthService.addRecord(data, this.isParticipant);
    const { gender } = this;
    childInformationForm.resetForm();
    childInformationForm.form.patchValue({
      genderControl: gender,
    });
    this.changeDetector.detectChanges();
  }
  onGenderChange(): void {
    this.growthService.changeGender(this.gender);
  }
  onHeightUnitChange(newUnit: UnitsOfMeasurement): void {
    this.heightUnitOptions = newUnit;
    if (newUnit === UnitsOfMeasurement.cm) {
      this.MAX_HEIGHT = 110;
      this.MIN_HEIGHT = 40;
    } else if (newUnit === UnitsOfMeasurement.in) {
      this.MAX_HEIGHT = Math.round(110 / FFQChildren.IN_TO_CM);
      this.MIN_HEIGHT = Math.round(40 / FFQChildren.IN_TO_CM);
    }
  }
  onWeightUnitChange(newUnit: UnitsOfMeasurement): void {
    this.weightUnitOptions = newUnit;
    if (newUnit === UnitsOfMeasurement.kg) {
      this.MAX_WEIGHT = 30;
      this.MIN_WEIGHT = 1;
    } else if (newUnit === UnitsOfMeasurement.lb) {
      this.MAX_WEIGHT = Math.round(30 * FFQChildren.KG_TO_LB);
      this.MIN_WEIGHT = Math.round(1 * FFQChildren.KG_TO_LB);
    }
  }
  onUnitsChange(): void {
    if (this.heightUnitOptions === UnitsOfMeasurement.cm) {
      this.MAX_HEIGHT = 110;
      this.MIN_HEIGHT = 40;
    }
    if (this.weightUnitOptions === UnitsOfMeasurement.kg) {
      this.MAX_WEIGHT = 30;
      this.MIN_WEIGHT = 1;
    }
    if (this.weightUnitOptions === UnitsOfMeasurement.lb) {
      this.MAX_WEIGHT = Math.round(30 * FFQChildren.KG_TO_LB);
      this.MIN_WEIGHT = Math.round(1 * FFQChildren.KG_TO_LB);
    }
    if (this.heightUnitOptions === UnitsOfMeasurement.in) {
      this.MAX_HEIGHT = Math.round(110 / FFQChildren.IN_TO_CM);
      this.MIN_HEIGHT = Math.round(40 / FFQChildren.IN_TO_CM);
    }
  }
}
