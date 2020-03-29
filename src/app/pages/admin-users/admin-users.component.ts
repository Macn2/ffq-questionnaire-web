import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FoodItemService } from '../../services/food-item/food-item.service';
import { FFQItem } from 'src/app/models/ffqitem';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { FFQFoodNutrientsResponse } from 'src/app/models/ffqfoodnutrients-response';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { FlashMessagesService } from 'angular2-flash-messages';

import { FFQFoodItem } from 'src/app/models/ffqfooditem';
import { FFQFoodItemResponse } from 'src/app/models/ffqfooditem-response';
import { UserService } from 'src/app/services/user/user-service';
import { FFQUserResponse } from 'src/app/models/ffquser-response';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';
import { ParentService } from 'src/app/services/parent/parent-service';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';


@Component({
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})

export class AdminUsersComponent implements OnInit {

  TITLE = 'FFQR Admin Portal';


  constructor(
    public userService: UserService,
    public clinicianService: ClinicianService,
    public parentService: ParentService,
    private activatedRoute: ActivatedRoute,
    private errorDialog: MatDialog,
    private submissionErrorDialog: MatDialog,
    private httpErrorDialog: MatDialog,
    private successDialog: MatDialog,
    private router: Router,
    private modalService: NgbModal,
    private flashMessage: FlashMessagesService,

  ) { }


  foodNutrients: FFQFoodNutrientsResponse[] = [];
  dataLoaded: Promise<boolean>;

  users: FFQUserResponse[] = [];
  clinicians: FFQClinicianResponse[] = [];
  parents: FFQParentResponse[] = [];


  ngOnInit() {
    this.loadUsersForTest();
    console.log(this.foodNutrients);

  }

  private handleFoodServiceError(error: HttpErrorResponse) {
    console.error('Error occurred.\n' + error.message);
    const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
    dialogRef.componentInstance.title = 'Error Fetching Food Items';
    dialogRef.componentInstance.message = error.message;
    dialogRef.componentInstance.router = this.router;
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

  private loadUsersForTest() {
    this.clinicianService.getAllClinicians().subscribe(data => {
      data.map(response => {
        this.clinicians.push(response);
        //this.foodNutrients.push(response);
      });
      console.log(this.clinicians);
   //   console.log(this.foodNutrients.length + ' foods and its nutrients were returned from server.');
      this.dataLoaded = Promise.resolve(true);
    }, (error: HttpErrorResponse) => this.handleFoodServiceError(error));
  }


  onModalRequest(id: string): void {
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.service = this.userService;
    
  }
  

}