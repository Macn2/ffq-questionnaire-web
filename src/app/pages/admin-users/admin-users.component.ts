import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FoodItemService } from '../../services/food-item/food-item.service';
import { FFQItem } from 'src/app/models/ffqitem';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
//import { FFQFoodNutrientsResponse } from 'src/app/models/ffqfoodnutrients-response';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { FlashMessagesService } from 'angular2-flash-messages';

import { FFQFoodItem } from 'src/app/models/ffqfooditem';
import { FFQFoodItemResponse } from 'src/app/models/ffqfooditem-response';

//test;
import { FFQClinician } from 'src/app/models/ffqclinician';
import { FFQParent } from 'src/app/models/ffqparent';
import { FFQAdmin } from 'src/app/models/ffqadmin';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
import { ParentService } from 'src/app/services/parent/parent-service';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';
import { Observable, BehaviorSubject } from 'rxjs';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';
import { FFQAdminResponse } from 'src/app/models/ffqadmin-response';
import { ClinicService } from 'src/app/services/clinic/clinic-service';
import { AdminService } from 'src/app/services/admin/admin-service';
import { FFQClinic } from 'src/app/models/ffqclinic';
import { SearchPipe } from 'src/app/pipes/searchFilter.pipe';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})

export class AdminUsersComponent implements OnInit {

  private showParents: boolean;
  private showClinicians: boolean;
  private showAdmins: boolean;

  search: string;

  constructor(
    public parentService: ParentService,
    public clinicianService: ClinicianService,
    public clinicService: ClinicService,
    public adminService: AdminService,
    public authenticationService: AuthenticationService
    
    ) { }


  ffqclinicianList: FFQClinician[] = [];
  ffqparentList: FFQParent[] = [];
  ffqclinicList: FFQClinic[] = [];
  ffqadminList: FFQAdmin[] = [];
  clinicianClinicNames: string[] = [];
  parentClinicNames: string[] = [];
  clinicNames: string[] = [];
  public filtered: boolean;
  public filtered_clinics: String[] = [];
  checked_users: string[] = [];

  ngOnInit() {

    //console.log(this.authenticationService.currentUserValue[0]);
    this.clinicNames.push("");
    this.showParents = true;
    this.showClinicians = true;
    this.showAdmins = true;
    this.filtered = false;
    this.loadAllUsers();
  }

  checkedUsers(username: string)
  {
    const index = this.checked_users.indexOf(username);
    if(index === -1)
    {
      this.checked_users.push(username);
    }
    else
    {
      this.checked_users.splice(index, 1);
    }
    console.log(this.checked_users);
  }
  
  toggleParents()
  {
    this.showParents = !this.showParents;
  }

  toggleClinicians()
  {
    this.showClinicians = !this.showClinicians;
  }

  toggleAdmins()
  {
    this.showAdmins = !this.showAdmins;
  }

  filterByClinic(clinic_name: string)
  {
    const index = this.filtered_clinics.indexOf(clinic_name);
    if(index === -1)
    {
      this.filtered_clinics.push(clinic_name);
    }
    else
    {
      this.filtered_clinics.splice(index, 1);
    }
    if(this.filtered_clinics.length == 0)
    {
      this.filtered = false;
    }
    else
    {
      this.filtered = true;
    }
  }

  private loadAllUsers() {
    var clinicianList: Observable<FFQClinicianResponse[]> = this.clinicianService.getAllClinicians();
    var parentList: Observable<FFQParentResponse[]> = this.parentService.getAllParents();
    var clinicList: Observable<FFQClinicResponse[]> = this.clinicService.getAllClinics();
    var adminList: Observable<FFQAdminResponse[]> = this.adminService.getAllUsers();


    clinicList.subscribe(a => {
      this.ffqclinicList = a;
      console.log(a);
      a.forEach(clinic =>{
        
        this.clinicNames.push(clinic.clinicname);
      });

       clinicianList.subscribe(b => {
         this.ffqclinicianList = b;
         //console.log(a);

         b.forEach(clinician =>  {
          //Code below to get the assigned clinic for each clinician
          console.log(clinician);
          
          var clinicianClinic = a.find(n => n.clinicId == clinician.assignedclinic);
          
          if(!!clinicianClinic){
            var clinicianClinicName = clinicianClinic.clinicname;
            this.clinicianClinicNames.push(clinicianClinicName);
          }
       //   this.clinicianClinicNames.push(clinicianClinicName);

        });
        console.log(this.clinicianClinicNames);

          parentList.subscribe(c => {
          this.ffqparentList = c;
          //console.log(a);
          
          c.forEach(parent => {
            var clinicians = b.find(n => n.userId == parent.assignedclinic);
            
            if(!!clinicians){
              var parentClinic = a.find(n => n.clinicId == clinicians.assignedclinic);
              if(!!parentClinic){
                var parentClinicName = parentClinic.clinicname;
              }
            }
            this.parentClinicNames.push(parentClinicName);
          });    
          });
       });
    });

    adminList.subscribe(a => {
      this.ffqadminList = a;
    });
  }
}