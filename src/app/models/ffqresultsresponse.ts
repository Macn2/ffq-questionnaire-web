export class FFQResultsResponse {
    questionnaireId: string;
    userId: string;
    patientName: string;
    feedback: string;
    ageInMonths: number;
    userChoices: any;
    weeklyTotals: any;
    dailyAverages: any;
    show: boolean;
    showFeedback: boolean;

    constructor(id: string, userId: string, name: string, age: number, userChoices:any, weeklyTotals: Map<string, number>, dailyAverages: any, feedback: string) {
      this.questionnaireId = id;
      this.userId = userId;
      this.patientName = name;
      this.ageInMonths = age;
      this.userChoices = userChoices;
      this.weeklyTotals = weeklyTotals;
      this.dailyAverages = dailyAverages;
      this.feedback = feedback;
    }
  }
