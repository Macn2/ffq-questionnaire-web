import { ParentPipe } from './../../pipes/parentFilter.pipe';
import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { FfqParticipant } from "src/app/models/ffq-participant";

import {FFQResultsResponse} from 'src/app/models/ffqresultsresponse';
import {FoodRecommendationsService} from 'src/app/services/food-recommendation-service/food-recommendations.service';
import { DQISService } from '../dqis-service/dqis.service';
import {FFQFoodRecommendations} from 'src/app/models/ffqfood-recommendations';
import {createHostListener} from '@angular/compiler/src/core';
import {FFQParent} from "../../models/ffqparent";
import {TrackerResultsResponse} from 'src/app/models/trackerresultsresponse';
import { BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/boys/metric system/weight - height/BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";
import { GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/girls/metric system/weight - height/GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";



// to be deleted below
import { FFQChildren } from 'src/app/models/ffqchildren';
import { FFQChildData } from 'src/app/models/ffq-childData';
import { JsonPipe } from '@angular/common';
import { ResultRoundPipe } from 'src/app/pipes/result-round.pipe';
// to be deleted above

@Injectable({
  providedIn: 'root'
})

export class ExportService {

  constructor(
    public foodRecommendationsService: FoodRecommendationsService
  ) {
  }



  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public exportTrackingHistory(results: TrackerResultsResponse[], parentList: string[], fileName: string): void {
    const trackingHistory: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getTrackingJSON(results, parentList));
    const wb: XLSX.WorkBook = {Sheets: {TrackingHistory: trackingHistory}, SheetNames: ['TrackingHistory']};
    const excelBuffer: any = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    this.saveExcelFile(excelBuffer, fileName);
  }

  private getTrackingJSON(results: TrackerResultsResponse[], parentList: string[]): any {

    var resultRows = [];

    results.forEach(result => {

      var resultCol = {
        'Participant Username': parentList[result.userId],
        'Date': result.date,
        'Age(Months)': result.age
      };

      for (let item of result.responses) {
        resultCol[item['food']] = item['response'];
      }

      resultRows.push(resultCol)

    });

    return resultRows;
  }

  // had to make a new function because the input lists for both lists are in different formats; can't index with userID in clinic
  public exportClinicTrackingHistory(results: TrackerResultsResponse[], parentList: string[], fileName: string): void {
    const trackingHistory: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getClinicTrackingJSON(results, parentList));
    const wb: XLSX.WorkBook = {Sheets: {TrackingHistory: trackingHistory}, SheetNames: ['TrackingHistory']};
    const excelBuffer: any = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    this.saveExcelFile(excelBuffer, fileName);
  }

  private getClinicTrackingJSON(results: TrackerResultsResponse[], parentList: string[]): any {

    let resultRows = [];
    let parentIndex = 0;

    results.forEach(result => {

      const resultCol = {
        Date: result.date,
        'Age(Months)': result.age,
        Goal: result.goal
      };

      for (const item of result.responses) {
        resultCol[item.food] = item.response;
      }

      resultRows.push(resultCol);


    });

    return resultRows;
  }

  public exportFFQResults(results: FFQResultsResponse[], parentList: FFQParent[], fileName: string): void {

    const nutrients: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getNutrientJson(results, parentList));
    const foodGroups: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getFoodGroupsJson(results, parentList));
    const foods: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getFoodsJson(results, parentList));
    const dqis: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getDQISJson(results, parentList));
    const wb: XLSX.WorkBook = {
      Sheets: {Nutrients: nutrients, FoodGroups: foodGroups, Foods: foods, DQIS:dqis},
      SheetNames: ['Nutrients', 'FoodGroups', 'Foods','DQIS']
    };
    const excelBuffer: any = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    console.log("excelBuffer: " +excelBuffer);
    this.saveExcelFile(excelBuffer, fileName);

  }

  public exportFFQAlternative(results: FFQResultsResponse[], parentList: FFQParent[], fileName: string): void {

    const nutrients: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getNutrientJson(results, parentList));
    const foodGroups: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getFoodGroupsJson(results, parentList));
    const foods: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getFoodsJson(results, parentList));
    const dqis: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getDQISJson(results, parentList))
    const wb: XLSX.WorkBook = {
      Sheets: {FoodGroups: foodGroups, Foods: foods, DQIS:dqis},
      SheetNames: ['FoodGroups', 'Foods','DQIS']
    };
    const excelBuffer: any = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    this.saveExcelFile(excelBuffer, fileName);

  }

  public exportFFQAlternative2(results: FFQResultsResponse[], parentList: FFQParent[], fileName: string): void {

    const nutrients: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getNutrientJson(results, parentList));
    const foodGroups: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getFoodGroupsJson(results, parentList));
    const foods: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getFoodsJson(results, parentList));
    const dqis: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getDQISJson(results, parentList))
    const wb: XLSX.WorkBook = {
      Sheets: {Foods: foods, DQIS:dqis},
      SheetNames: ['Foods','DQIS']
    };
    const excelBuffer: any = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    this.saveExcelFile(excelBuffer, fileName);

  }


  public exportFFQAlternative3(results: FFQResultsResponse[], parentList: FFQParent[], fileName: string): void {

    const nutrients: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getNutrientJson(results, parentList));
    const foodGroups: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getFoodGroupsJson(results, parentList));
    const foods: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getFoodsJson(results, parentList));
    const dqis: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getDQISJson(results, parentList))
    const wb: XLSX.WorkBook = {
      Sheets: {Foods: foods},
      SheetNames: ['Foods']
    };
    const excelBuffer: any = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    this.saveExcelFile(excelBuffer, fileName);

  }


    // public exportFFQAlternative5(r: FFQParent[], date:string[], mydata: FFQChildData[], gender:string[], fileName: string): void {
    //   const result: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.primordialInfoUniversal(r,date,mydata,gender));
    //   const preparable: XLSX.WorkBook = {
    //     Sheets: {Info: result},
    //     SheetNames: ['Info']
    //   }

    //   const buffer:any = XLSX.write(preparable,{bookType:'xlsx',type: 'array'});
    //   this.saveExcelFile(buffer,fileName);

    // }

    public primordialGParticipant(ffqparent:FfqParticipant,date:[]) {

      const returnable = [];

      for(let i = 0; i < ffqparent.children.length; i++) {

        const pushable = {
          ID: ffqparent.userId,
          Date: date[i],
          Age: ffqparent.children[i].childData[0].age,
          Length: ffqparent.children[i].childData[0].height,
          Weight: ffqparent.children[i].childData[0].weight,
          Percentile: this.percentileCalculator(parseInt(ffqparent.children[i].childData[0].height,),parseInt(ffqparent.children[i].childData[0].weight),"male")
        }

        returnable.push(pushable);

      }

      return returnable;

    }

    public primordialG(ffqparent:FFQParent,date:[],genders:any) {

      const returnable = [];

      for(let i = 0; i < ffqparent.children.length; i++) {

        const pushable = {
          ID: ffqparent.userId,
          Date: date[i],
          Age: ffqparent.children[i].childData[0].age,
          Height: ffqparent.children[i].childData[0].height,
          Weight: ffqparent.children[i].childData[0].weight,
          Percentile: this.percentileCalculator(parseInt(ffqparent.children[i].childData[0].height),parseInt(ffqparent.children[i].childData[0].weight),genders[i])
        }

        returnable.push(pushable);

      }

      return returnable;

    }

    public exportFFQGrowthParticipant(ffqparent:FfqParticipant,dates:any,fileName) {
      const result: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.primordialGParticipant(ffqparent,dates));
      const preparable: XLSX.WorkBook = {
        Sheets: {Info: result},
        SheetNames: ['Info']
      }

      const buffer:any = XLSX.write(preparable,{bookType:'xlsx',type: 'array'});
      this.saveExcelFile(buffer,fileName);
    }


    public exportFFQGrowthCharts(ffqparent:FFQParent,dates:any,gender:any,fileName) {
      const result: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.primordialG(ffqparent,dates,gender));
      const preparable: XLSX.WorkBook = {
        Sheets: {Info: result},
        SheetNames: ['Info']
      }

      const buffer:any = XLSX.write(preparable,{bookType:'xlsx',type: 'array'});
      this.saveExcelFile(buffer,fileName);
    }

    public exportingAllParent(pushable:any,fileName:string) {

      const preparable: XLSX.WorkBook = {
        Sheets: {Info: pushable},
        SheetNames: ['Info']
      }

      const buffer:any = XLSX.write(preparable,{bookType:'xlsx',type: 'array'});
      this.saveExcelFile(buffer,fileName);

    }

    public exportFFQAll(ids:string[],date:string[],ages:string[],weights:string[],heights:string[],genders:string[],parentResults:FFQResultsResponse[],fileName:string) {
      const result: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.primordialFFQAll(ids,date,ages,weights,heights,genders,parentResults));
      const preparable: XLSX.WorkBook = {
        Sheets: {Info: result},
        SheetNames: ['Info']
      }

      const buffer:any = XLSX.write(preparable,{bookType:'xlsx',type: 'array'});
      this.saveExcelFile(buffer,fileName);
    }

    private primordialFFQAll(ids:string[],date:string[],ages:string[],weights:string[],heights:string[],genders:string[],parentResults:FFQResultsResponse[]) {

        const returnable = [];

        let i = 0;

        parentResults.forEach(result => {

          const pushable = {
            ID: ids[i],
            Date: date[i],
            "Infant age (months)": ages[i],
            "Infant weight (kg)": weights[i],
            "Infant length (cm)": heights[i],
            Percentile: this.percentileCalculator(parseInt(heights[i]),parseInt(weights[i]),genders[i])
          }

          i++;

          returnable.push(pushable);

        })


        return returnable;

    }



  public exportFFQAlternative4(r: FFQParent, date:string, mydata: FFQChildData, gender:string, fileName: string): void {
    // console.log("r: ",r);
    const result: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.primordialInfo(r,date,mydata,gender));
    const preparable: XLSX.WorkBook = {
      Sheets: {Info: result},
      SheetNames: ['Info']
    }

    const buffer:any = XLSX.write(preparable,{bookType:'xlsx',type: 'array'});
    this.saveExcelFile(buffer,fileName);

  }

  private primordialInfo(ffqparent: any, date:string, mydata: FFQChildData,gender:string): any {

    const storage = [];

    let c_height = mydata.height;

    let c_weight = mydata.weight;

    const data = {
      ID: ffqparent.userId,
      Date: date,
      "Infant age (months)": mydata.age,
      "Infant weight (kg)": mydata.weight,
      "Infant length (cm)": mydata.height,
      Percentile: this.percentileCalculator(parseInt(c_height),parseInt(c_weight),gender)
    }

    storage.push(data);

    // console.log("data: "+data);

    return storage;

  }

  private primordialGrowthChart(ffqparent:FFQResultsResponse, date:string, mydata: FFQChildData,gender:string): any {

    const storage = [];

    let c_height = mydata.height;

    let c_weight = mydata.weight;

    const data = {
      ID: ffqparent.userId,
      Date: date,
      "Infant age (months)": mydata.age,
      "Infant weight (kg)": mydata.weight,
      "Infant length (cm)": mydata.height,
      Percentile: this.percentileCalculator(parseInt(c_height),parseInt(c_weight),gender)
    }

    storage.push(data);

    // console.log("data: "+data);

    return storage;

  }

  percentileCalculator(height:number,weight:number,currentChildGender:string) : string {

    let percentileData = BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;

    let percentileDataTwo = GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;

    let minimumDifference = 1000000;

    let percentileToReturn = "";

    // console.log("currentChildGender"+currentChildGender);

    // if(currentChildGender != "placeholder") {
    // console.log(percentileData)

    // console.log(percentileData[0].data)

      switch(currentChildGender) {

        case "male":

          // console.log("Hello Dog");

          for(let i = 0; i < 11; i++) {

            for(let j = 0; j < percentileData[i].data.length; j++) {
              // console.log("typeof(percentileData[i].data[j][0]]): "+typeof(percentileData[i].data[j][0]));
              // console.log("typeof(height): "+typeof(height));
              // console.log("percentileData[i].data[j][0]: "+percentileData[i].data[j][0]);
              // console.log("height: "+height);
              if(percentileData[i].data[j][0] === height) {
                  if(Math.abs(weight-percentileData[i].data[j][1]) < minimumDifference) {
                    minimumDifference = Math.abs(weight-percentileData[i].data[j][1]);
                    percentileToReturn = percentileData[i].name;
                  }
              }

              // if(i == 10) {
              //   console.log("percentileToReturn: "+percentileToReturn);
              // }

            }

        }

          break;

        case "female":

          for(let i = 0; i < 11; i++) {

              for(let j = 0; j < percentileDataTwo[i].data.length; j++) {

                if(percentileDataTwo[i].data[j][0] == height) {
                    if(Math.abs(weight-percentileDataTwo[i].data[j][1]) < minimumDifference) {
                    minimumDifference = Math.abs(weight-percentileDataTwo[i].data[j][1]);
                    percentileToReturn = percentileDataTwo[i].name;
                    }
                }

              }

          }

          break;

    }

    // }

    // console.log("percentileToReturn: "+percentileToReturn);

      return percentileToReturn;
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
        // this.setChildGender(result.gender);
        return date1;
      }

    })

    return date1;

  }

  // setChildGender(setable):void {

  //   if(this.currentChildGender != Gender.NotAssigned) {

  //     switch(setable) {

  //       case "male":
  //         this.currentChildGender = setable;
  //         break;

  //       case "female":
  //         this.currentChildGender = setable;
  //         break;

  //       default:
  //         console.log("No appropriate gender selected");

  //     }

  //   }

  //   // console.log("This went here");
  // }



  // private primordialInfoUniversal(ffqparentList: FFQParent[], date:string[], mydata: FFQChildData[],gender:string[]): any {

  //   const returnableRows = [];

  //   ffqparentList.forEach(ffqparent => {

  //     for(let i = 0; i < ffqparent.children.length; i++) {

  //       const returnable = {

  //         ID: ffqparent.userId,
  //         Date: date[i],
  //         Age: mydata[i].age,
  //         Weight: mydata[i].weight,
  //         Height: mydata[i].height,
  //         Percentile: this.percentileCalculator(parseInt(mydata[i].height),parseInt(mydata[i].weight),gender[i])
  //       }

  //       returnableRows.push(returnable);

  //     }

  //   })


  // }

  // Creates json object with nutrient sheet rows and collumns of data
  private getNutrientJson(results: FFQResultsResponse[], parentList: FFQParent[]): any {

    // Array of rows of data
    const resultRows = [];
    // to be deleted below (possibly)
    // const dog = [];

    // to be deleted above (possibly)
    const parentListData = parentList;
    results.forEach(result => {
      // Initialize columns with general result information
      const resultCol = {
        Date: result.date,
        Username: result.patientName,
        Age: result.ageInMonths,
        Gender: result.gender,
        ReadRecommend: parentList.find(parent => parent.userId === result.userId)?.lastReadRecommend,
        TimesOfReading: parentList.find(parent => parent.userId === result.userId)?.timesOfReading,
      };

      // Add columns with nurient data
      for (const key of result.dailyAverages.keys()) {
        // Protection against undefined daily averages
        resultCol[key] = result.dailyAverages.get(key);
        if (typeof resultCol[key] === 'number') {
          resultCol[key] = resultCol[key].toFixed(2);
        } else {
          resultCol[key] = 0.0;
        }
      }

      // Push columns to array of rows
      resultRows.push(resultCol);

      // to be deleted below (possibly)

      // const dude = {

      //   children: parentList.find(parent => parent.userId == result.userId)?.children

      // }

      // dog.push(dude.children);

      // alert(dude.children)

      // alert(resultCol.Name)

      // to be deleted above (possibly)

    });

    // to be uncommented below

    return resultRows;

    // to be uncommented above

    // return dog;

  }

  private getFoodsJson(results: FFQResultsResponse[], parentList: FFQParent[]): any {

    // Array of rows of data
    var resultRows = [];

    results.forEach(result => {

      // Initialize columns with general result information
      var resultCol = {
        Date: result.date,
        Username: result.patientName,
        Age: result.ageInMonths
      };

      // Add columns with nurient data
      result.userChoices.forEach(choice => {

        resultCol[choice.name + ' frequency'] = choice.frequency;
        resultCol[choice.name + ' frequency type'] = choice.frequencyType;
        resultCol[choice.name + ' servings'] = choice.serving;

      });


      // Push columns to array of rows
      resultRows.push(resultCol);

    });

    return resultRows;

  }

  private getFoodGroupsJson(results: FFQResultsResponse[], parentList: FFQParent[]): any {

    // Array of rows of data
    var resultRows = [];

    results.forEach(result => {

      // Initialize columns with general result information
      var resultCol = {
        Date: result.date,
        Username: result.patientName,
        Age: result.ageInMonths
      };

      // Add columns with nurient data
      result.foodRecList.forEach(res => {
        res.foodCategoryRecList.forEach(food => {
          resultCol[food.categoryName] = food.calculatedAmount.toFixed(2);
        });
      });

      // Push columns to array of rows
      resultRows.push(resultCol);

    });

    return resultRows;
  }

  //DQIS JSON METHOD
  private getDQISJson(results:FFQResultsResponse[], parentList: FFQParent[]): any {
    var resultRows = [];

    results.forEach(result => {

      // Initialize columns with general result information
      var resultCol = {
        Date: result.date,
        Username: result.patientName,
        Age: result.ageInMonths
      };

      // Add columns with nurient data
      let total: number = 0;
      console.log(result)
      if(result.dqis?.length > 0) {
        result.dqis.forEach(res => {
          res.foodCategoryRecList.forEach(dqis => {
            resultCol[dqis.categoryName] = dqis.calculatedAmount.toFixed(2);
            total = total + +dqis.calculatedAmount;
          });
          resultCol['TOTAL'] = total;
        });
      }

      // Push columns to array of rows
      resultRows.push(resultCol);

    });

    return resultRows;
  }



  public exportExcel(jsonData: any[], fileName: string): void {

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = {Sheets: {data: ws}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }
}