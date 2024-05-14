import {Component, Inject, Input} from '@angular/core';
import {Router} from '@angular/router';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NutrientsRecommendationsService} from 'src/app/services/nutrients-recommendations/nutrients-recommendations.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorDialogPopupComponent} from '../error-dialog-popup/error-dialog-popup.component';
import {FFQNutrientsRecommendations, Recommendation} from 'src/app/models/ffqnutrients-recommendations';
import {DQISService} from 'src/app/services/dqis-service/dqis.service';
import {FFQFoodRecommendations} from 'src/app/models/ffqfood-recommendations';
import {TranslateService} from '@ngx-translate/core';
import {HistoryParentalComponent} from 'src/app/pages/history-parental/history-parental.component';
import { FFQDQIS } from 'src/app/models/ffqdqis';

@Component({
  selector: 'app-recommend-modal',
  templateUrl: './dqis-modal.component.html',
  styleUrls: ['./dqis-modal.component.css']
})
export class DQISModalComponent {


  @Input() id;

  constructor(
    @Inject(MAT_DIALOG_DATA) public flagData: { breastMilkFlag },
    public DQISService: DQISService,
    private modalService: NgbModal,
    private errorDialog: MatDialog,
    private router: Router,
    private translate: TranslateService) {
  }

  dqis: FFQDQIS[] = [];

  ngOnInit() {
    this.getDQIS(this.id);
  }

  private getDQIS(questionnaireId: string) {
    this.DQISService.getDQISByQuestionnaireId(questionnaireId).subscribe(
      data => {
        // The 1st version I'm using is to set a map to save key questionnaireId and the value as key/value pair
        // but the data passed by @INJECT method is an object with {{}},
        // so the 'get' method is still working, but there will be es-lint warning
        // if a baby is having both breast milk and formula, then it never little below, because breast milk will be provided enough
        // put all the questionnaireID that has breast milk
        this.dqis.push(data);
      },
    );
  }
  calculateTotalPoints(): number {
    let totalPoints = 0;
    for (const result of this.dqis) {
      for (const food of result.foodCategoryRecList) {
        totalPoints += food.calculatedAmount;
      }
    }
    return totalPoints;
  }


  color(label: string) {
    let colorLabel;
    switch (label.toLowerCase()) {
      case 'below':
        colorLabel = 'yellow';
        break;
      case 'above':
        colorLabel = 'red';
        break;
      case 'little above':
        colorLabel = 'red';
        break;
      default:
        colorLabel = 'green';
        break;
    }
    return colorLabel;
  }
}
