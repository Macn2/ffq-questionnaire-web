/*

  Added by Javier Romero
  This is the create/edit user page for the admin portal
  (admin/user, which differs from admin/users, which is the list all users page).
  From here, the admin will create users or edit existing ones.
  Users can also be deleted from the databases from here.

*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ParentService } from 'src/app/services/parent/parent-service';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
import { FFQParent } from 'src/app/models/ffqparent';
import { FFQClinician } from 'src/app/models/ffqclinician';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';
import { ClinicService } from 'src/app/services/clinic/clinic-service';
import { FFQClinic } from 'src/app/models/ffqclinic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from 'src/app/components/delete-popup/delete-popup.component';
import {Usertype} from '../../models/usertype.enum';

@Component({
  selector: 'app-new-clinic',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  isNew: boolean;
  isUpdate: boolean;
  private createParents: boolean;
  private createClinician: boolean;
  private createResearcher: boolean;
  showMsg: boolean = false;
  selectedClinic: string;
  selectedClinician: string;
  cliniciansLimit: number;
  parentsLimit: number;
  numClinician: number;
  numParents: number;
  parentLimitForClinician: number;
  prefix: string;
  able2AddClinicians: number;
  able2AddParents: number;
  userType: Usertype;
  userTypes = Usertype;
  ffqParent: FFQParent;
  public ffqclinicList$: Observable<FFQClinic[]>;
  public ffqclinicianList$: Observable<FFQClinician[]>;
  usersQuantity = 1;
  userId: string;
  lastUserId;
  suffix;
  userPassword: string;
  dissabled = false;
  clinicianName: string;
  clinicName: string;
  newClinicians = [];
  data = [];
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [],
    showTitle: true,
    title: 'Clinician Login',
    titles: 'User Info',
    useBom: false,
    removeNewLines: true,
    keys: ['userName', 'password' ]
  };

  constructor(
    public parentService: ParentService,
    public clinicianService: ClinicianService,
    private errorDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public clinicService: ClinicService,

    private modalService: NgbModal


    ) {
    this.ffqclinicList$ = this.clinicService.getAllClinics();
    this.ffqclinicianList$ = this.clinicianService.getAllClinicians();

  }

  userAttributes: FFQClinician | FFQParent;
  dataLoaded: Promise<boolean>;

  ffqclinician: FFQClinician;
  amountToAdd: number;
  isParent: boolean;
  isClinician: boolean;
  isProcessing: boolean;

  public ffqclinicList: FFQClinic[] = [];
  public ffqclinicianList: FFQClinician[] = [];
  public ffqparentList: FFQParent[] = [];
  clinicNames: string[] = [];
  clinicIds: Map<string, string> = new Map<string, string>();
  clinicId: string;

  ngOnInit() {

    this.isProcessing = false;
    this.createParents = false;
    this.createClinician = false;
    this.createResearcher = false;
    this.isParent = false;
    this.isClinician = false;
    this.clinicNames.push('');

    const UserType = this.route.snapshot.paramMap.get('type');
    const UserID = this.route.snapshot.paramMap.get('id');

    if (UserID === 'new')
    {
      this.isNew = true;
      this.dataLoaded = Promise.resolve(true);
    }
    else
    {
      this.isUpdate = true;
      if (UserType === 'p')
      {
        this.getParentByID(UserID);
      }
      else
      {
        this.getClinicianByID(UserID);
      }
    }

    const clinicListObservable: Observable<FFQClinicResponse[]> = this.clinicService.getAllClinics();
    clinicListObservable.subscribe(clinicList => {
      this.ffqclinicList = clinicList;
      clinicList.forEach(clinic => {
        this.clinicIds.set(clinic.clinicname, clinic.clinicId);
        this.clinicNames.push(clinic.clinicname);
      });
    });

    const parentList: Observable<FFQParentResponse[]> = this.parentService.getAllParents();
    parentList.subscribe(a => {
      this.ffqparentList = a;
    });

    const clinicianList: Observable<FFQClinicianResponse[]> = this.clinicianService.getAllClinicians();
    clinicianList.subscribe(a => {
      this.ffqclinicianList = a;
    });
  }

  selectChangeHandler(event: any)
  {
    this.numClinician = 0;
    this.numParents = 0;
    this.able2AddClinicians = 0;
    this.able2AddParents = 0;
    this.clinicId = event.value;
    for (const item of this.ffqclinicList) {
      if (this.clinicId === item.clinicId)
      {
        this.cliniciansLimit = item.cliniciansLimit;
        this.parentsLimit = item.parentsLimit;
        this.clinicName = item.clinicname;
      }
    }

    for (let i = 0; i < this.ffqclinicianList.length; i++){
      if (this.clinicId === this.ffqclinicianList[i].assignedclinic){
        this.numClinician += 1;
      }
    }

    for (let i = 0; i < this.ffqparentList.length; i++){
      if (this.clinicId === this.ffqparentList[i].assignedclinic){
        this.numParents += 1;
      }
    }
    if ((this.cliniciansLimit === 0) || (this.numClinician > this.cliniciansLimit) ){
      this.able2AddClinicians = 0;
    }
    else{
      this.able2AddClinicians = this.cliniciansLimit - this.numClinician;
    }
    if (this.parentsLimit === 0){
      this.able2AddParents = 0;
    }
    else{
      this.able2AddParents = this.parentsLimit - this.numParents;
    }
  }

  getSuffix(){
    if (this.ffqclinicianList.length === 0){
      this.suffix = 1;
    } else {
      this.lastUserId = this.ffqclinicianList[this.ffqclinicianList.length - 1].userId;
      this.suffix = parseInt(this.lastUserId, 10) + 1;
    }}

  addUser() {

    switch (this.userType) {
      case Usertype.Clinician: {
        if (this.usersQuantity === 1) {
          this.addClinician();
        } else {
          this.addMultipleClinicians();
        }
        break;
      }
      case Usertype.Parent: {
        console.log(this.selectedClinician);
        if (this.usersQuantity === 1) {
          if (this.selectedClinician === undefined){
            this.addParent();
          }else{
            this.addParent2AssignCli();
          }

        } else {
          if (this.selectedClinician === undefined){
            this.addMultipleParents();
          }else{
            this.addMultipleParents2assign();
          }
          console.log('adding multiple clinicians');
        }
        break;
      }
    }
  }
  dataLoop(){
    for (let i = 0; i < 6; i++){
      this.data[i] = [
        {
          userName: '',
          password: ''
        },
      ];
    }
  }
  save2csvSingleClinician() {
    this.dataLoop();
    this.data[0].userName = 'Assingned clinic: ';
    this.data[0].password = this.clinicName;
    this.data[1].userName = 'Assingned clinic ID: ';
    this.data[1].password = this.selectedClinic;
    this.data[2].userName = '';
    this.data[2].password = '';
    this.data[3].userName = 'User Name';
    this.data[3].password = 'Password';
    this.data[4].userName = '';
    this.data[4].password = '';
    this.data[5].userName = this.clinicianName;
    this.data[5].password = this.userPassword;
  }

  addClinician() {
    this.getSuffix();
    this.generatePasswordCreation();
    this.prefix = this.prefix.replace(/\s/g, '');
    this.clinicianName = this.prefix + 'Clinician' +  this.suffix.toString();

    const ffqclinician = new FFQClinician('', this.clinicianName, this.userPassword, '', '', '', this.selectedClinic, [], true, this.parentLimitForClinician, this.prefix);

    this.clinicianService.addClinician(ffqclinician).subscribe(clinician => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        // this.router.navigateByUrl('/admin/users');
        dialogRef.componentInstance.title = clinician.username + ' was added!';
        this.save2csvSingleClinician();
        this.dissabled = true;
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
      });
      this.isProcessing = false;
  }

  dataLoopMultiple() {
    for (let i = 0; i < this.newClinicians.length + 5; i++) {
      this.data[i] = [
        {
          userName: '',
          password: ''
        },
      ];
    }
  }
  save2csvMultipleClinician() {
    this.dataLoopMultiple();
    this.data[0].userName = 'Assingned clinic: ';
    this.data[0].password = this.clinicName;
    this.data[1].userName = 'Assingned clinic ID: ';
    this.data[1].password = this.selectedClinic;
    this.data[2].userName = '';
    this.data[2].password = '';
    this.data[3].userName = 'User Name';
    this.data[3].password = 'Password';
    this.data[4].userName = '';
    this.data[4].password = '';

    for (let i = 0; i < this.newClinicians.length; i++){
      this.data[i + 5].userName = this.newClinicians[i].username;
      this.data[i + 5].password = this.newClinicians[i].userpassword;
    }
  }

  addMultipleClinicians() {
    this.getSuffix();
    this.prefix = this.prefix.replace(/\s/g, '');
    // this.clinicianName = this.prefix + 'Clinician' +  this.suffix.toString();
    for (let i = 0; i < this.usersQuantity; i++) {
      this.generatePasswordCreation();
      this.clinicianName = this.prefix + 'Clinician' +  this.suffix.toString();
      this.newClinicians.push(new FFQClinician('', this.clinicianName, this.userPassword, '', '', '', this.selectedClinic, [], true, this.parentLimitForClinician, this.prefix));
      this.suffix++;
    }

    this.clinicianService.addMultipleClinicians(this.newClinicians).subscribe(clinicians => {
        // this.router.navigateByUrl('/admin/users');
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = clinicians.map(clinician => clinician.username).join('<br/>') + '<br/>were added!';
        this.save2csvMultipleClinician();
        this.dissabled = true;
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
      });
  }

  addParent() {
    this.ffqParent = new FFQParent('', '', '', 'parent', '', '', this.selectedClinic, '', [''], true);
    console.log(this.ffqParent);

    this.parentService.addParent(this.ffqParent).subscribe(parent => {
        this.router.navigateByUrl('/admin/users');
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        // this.router.navigateByUrl('/admin/user/new');
        dialogRef.componentInstance.title = parent.username + ' was added!';
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
      });
  }

  addParent2AssignCli() {
    this.ffqParent = new FFQParent('', '', '', 'parent', '', '', this.selectedClinic, this.selectedClinician, [''], true);
    console.log(this.ffqParent);

    this.parentService.addParent(this.ffqParent).subscribe(parent => {
        this.router.navigateByUrl('/admin/users');
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        // this.router.navigateByUrl('/admin/user/new');
        dialogRef.componentInstance.title = parent.username + ' was added!';
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
      });
  }

   addMultipleParents() {
    const newParents = [];
    for (let i = 0; i < this.usersQuantity; i++) {
      newParents.push(new FFQParent('', '', '', 'parent', '', '', this.selectedClinic, '', [''], true));
    }

    this.parentService.addMultipleParents(newParents).subscribe(clinicians => {
        this.router.navigateByUrl('/admin/users');
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = clinicians.map(clinician => clinician.username).join('<br/>') + '<br/>were added!';
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
      });
  }

  addMultipleParents2assign() {
    const newParents = [];
    for (let i = 0; i < this.usersQuantity; i++) {
      newParents.push(new FFQParent('', '', '', 'parent', '', '', this.selectedClinic, this.selectedClinician, [''], true));
    }

    this.parentService.addMultipleParents(newParents).subscribe(clinicians => {
        this.router.navigateByUrl('/admin/users');
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = clinicians.map(clinician => clinician.username).join('<br/>') + '<br/>were added!';
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
      });
  }


  getParentByID(id: string)
  {
    this.isParent = true;
    this.parentService.getParent(id).subscribe(data => {
       this.userAttributes = data;
    });
    this.dataLoaded = Promise.resolve(true);
  }

  getClinicianByID(id: string)
  {
    this.isClinician = true;
    this.clinicianService.getClinician(id).subscribe(data => {
      this.userAttributes = data;
    });
    this.dataLoaded = Promise.resolve(true);
  }

  updateUser()
  {
    if (this.isParent)
    {
      this.updateParent();
    }
    else
    {
      this.updateClinician();
    }
  }

  updateParent()
  {
    this.parentService.updateParent(this.userAttributes as FFQParentResponse).subscribe(
     data => {this.router.navigateByUrl('/admin/users');
              const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
              dialogRef.componentInstance.title = 'Parent successfully updated!'; }
    );
  }

  updateClinician()
  {
    this.clinicianService.updateClinician(this.userAttributes as FFQClinicianResponse)
      .subscribe( data => {
        this.router.navigateByUrl('/admin/users');
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = 'Clinician successfully updated!';
      });
  }


  deleteUser(){
    if (this.isParent)
    {
      this.deleteParent();
    }
    else
    {
      this.deleteClinician();
    }
  }

  deleteParent(){
    const confirmDelete = this.modalService.open(DeletePopupComponent);
    confirmDelete.componentInstance.service = 'Parent';
    confirmDelete.componentInstance.attributes = this.userAttributes;
  }

  deleteClinician(){
    const confirmDelete = this.modalService.open(DeletePopupComponent);
    confirmDelete.componentInstance.service = 'Clinician';
    confirmDelete.componentInstance.attributes = this.userAttributes;
  }

  generatePasswordCreation() {
    this.userPassword = Math.random().toString(36).slice(-10);
  }
  generatePassword() {
    this.userAttributes.userpassword = Math.random().toString(36).slice(-10);
  }
}

