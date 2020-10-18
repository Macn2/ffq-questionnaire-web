/*

  Added by Javier Romero
  This is the create/edit clinics page from the admin portal (admin/clinic).
  From here, the admin will create a clinic and define its attributes or edit an existing one.
  Existing clinics can also be deleted here.

*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
import { FFQClinician } from 'src/app/models/ffqclinician';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';
import { ClinicService } from 'src/app/services/clinic/clinic-service';
import { FFQClinic } from 'src/app/models/ffqclinic';
import { ParentService } from 'src/app/services/parent/parent-service';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from "src/app/components/delete-popup/delete-popup.component";


@Component({
  selector: 'app-fooditem',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {

  private routeSub: Subscription;
  private isNew: boolean;
  private isUpdate: boolean;
  showMsg: boolean = false;
  name_of_clinic: string;
  location: string;
  allClinicians: FFQClinician[] = [];
  resultObjectList: Object[] = [];

  constructor(
    public parentService: ParentService,
    public clinicianService: ClinicianService,
    private errorDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public clinicService: ClinicService,
    private modalService: NgbModal

    ) { }


  clinicians: FFQClinicianResponse[] = [];
  parents: FFQParentResponse[] = [];

  clinicAttributes: object;
  dataLoaded: Promise<boolean>;

  ffqclinic: FFQClinic;
  clinicnumber: number;
  clinic: number;

  public ffqclinicianList: FFQClinician[] = [];
  clinicianNames: string[] = [];


  ngOnInit() {

    this.clinicianNames.push("");

    const UserID = this.route.snapshot.paramMap.get('id');
    if (UserID == "new"){

      this.isNew = true;
      this.clinicnumber = this.clinic;
      this.dataLoaded = Promise.resolve(true);
    }
    else
    {
      this.isUpdate = true;
      this.getClinicById(UserID);
    }


    var clinicianList: Observable<FFQClinicianResponse[]> = this.clinicianService.getAllClinicians();
      clinicianList.subscribe(a => {
      this.ffqclinicianList = a;
      for (let i = 0; i < a.length; i++) {
        this.clinicianNames.push(a[i].abbreviation + " " + a[i].firstname + " " + a[i].lastname);
      }
    });

  }

  addClinic(form:NgForm){

    var clinicList: Observable<FFQClinicResponse[]> = this.clinicService.getAllClinics();

    clinicList.subscribe(data => {
      var newClinicId = (data.length+1).toString();
      this.ffqclinic = new FFQClinic(newClinicId, this.location, "", this.name_of_clinic, "", false);
      console.log(this.ffqclinic);

      this.clinicService.addClinic(this.ffqclinic).subscribe(data => {
          console.log("data: " + data);
          this.router.navigateByUrl('/admin/clinics');
          const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
          dialogRef.componentInstance.title = newClinicId + ' was added!';
      },
      error =>{
          const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
          dialogRef.componentInstance.title = error.error.message;
      });

    });
}

  private getClinicById(id: string)
  {
      this.clinicService.getClinic(id).subscribe(data => {
       this.clinicAttributes = data;
      });
      this.dataLoaded = Promise.resolve(true);
  }



  updateClinic()
  {
    this.clinicService.updateClinic(<FFQClinicResponse>this.clinicAttributes).subscribe(
     data => {this.router.navigateByUrl('/admin/clinics');
     const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
     dialogRef.componentInstance.title = 'Clinic successfully updated!';}

    );
  }

  deleteClinic(){
    const confirmDelete = this.modalService.open(DeletePopupComponent);
    confirmDelete.componentInstance.service = "Clinic";
    confirmDelete.componentInstance.attributes = this.clinicAttributes;
  }
}




