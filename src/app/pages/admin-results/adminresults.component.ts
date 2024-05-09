import {Component,OnInit,ViewChild,AfterViewInit} from '@angular/core';
import {ResultsService} from 'src/app/services/results/results.service';
import {FFQResultsResponse} from 'src/app/models/ffqresultsresponse';
import {Observable} from 'rxjs';
import {NutrientConstants} from 'src/app/models/NutrientConstants';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RecommendModalComponent} from 'src/app/components/recommend-modal/recommend-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {NutrientsRecommendationsService} from 'src/app/services/nutrients-recommendations/nutrients-recommendations.service';
import {ErrorDialogPopupComponent} from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import {FoodRecommendModalComponent} from 'src/app/components/food-recommend-modal/food-recommend-modal.component';
import {FoodRecommendationsService} from 'src/app/services/food-recommendation-service/food-recommendations.service';
import {FoodDescriptionService} from 'src/app/services/food-description/food-description.service';
import {DeletePopupComponent} from '../../components/delete-popup/delete-popup.component';
import {ExportService} from '../../services/export/export-service';
import {FFQFoodRecommendations} from '../../models/ffqfood-recommendations';
import {FFQClinic} from '../../models/ffqclinic';
import {ClinicService} from 'src/app/services/clinic/clinic-service';
import {FFQParent} from '../../models/ffqparent';
import {ParentService} from '../../services/parent/parent-service';
import {FFQParentResponse} from '../../models/ffqparent-response';

import {FfqParticipant} from '../../models/ffq-participant';
import {ParticipantService} from '../../services/participant/participant-service';
import {FFQResearchInstitution} from '../../models/ffq-research-institution';
import {ResearchInstitutionService} from '../../services/research-institution-service/research-institution-service';
import {FFQClinicResponse} from '../../models/ffqclinic-response';
import {FFQInstitution} from '../../models/ffqinstitution';
import { DQISService } from 'src/app/services/dqis-service/dqis.service';
import { FFQDQIS } from 'src/app/models/ffqdqis';
import { DQISModalComponent } from 'src/app/components/dqis-modal/dqis-modal.component';
import { FFQChildren } from "src/app/models/ffqchildren";
import { FFQChildData } from "src/app/models/ffq-childData";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/boys/metric system/bmi/BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";
import { ThemePalette } from "@angular/material/core";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";
//boys/metric system
import { NgForm, NgModel } from "@angular/forms";
import { GrowthChartsHelpComponent } from "src/app/components/growth-charts-help/growth-charts-help.component";
import { InterpretationGrowthChartsDialogComponent } from "src/app/components/interpretation-growth-charts-dialog/interpretation-growth-charts-dialog.component";

