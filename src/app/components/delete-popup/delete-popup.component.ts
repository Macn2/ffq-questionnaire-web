/*

    Added by Javier Romero
    Pop-up that prompts the user to confirm deletion of an object in the database.
    Added to prevent the accidental deletion of clinics,
    clinicians or parents from the database.

*/

import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogPopupComponent } from "../error-dialog-popup/error-dialog-popup.component";
import { FFQClinicianResponse } from "src/app/models/ffqclinician-response";
import { ClinicianService } from "src/app/services/clinician/clinician-service";
import { ParentService } from "src/app/services/parent/parent-service";
import { ClinicService } from "src/app/services/clinic/clinic-service";
import { FFQClinicResponse } from "src/app/models/ffqclinic-response";
import {ResearchService} from "src/app/services/research/research-service";
import {ResearchInstitutionService} from "src/app/services/research-institution-service/research-institution-service"
import {FFQResearchtResponse} from "src/app/models/ffqresearch-response";
import {FFQInstitutionResponse} from "src/app/models/ffqinstitution-response";


@Component({
  selector: "delete-popup",
  templateUrl: "./delete-popup.component.html",
  styleUrls: ["./delete-popup.component.css"],
})
export class DeletePopupComponent implements OnInit {
  // @Input attributes: the object and its attributes to be deleted
  // @Input service: the type of the object
  @Input() attributes;
  @Input() service;

  isParent: boolean = false;
  isClinician: boolean = false;
  isClinic: boolean = false;
  isResearch: boolean = false;
  isResearch_institution: boolean = false;

  ngOnInit() {
    if (this.service == "Clinician") this.isClinician = true;
    else if (this.service == "Parent") this.isParent = true;
    else if (this.service == "Clinic") this.isClinic = true;
    else if (this.service == "Researcher") this.isResearch = true;
    else if (this.service == "Research-institution") this.isResearch_institution = true;
  }

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private errorDialog: MatDialog,
    public clinicianService: ClinicianService,
    public parentService: ParentService,
    public clinicService: ClinicService,
    public researchService: ResearchService,
    public researchInstitutionService: ResearchInstitutionService
  ) {}

  /* When confirmed deletion, this function does the delete action on the object based on its type */
  onClose(): void {
    if (this.isClinician) {
      var userName = (<FFQClinicianResponse>this.attributes).username;
      this.clinicianService
        .deleteItem((<FFQClinicianResponse>this.attributes).userId)
        .subscribe((user) => {
          this.router.navigateByUrl("/admin/users");
          const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
          dialogRef.componentInstance.title =
            "Clinician " + userName + " was deleted";
        });
    } else if (this.isParent) {
      var userName = (<FFQClinicianResponse>this.attributes).username;
      this.parentService
        .deleteItem((<FFQClinicianResponse>this.attributes).userId)
        .subscribe((user) => {
          this.router.navigateByUrl("/admin/users");
          const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
          dialogRef.componentInstance.title =
            "Parent " + userName + " was deleted";
        });
    } else if (this.isClinic) {
      var clinicName = (<FFQClinicResponse>this.attributes).clinicname;
      this.clinicService
        .deleteItem((<FFQClinicResponse>this.attributes).clinicId)
        .subscribe((clinic) => {
          this.router.navigateByUrl("/admin/users");
          const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
          dialogRef.componentInstance.title =
            "Clinic " + clinicName + " was deleted";
        });
    }
    else if (this.isResearch) {
      var researchName = (<FFQResearchtResponse>this.attributes).username;
      this.researchService
        .deleteItem((<FFQResearchtResponse>this.attributes).userId)
        .subscribe((data) => {
          this.router.navigateByUrl("/admin/research/users");
          const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
          dialogRef.componentInstance.title =
            "Researcher: " + researchName + " was deleted";
        });
    }
    else if (this.isResearch_institution) {
      
      var researchInstitutionName = (<FFQInstitutionResponse>this.attributes).institutionName;
     
      this.researchInstitutionService
        .deleteItem((<FFQInstitutionResponse>this.attributes).researchInstitutionId)
        .subscribe((data) => {
          this.router.navigateByUrl("/admin/research/users");
          const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
          dialogRef.componentInstance.title =
            "Research Institution: " + researchInstitutionName + " was deleted";
        });
    }
    
    this.activeModal.close("closed");
  }

  onDismiss(reason: String): void {
    this.activeModal.dismiss(reason);
  }
}
