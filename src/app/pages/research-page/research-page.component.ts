/*

  Added by Ver 2.0 group, edited by Javier Romero to make it look more consistent with the rest of the pages.
  This is the first page of the admin portal (admin/home).
  Here you can see a list of all the food items in the database.
  The admin can create, edit or delete food items in this page.

*/

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FoodItemService } from "../../services/food-item/food-item.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorDialogPopupComponent } from "src/app/components/error-dialog-popup/error-dialog-popup.component";
import { FFQFoodNutrientsResponse } from "src/app/models/ffqfoodnutrients-response";
import { PopupComponent } from "src/app/components/popup/popup.component";
import { FlashMessagesService } from "angular2-flash-messages";
import { FFQFoodItemResponse } from "src/app/models/ffqfooditem-response";
import { moveItemInArray } from "@angular/cdk/drag-drop";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-questionnaire-page",
  templateUrl: "./research-page.component.html",
  styleUrls: ["./research-page.component.css"],
})
export class ResearchPageComponent implements OnInit {
  TITLE = "FFQR Research Portal";

  endpoint = environment.foodServiceUrl + "/ffq";

  constructor(
    public foodService: FoodItemService,
    private activatedRoute: ActivatedRoute,
    private errorDialog: MatDialog,
    private submissionErrorDialog: MatDialog,
    private httpErrorDialog: MatDialog,
    private successDialog: MatDialog,
    private router: Router,
    private modalService: NgbModal,
    private flashMessage: FlashMessagesService,
    private http: HttpClient
  ) {}

  foodNutrients: FFQFoodNutrientsResponse[] = [];
  dataLoaded: Promise<boolean>;

  foodItems: FFQFoodItemResponse[] = [];

  ngOnInit() {
    this.loadFoodsAndNutrients();

    /*let i: any;

        for(i in this.foodItems){
          this.foodItems[i].itemPosition = ++i;
        }*/
  }

  private handleFoodServiceError(error: HttpErrorResponse) {
    console.error("Error occurred.\n" + error.message);
    const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
    dialogRef.componentInstance.title = "Error Fetching Food Items";
    dialogRef.componentInstance.message = error.message;
    dialogRef.componentInstance.router = this.router;
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl("/");
    });
  }

  private loadFoodsAndNutrients() {
    this.foodService.getAllFoods().subscribe(
      (data) => {
        data.map((response) => {
          this.foodItems.push(response);
          // this.foodNutrients.push(response);
        });
        console.log(this.foodItems);
        console.log(
          this.foodNutrients.length +
            " foods and its nutrients were returned from server."
        );
        this.foodItems = this.orderFoodItems(this.foodItems);
        this.dataLoaded = Promise.resolve(true);
      },
      (error: HttpErrorResponse) => this.handleFoodServiceError(error)
    );
  }
  //added by teriq douglas
  private orderFoodItems(items: FFQFoodItemResponse[]) {
    var orderedItems = items.sort(function (a, b) {
      return a.itemPosition - b.itemPosition;
    });
    return orderedItems;
  }

  onModalRequest(id: string): void {
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.service = this.foodService;
  }

  //added by teriq douglas
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.foodItems, event.previousIndex, event.currentIndex);
    let i: any;

    //update each food item with a new itemPosition
    for (i in this.foodItems) {
      this.foodItems[i].itemPosition = ++i;
    }
    //for loop with put calls for each element
    for (let i = 0; i < this.foodItems.length; i++) {
      this.update(i);
    }

    //or swap only 2 elements
    /*var temp = this.foodItems[event.previousIndex].itemPosition;
            this.foodItems[event.previousIndex].itemPosition = this.foodItems[event.currentIndex].itemPosition
            this.foodItems[event.currentIndex].itemPosition = temp;*/

    /*this.http.put(this.endpoint + '/update/' + this.foodItems[event.currentIndex].id, this.foodItems[event.currentIndex],
                      {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe((data) => {
                                    console.log(data);
                                  }, (error) => {console.log(error)});

    this.http.put(this.endpoint + '/update/' + this.foodItems[event.previousIndex].id, this.foodItems[event.previousIndex],
                           {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe((data) => {
                                         console.log(data);
                                       }, (error) => {console.log(error)});*/

    console.log(this.foodItems);
  }

  //added by teriq douglas
  update(i: any) {
    this.http
      .put(
        this.endpoint + "/update/" + this.foodItems[i].id,
        this.foodItems[i],
        { headers: new HttpHeaders({ "Content-Type": "application/json" }) }
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    //console.log(this.foodItems[i].id);
  }
  /* private updateArray(){
    this.foodService.getAllFoods().subscribe(data => {
          data.map(response => {
            this.foodItems.push(response);
          });*/
}
