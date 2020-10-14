import {FFQItemInput} from './ffqitem-input';
import {FFQItemResponse, FoodType} from './ffqitem-response';
import {Serving} from './ffqitem-response';
import { FFQFoodNutrientsResponse } from './ffqfoodnutrients-response';

export class FFQNutrientlist {  
  id: string;
  nutrientListID: string;
  nutrientMap: any;

  constructor(id: string, nutrientMap: any) {
    console.log(nutrientMap);
    this.nutrientListID = id;
    this.nutrientMap = nutrientMap;
  }
}

export class nutrientMap {
  
  // only includes the 19 main nutrients used for recomendations
  "Retinol (mcg)" : number;
  "Vitamin D (calciferol) (mcg)" : number;
  "Vitamin E (Total Alpha-Tocopherol) (mg)" : number;
  "Vitamin K (phylloquinone) (mcg)" : number;
  "Vitamin C (ascorbic acid) (mg)" : number;
  "Thiamin (vitamin B1) (mg)" : number;
  "Riboflavin (vitamin B2) (mg)" : number;
  "Niacin (vitamin B3) (mg)" : number;
  "Vitamin B5 (Pantothenic acid) (mg)" : number;
  "Vitamin B-6 (pyridoxine, pyridoxyl, & pyridoxamine) (mg)" : number;
  "Vitamin B9 (Folate) (mcg)" : number;
  "Vitamin B-12 (cobalamin) (mcg)" : number;
  "Calcium (mg)" : number;
  "Phosphorus (mg)" : number;
  "Magnesium (mg)" : number;
  "Iron (mg)" : number;
  "Zinc (mg)" : number;
  "Copper (mg)" : number;
  "Potassium (mg)" : number;

  constructor(typeName: string, nutrientListID: string){
    this["Retinol (mcg)"] = 0;
    this["Vitamin D (calciferol) (mcg)"] = 0;
    this["Vitamin E (Total Alpha-Tocopherol) (mg)"] = 0;
    this["Vitamin K (phylloquinone) (mcg)"] = 0;
    this["Vitamin C (ascorbic acid) (mg)"] = 0;
    this["Thiamin (vitamin B1) (mg)"] = 0;
    this["Riboflavin (vitamin B2) (mg)"] = 0;
    this["Niacin (vitamin B3) (mg)"] = 0;
    this["Vitamin B5 (Pantothenic acid) (mg)"] = 0;
    this["Vitamin B-6 (pyridoxine, pyridoxyl, & pyridoxamine) (mg)"] = 0;
    this["Vitamin B9 (Folate) (mcg)"] = 0;
    this["Vitamin B-12 (cobalamin) (mcg)"] = 0;
    this["Calcium (mg)"] = 0;
    this["Phosphorus (mg)"] = 0;
    this["Magnesium (mg)"] = 0;
    this["Iron (mg)"] = 0;
    this["Zinc (mg)"] = 0;
    this["Copper (mg)"] = 0;
    this["Potassium (mg)"] = 0;
  }
}

