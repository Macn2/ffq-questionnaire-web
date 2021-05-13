export class Questionnaire {
  questionnaireID: string;
  userId: string;
  issuerID: string;
  date: string;
  submitted: boolean;

  constructor(questionnaireID: string, userId: string, issuerID: string, date: string, submitted: boolean) {
    this.questionnaireID = questionnaireID;
    this.userId = userId;
    this.issuerID = issuerID;
    this.date = date;
    this.submitted = submitted;
  }

}
