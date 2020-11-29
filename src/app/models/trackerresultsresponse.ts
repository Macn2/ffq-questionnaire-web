export class TrackerResultsResponse {
  userId: string;
  age: number;
  date: string;
  responses: any;

  constructor(userId: string, age: number, date: string, responses: any) {
    this.userId = userId;
    this.age = age;
    this.date = date;
    this.responses = responses;
  }
}