//height - age
import { BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/boys/metric system/height - age/BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";

//weight - age
import { BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/boys/metric system/weight - age/BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";
import html2canvas from "html2canvas";

//weight - height
import { BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/boys/metric system/weight - height/BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";
import { TranslateService } from "@ngx-translate/core";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
//girls/bmi

//bmi
import { GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/girls/metric system/bmi/GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";

//girls/metric system

//height - age
import { GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/girls/metric system/height - age/GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";

//weight - age
import { GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/girls/metric system/weight - age/GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";

//weight - height
import { GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/girls/metric system/weight - height/GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";

//boys/mixed

//weight - height - mixed: kg_vs_in
import { BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN } from "src/assets/growth-charts-data/who/boys/mixed/BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN";

//weight - height - mixed: lb_vs_cm
import { BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM } from "src/assets/growth-charts-data/who/boys/mixed/BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM";

//boys/us customary system

//height - age
import { BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/boys/US customary system/height - age/BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//weight - age
import { BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/boys/US customary system/weight - age/BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//weight - height
import { BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/boys/US customary system/weight - height/BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//girls/mixed

//weight - height - mixed: kg_vs_in
import { GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN } from "src/assets/growth-charts-data/who/girls/mixed/GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN";

//weight - height - mixed: lb_vs_cm
import { GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM } from "src/assets/growth-charts-data/who/girls/mixed/GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM";

//girls/us customary system

//height - age
import { GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/girls/US customary system/height - age/GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//weight - age
import { GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/girls/US customary system/weight - age/GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//weight - height
import { GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/girls/US customary system/weight - height/GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";
import {ChangeDetectorRef} from '@angular/core';



@Component({
  selector: 'app-growth',
  templateUrl: './adminresults.component.html',
  styleUrls: ['./adminresults.component.css']
})

export class AdminresultsComponent{

  public show = false;
  public showFeedback = false;
  breastMilkFlag = [];
  results: FFQResultsResponse[] = [];
  parentResults: FFQResultsResponse[] = [];
  // to be deleted below

  dude:any;

  // to be uncommented below
  // currentParent: FfqParticipant;

  // to be uncommented above

  currentParent: FFQParentResponse;

  childrenList: FFQChildren[] = [];

  // currentChildName: string = "";

  // childInfo: FFQParent[] = [];

  // to be deleted above
    currentChild: FFQChildren = {} as FFQChildren;
  childrenPerParentList: [] = [];
  parentList : ParentService;
  parentResultsByClinicId: FFQResultsResponse[] = [];
  participantResults: FFQResultsResponse[] = [];
  participantResultsByClinicId: FFQResultsResponse[] = [];
  questionnaireId: string;
  showParent = false;
  bySite = true;
  byClinic = true;
  showParticipant = false;
  selectedClinic: string;
  selectedSite: string;
  public ffqclinicList$: Observable<FFQClinic[]>;
  public ffqSiteList$: Observable<FFQResearchInstitution[]>;
  clinicId: string;
  public ffqparentList: FFQParent[] = [];
  public ffqParticipantList: FfqParticipant[] = [];
  showByClinic = true;
  showBySite = true;
  private clinic = [];
  private site = [];
  clinicAttributes: FFQClinic;
  siteAttributes: FFQInstitution;
  id: string;
  userId: string;
  username: string;
  userpassword: string;
  usertype: string;
  firstname: string;
  lastname: string;
  assignedclinic: string;
  assignedclinician: string;
  childrennames: any;
  isactive: boolean;
  prefix: string;
  assignedClinicOrSiteId: string;
  // Used to keep track of when parent last read recommend
  lastReadRecommend: string;
  timesOfReading: number;
  children: FFQChildren[];
  tally_num:number = 0;
  currentChildGender = "a";
  // currentChildGender = "a";


  constructor(public resultsService: ResultsService,
              public nutrientsRecommendationsService: NutrientsRecommendationsService,
              public foodRecommendationsService: FoodRecommendationsService,
              public dqisService: DQISService,
              public parentService: ParentService,
              private participantService: ParticipantService,
              public foodDescriptionService: FoodDescriptionService,
              private modalService: NgbModal,
              public clinicService: ClinicService,
              public researchInstitutionService: ResearchInstitutionService,
              private errorDialog: MatDialog,
              private router: Router,
              private exportService: ExportService,
              private authenticationService: AuthenticationService,
              private dialog: MatDialog,
              private translate: TranslateService,
              private changeDetector : ChangeDetectorRef

              // public ffqparentresponse : FFQParentResponse,

  ) {
    this.ffqclinicList$ = this.clinicService.getAllClinics();
    this.ffqSiteList$ = this.researchInstitutionService.getAllResearchInstitutions();
    Object.assign(this, {
      /*
      BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM,
      BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM,
      */
      BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM,
       /*
      BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN,
      BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM,
      */

      /*
      GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM,
      GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM,
      */
      GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM,
      /*
      GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN,
      GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM,
      */
    });

    this.currentParent = new FFQParentResponse(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      [] as string[],
      true,
      "",
      "",
      0,
      [] as FFQChildren[]
    );

    this.currentChild = new FFQChildren("", [] as FFQChildData[]);




  }

  ngOnInit() {
    const parentList: Observable<FFQParentResponse[]> = this.parentService.getAllParents();
    parentList.subscribe(a => {
      this.ffqparentList = a;
    });

    const participantList: Observable<FfqParticipant[]> = this.participantService.getAllParticipants();
    participantList.subscribe(a => {
      this.ffqParticipantList = a;
    });

    this.getAllResults();

    // const parent: Observable<FFQParentResponse> = this.parentService.getParent(
    //   this.authenticationService.currentUserId
    // );
    // parent.subscribe((parent) => {
    //   this.currentParent = parent;
    // });


    }

    ngAfterViewChecked() {
      this.changeDetector.detectChanges();
    }

    private getAllResults() {
      const oldList: Observable<FFQResultsResponse[]> = this.resultsService.getAllResults();
      const reqList: string[] = NutrientConstants.NUTRIENT_NAMES;

      oldList.subscribe(m => {

          m.forEach(element => {

            if (element.userChoices.length > 0) {
              if (element.userChoices[0].name === 'Breast milk') {
                this.breastMilkFlag.push(element.questionnaireId);
              }
            }
            const newWeeklyMap = new Map<string, number>();
            const newDailyMap = new Map<string, number>();
            const weeklyMap = element.weeklyTotals;
            const dailyMap = element.dailyAverages;

            reqList.forEach(a => {
              if (dailyMap[a]) {
                newDailyMap.set(a, dailyMap[a]);
              }
              else {
                newDailyMap.set(a, 0);
              }
              if (weeklyMap[a]) {
                newWeeklyMap.set(a, weeklyMap[a]);
              }
              else {
                newWeeklyMap.set(a, 0);
              }

            });

            element.weeklyTotals = newWeeklyMap;
            element.dailyAverages = newDailyMap;
          });

          this.results = m.reverse();
          this.parentResults = this.results.filter(t => t.userType === 'parent').map(result => ({
            ...result,
            username: this.getParentUsernameById(result.userId)
          }));
          this.participantResults = this.results.filter(t => t.userType === 'participant');
          this.setFoodList();
        }
      );


    }

      private setFoodList() {
    this.results.forEach(result => {
      const recommendedFood: FFQFoodRecommendations[] = [];
      const dqisScore: FFQDQIS[] = [];

      this.foodRecommendationsService.getFoodRecommendationsByQuestionnaireId(result.questionnaireId).subscribe(
        data => {
          recommendedFood.push(data);
        },
      );
      this.dqisService.getDQISByQuestionnaireId(result.questionnaireId).subscribe(
        data => {
          dqisScore.push(data);
        },
      );
      result.foodRecList = recommendedFood;
      result.dqis = dqisScore;


    });
  }


    getParentUsernameById(userId: string) {
      return this.ffqparentList.find(parent => parent.userId === userId)?.username ?? "[not found]";
    }

    myDataExt(ffqparentList:FFQParent[]): any {

      // let returnableOne: [string];

      // let returnableTwo: [string];

      // for(let parent of ffqparentList) {

      //   for(let j = 0; j < this.ffqparentList.length; j++) {
      //     returnableOne.push(parent.children[parent.children.length-j-1].childData[0].weight);
      //     returnableOne.push(parent.children[parent.children.length-j-1].childData[0].height);
      //   }

      // }


      // let returnable = [returnableOne,returnableTwo];

      // return returnable;


      /*
      let bro = [];

      for(let i = 0; i < 10; i++) {
          bro[i] = i;
      }

      return bro;

      */

      let parents = [];

      let i = 0;

      const info = {
        name: 20,
        information: 20
      };

      for(let parent of ffqparentList) {

        for(let i = 0; i < parent.children.length; i++) {

        }


      }

      for(let parent of ffqparentList) {
        parents[i++] = parent;
      }

      return parents;

    }

    setDudeVariable(ffqparentList:FFQParent[]):void {

        this.dude = this.myDataExt(this.ffqparentList);

        console.log("Working!")

    }

    percentileCalculator(height:number,weight:number) : string {

      let percentileData = BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;

      let percentileDataTwo = GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;

      let minimumDifference = 1000000;

      let percentileToReturn = "";

      if(this.currentChildGender != "") {

        // console.log("this.currentChildGender: "+this.currentChildGender);

        switch(this.currentChildGender) {

          case "male":

            for(let i = 0; i < 11; i++) {

              // console.log("Another time?");
              // console.log("percentileData[i].data: "+percentileData[i].data);

              for(let j = 0; j < percentileData[i].data.length; j++) {

              //   console.log("percentileData[i].data[j][0]: ",percentileData[i].data[j][0]);
              // console.log("height: "+height);
              // console.log("weight: "+weight);
              // console.log("percentileData[i].data[j][1]: "+percentileData[i].data[j][1]);


                if(percentileData[i].data[j][0] == height) {
                    if(Math.abs(weight-percentileData[i].data[j][1]) < minimumDifference) {
                      minimumDifference = Math.abs(weight-percentileData[i].data[j][1]);
                      percentileToReturn = percentileData[i].name;
                    }
                }

              }

          }

            break;

          case "female":

            for(let i = 0; i < 11; i++) {

                for(let j = 0; j < percentileDataTwo[i].data.length; j++) {

                  if(percentileData[i].data[j][0] == height) {
                      if(Math.abs(weight-percentileDataTwo[i].data[j][1]) < minimumDifference) {
                      minimumDifference = Math.abs(weight-percentileData[i].data[j][1]);
                      percentileToReturn = percentileData[i].name;
                      }
                  }

                }

            }

            break;

      }

      }

        return percentileToReturn;
    }

    setChildGender(setable):void {

      if(this.currentChildGender != "") {

        switch(setable) {

          case "male":
            this.currentChildGender = setable;
            break;

          case "female":
            this.currentChildGender = setable;
            break;

          default:
            console.log("No appropriate gender selected");

        }

      }

      // console.log("This went here");
    }

    floorMethod(a:number) {
      return Math.floor(a);
    }

    important(ffqparentList:FFQParent[]) : any{
        let parentArray = [];

        for(let i = 0; i < ffqparentList.length; i++) {
          parentArray[i] = ffqparentList[i].children.length;
        }

        console.log("parentArray: "+ffqparentList[0].children.length);
        console.log("This went there");

        return parentArray;

    }

    importanttwo(ffqparent:FFQParent, k:number) : number {

      let toReturn = 0;

      console.log("k: "+k);
      for(let i = 0; i < this.childrenPerParentList.length; i++) {
        if(k >= 0 && k < this.childrenPerParentList.length) {
          toReturn = this.childrenPerParentList[k];
        }

      }

      return toReturn;

    }

    setChildPerParentList():void {
      this.childrenPerParentList = this.important(this.ffqparentList);
    }

    create(ffqparentList:FFQParent[],j:number):any {
      return [ffqparentList[j].children];
    }

    createArray(a:any):any {
      let n = a?.length ? a.length : 0;
      if(n !== undefined && n > 0) {
        let dude = new Array(a.length);
        return dude;
      }

      let dude = new Array(0);
      
      return dude;
    }

    checker(patientName:string, age:number,results:FFQResultsResponse[]):string {
      let date1 = "";

      results.forEach(result => {

        // console.log("result.ageInMonths: "+result.ageInMonths);
        // console.log("result.patientName: "+result.patientName);
        // console.log("patientName: "+patientName);
        // console.log("age: "+age);

        if(result.ageInMonths == age && result.patientName == patientName) {
          date1 = result.date;
          this.setChildGender(result.gender);
          return date1;
        }

      });

      if(date1 == "") {
        return "[Not Found]";
      }

      return date1;

    }

    export(ffqparent:any,j:number,z:number,a:any) {
      this.exportService.exportFFQAlternative4(ffqparent,this.checker(this.ffqparentList[j].username,a[z].childData[0].age,this.parentResults),a[z].childData[0],this.getGender(ffqparent,this.parentResults),'Growth_Chart');

    }

      getGender(ffqparent:FFQParent,parentResults:FFQResultsResponse[]) {

    // console.log("Hi?");

    // console.log("parentResults.length: ",parentResults.length);

    for(let i = 0; i < parentResults.length; i++) {

      // console.log("ffqparent.username: ",ffqparent.username);
      // console.log("parentResults[i].patientName: ",parentResults[i].patientName);

      if(ffqparent.username == parentResults[i].patientName) {

        // console.log("Hello?");

        for(let j = 0; j < ffqparent.children.length; i++) {
          // console.log("typeof(parentResults[i].ageInMonths): ",typeof(parentResults[i].ageInMonths));
          // console.log("typeof(ffqparent.children[j].childData[0].age)",typeof(ffqparent.children[j].childData[0].age));
          if(parentResults[i].ageInMonths == parseInt(ffqparent.children[j].childData[0].age)) {
            return parentResults[i].gender;
          }
        }

      }

    }


  }

  export2(ffqparticipant:any,j:number,z:number,a:any) {
    this.exportService.exportFFQAlternative4(ffqparticipant,this.checker(this.ffqParticipantList[j].username,a[z].childData[0].age,this.participantResults),a[z].childData[0],this.getGender(ffqparticipant,this.participantResults),'Growth_Chart');

  }








  }
