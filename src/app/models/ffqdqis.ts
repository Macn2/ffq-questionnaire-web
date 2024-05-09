export class FFQDQIS {
    questionnaireId: string;
    patientAge: number;
    foodCategoryRecList: Recommendation[];
  
  
    constructor(questionnaireId: string, patientAge: number, foodCategoryRecList: Recommendation[]) {
      this.questionnaireId = questionnaireId;
      this.patientAge = patientAge;
      this.foodCategoryRecList = foodCategoryRecList;
    }
  }
  
  export class Recommendation {
    categoryName: string;
    calculatedAmount: number;
  
    constructor(categoryName: string, calculatedAmount: number) {
      this.categoryName = categoryName;
     
      this.calculatedAmount = calculatedAmount;
    }
  }
  