
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { FFQResultsResponse } from 'src/app/models/ffqresultsresponse';
import { FoodRecommendationsService } from 'src/app/services/food-recommendation-service/food-recommendations.service';
import { FFQFoodRecommendations } from 'src/app/models/ffqfood-recommendations';
import { createHostListener } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})

export class ExportService {

  constructor(  
    public foodRecommendationsService: FoodRecommendationsService
  ) { }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';
  
  

  public exportFFQResults(results: FFQResultsResponse[], fileName: string): void {

    const nutrients: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getNutrientJson(results));
    const foodGroups: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getFoodGroupsJson(results));
    const foods: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getFoodsJson(results));
    const wb: XLSX.WorkBook = { Sheets: { Nutrients: nutrients, FoodGroups: foodGroups, Foods: foods }, SheetNames: ['Nutrients', 'FoodGroups', 'Foods'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  // Creates json object with nutrient sheet rows and collumns of data
  private getNutrientJson(results: FFQResultsResponse[]): any {

    // Array of rows of data
    var resultRows = [];

    results.forEach(result => {
  
      // Initialize columns with general result information
      var resultCol = {  
        'Participant ID': result.userId,
        'Questionnaire ID': result.questionnaireId,
        'Date': result.date,};

      // Add columns with nurient data
      for (let key of result.dailyAverages.keys()) {
        resultCol[key] = result.dailyAverages.get(key)
      }

      // Push columns to array of rows
      resultRows.push(resultCol)

    });

    return resultRows;

  }
  
  private getFoodsJson(results: FFQResultsResponse[]): any {

        // Array of rows of data
        var resultRows = [];

        results.forEach(result => {
      
          // Initialize columns with general result information
          var resultCol = {  
            'Participant ID': result.userId,
            'Questionnaire ID': result.questionnaireId,
            'Date': result.date,
          };
    
          // Add columns with nurient data
          result.userChoices.forEach(choice => {

            resultCol[choice.name + " frequency"] = choice.frequency
            resultCol[choice.name + " frequency type"] = choice.frequencyType
            resultCol[choice.name + " servings"] = choice.serving

          });

    
          // Push columns to array of rows
          resultRows.push(resultCol)
    
        });
    
        return resultRows;

  }

  private getFoodGroupsJson(results: FFQResultsResponse[]): any {

    // Array of rows of data
    var resultRows = [];

    results.forEach(result => {
  
      // Initialize columns with general result information
      var resultCol = {  
        'Participant ID': result.userId,
        'Questionnaire ID': result.questionnaireId,
        'Date': result.date
      };

      // Add columns with nurient data
      result.foodRecList.forEach( res => {
        res.foodCategoryRecList.forEach( food => {
          resultCol[food.categoryName] = food.calculatedAmount
        });
      });
        
      // Push columns to array of rows
      resultRows.push(resultCol)

    });

    return resultRows;
  }


  public exportExcel(jsonData: any[], fileName: string): void {

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }
}