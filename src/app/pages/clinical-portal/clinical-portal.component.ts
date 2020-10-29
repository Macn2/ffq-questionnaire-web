/*

  Added by Javier Romero, edited by Khalid Alamoudi
  This is the home page of the clinician portal (clinic/home).
  It serves as the users page, where all parents and clinicians of that clinic can be seen and edited.

*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FFQClinician } from 'src/app/models/ffqclinician';
import { FFQParent } from 'src/app/models/ffqparent';
import { FFQClinic } from 'src/app/models/ffqclinic';
import { ParentService } from 'src/app/services/parent/parent-service';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';
import { ClinicService } from 'src/app/services/clinic/clinic-service';
import { Observable } from 'rxjs';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';
import { PatientPipe } from 'src/app/pipes/patientFilter.pipe';
import { SearchPipe } from 'src/app/pipes/searchFilter.pipe';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin/admin-service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-clinical-portal',
  templateUrl: './clinical-portal.component.html',
  styleUrls: ['./clinical-portal.component.css']
})

export class ClinicalPortalComponent implements OnInit  {

  public showClinicians: boolean;
  public showParents: boolean;
  public showClinics: boolean;
  private hideUnassignedParents: boolean;
  private hideUnassignedClinicians: boolean;
  p_search: string;
  c_search: string;

  constructor(
    public parentService: ParentService,
    public clinicianService: ClinicianService,
    public clinicService: ClinicService,
    public adminService: AdminService,
    public authenticationService: AuthenticationService,
    private errorDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      this.authenticationService = authenticationService;
     }

  ffqclinicianList: FFQClinician[] = [];
  ffqparentList: FFQParent[] = [];
  ffqclinicList: FFQClinic[] = [];
  clinicNames: string[] = [];
  clinicianNames: string[] = [];
  numberOfPatients: number[] = [];
  public filtered_clinicians: String[] = [];
  public filtered: boolean;
  private clinicId: string;
  private clinicianList: FFQClinician[] = [];
  private parentList: FFQParent[] = [];
  private clinicList: FFQClinic[] = [];
  private numberOfPatientz: number[] = [];
  private numberOfChildren: number[] = [];
  public currentClinicName: string;

  public UserList: User[];

  ngOnInit() {

    this.showClinicians = true;
    this.showClinics = true;
    this.showParents = true;
    this.hideUnassignedParents = false;
    this.hideUnassignedClinicians = false;

    this.clinicianNames.push("");

    this.getClinicId();
  }

  toggleClinicians($event)
  {
    this.showClinicians = !this.showClinicians;
  }

  toggleClinics($event)
  {
    this.showClinics = !this.showClinics;
  }

  toggleParents($event)
  {
    this.showParents = !this.showParents;
  }

  toggleUnassignedParents($event)
  {
    this.hideUnassignedParents = !this.hideUnassignedParents;
  }

  toggleUnassignedClinicians($event)
  {
    this.hideUnassignedClinicians = !this.hideUnassignedClinicians;
  }

  filterByClinician(clinician_name: string)
  {
    const index = this.filtered_clinicians.indexOf(clinician_name);
    if(index === -1)
    {
      this.filtered_clinicians.push(clinician_name);
    }
    else
    {
      this.filtered_clinicians.splice(index, 1);
    }
    if(this.filtered_clinicians.length == 0)
    {
      this.filtered = false;
    }
    else
    {
      this.filtered = true;
    }
  }

  private getClinicId(){

    var clinicListObervable: Observable<FFQClinicResponse[]> = this.clinicService.getAllClinics();
    const loggedInUser = this.authenticationService.currentUserValue;
    var clinicId: string;

    console.log("Logged in user clinic: " + loggedInUser[0].assignedclinic);
    clinicListObervable.subscribe(clinicList => {
      var clinic = clinicList.find(a => a.clinicId == loggedInUser[0].assignedclinic);
      if(clinic){
        this.clinicId = clinic.clinicId;
        this.currentClinicName = clinic.clinicname;
      }
      this.getParents();
    });

  }

    //loadData function serves to store the result and parent names into the FFQParentResult object
    //                  serves to display the questionnaire-result data using the specification based on PO's list
  loadData(){
    var clinicianListObservable: Observable<FFQClinicianResponse[]> = this.clinicianService.getAllClinicians();
    var parentListObservable: Observable<FFQParentResponse[]> = this.parentService.getAllParents();

    clinicianListObservable.subscribe(clinicianList => {
      parentListObservable.subscribe(parentList => {
        clinicianList.forEach(clinician => {
          var count = 0;
          if(clinician.assignedclinic == this.clinicId){
            this.clinicianList.push(clinician);
          }
        });

        this.getNumberOfPatients();
        this.getClinicianNames();
        this.getClinics();
        });
      });

  }

  getParents(){
    var parentListObservable: Observable<FFQParentResponse[]> = this.parentService.getAllParents();
    var parentInClinic: FFQParent[];

    parentListObservable.subscribe(parentList => {
      parentList.forEach(parent => {
        if(parent.assignedclinic == this.clinicId){
          this.parentList.push(parent);
        }
      });
      this.loadData();
    });
  }

  getNumberOfPatients(){

    this.clinicianList.forEach(clinician => {
      var count = 0;
      this.parentList.forEach(parent => {
        if(parent.assignedclinician == clinician.userId){
          count++;
        }
      });
      this.numberOfPatients.push(count);
      console.log("clinicianNames in function");
      console.log(this.clinicianNames);
    });
  }

  getClinicianNames(){
    var clinicianList: Observable<FFQClinicianResponse[]> = this.clinicianService.getAllClinicians();
      clinicianList.subscribe(a => {
      this.ffqclinicianList = a;
      for (let i = 0; i < a.length; i++) {
        this.clinicianNames.push(a[i].abbreviation + " " + a[i].firstname + " " + a[i].lastname);
      }
    });
  }

  private getClinics(){

    var clinicListObervable: Observable<FFQClinicResponse[]> = this.clinicService.getAllClinics();
    const loggedInUser = this.authenticationService.currentUserValue;
    var clinicId: string;

    clinicListObervable.subscribe(clinicList => {
      clinicList.forEach(clinic => {
        if(clinic.clinicId == this.clinicId) {
          this.clinicList.push(clinic)
        }
        
      })

    });

  }

}

