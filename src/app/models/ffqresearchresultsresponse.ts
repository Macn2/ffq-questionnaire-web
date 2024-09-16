export class FFQResearchResultsResponse {
    questionnaireId: string;
    participantUserId: string;
    feedback: string;
    ageInMonths: number;
    gender: string;
    creationDate: string;
    userChoices: any;
    weeklyTotals: any;
    show: any;
    dailyAverages: any;
    

    constructor(id: string, participantId: string, feedback : string, age: number, gender: string, creationDate: string, userChoices:any, weeklyTotals: Map<string, number>, dailyAverages: any ) {
      this.questionnaireId = id;
      this.participantUserId = participantId;
      this.feedback = feedback;
      this.ageInMonths = age;
      this.gender = gender;
      this.creationDate = creationDate;
      this.userChoices = userChoices;
      this.weeklyTotals = weeklyTotals;
      this.dailyAverages = dailyAverages;
      
    }
  }
