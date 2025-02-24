import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Gender } from "src/app/models/Enums";
import { environment } from "src/environments/environment";
import BOYS_YELLOW_RANGE from "src/assets/ranges/boys/yellow_range";
import BOYS_GREEN_RANGE from "src/assets/ranges/boys/green_range";
import GIRLS_YELLOW_RANGE from "src/assets/ranges/girls/yellow_range";
import GIRLS_GREEN_RANGE from "src/assets/ranges/girls/green_range";
import { TranslateService } from "@ngx-translate/core";

export interface GrowthRecord {
  height: number; // cm
  weight: number; // kg
  age: number; // months
  timestamp: Date;
  gender: Gender;
  clinicName?: string;
  parentUsername?: string;
  percentile?: {
    percentile: string;
    color: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class GrowthService {
  private endpoint = environment.apiUrl + "/growth-records";
  private recordsSource = new BehaviorSubject<GrowthRecord[]>([]);
  private genderSource = new BehaviorSubject<Gender>(Gender.NotAssigned);
  private languageSource = new BehaviorSubject<string>(
    this.translate.currentLang
  );
  private messageSource = new BehaviorSubject<{
    color: string;
    message: string;
  } | null>(null);

  message = this.messageSource.asObservable();
  records = this.recordsSource.asObservable();
  currentGender = this.genderSource.asObservable();
  currentLanguage = this.languageSource.asObservable();
  private token;

  constructor(private http: HttpClient, private translate: TranslateService) {}

  changeGender(gender: Gender) {
    this.genderSource.next(gender);
  }

  toggleLanguage(): void {
    if (this.translate.currentLang == "es") {
      this.translate.use("en-US");
      this.languageSource.next("en-US");
    } else {
      this.translate.use("es");
      this.languageSource.next("es");
    }
  }

  async loadRecords(isParticipant = false) {
    const [user] = JSON.parse(localStorage.getItem("currentUser"));
    this.token = user.token;
    const url = this.endpoint + (isParticipant ? "/participant" : "");
    this.http
      .get<any>(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .subscribe(({ data }) => this.recordsSource.next(data));
  }
  async getClinicRecords() {
    const [user] = JSON.parse(localStorage.getItem("currentUser"));
    this.token = user.token;
    return this.http
      .get<any>(`${this.endpoint}/clinic`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .toPromise();
  }
  async exportRecords(type) {
    const [user] = JSON.parse(localStorage.getItem("currentUser"));
    this.token = user.token;
    return this.http
      .get<any>(this.endpoint + "/export/" + type, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        responseType: "blob" as "json",
      })
      .toPromise();
  }
  downloadFile(data: Blob, filename: string) {
    const blob = new Blob([data], { type: "text/xlsx" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
  async getAdminRecords() {
    const [user] = JSON.parse(localStorage.getItem("currentUser"));
    this.token = user.token;
    return this.http
      .get<any>(`${this.endpoint}/admin`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .toPromise();
  }
  addRecord(record: GrowthRecord, isParticipant = false) {
    const [user] = JSON.parse(localStorage.getItem("currentUser"));
    this.token = user.token;
    const MESSAGES = {
      "2nd (2.3rd)": 'This growth chart provides standards on typical growth patterns among infants. Your baby is below optimal growth. Please discuss with your pediatrician as soon as possible.',
      "5th": 'This growth chart provides standards on typical growth patterns among infants. Your baby may be trending below optimal growth. Please discuss with your pediatrician.',
      "10th": 'This growth chart provides standards on typical growth patterns among infants. Your baby may be trending below optimal growth. Please discuss with your pediatrician.',
      "25th": 'Great job! This growth chart provides standards on typical growth patterns among infants. Your baby is following a healthy growth pattern.',
      "50th": 'Great job! This growth chart provides standards on typical growth patterns among infants. Your baby is following a healthy growth pattern.',
      "75th": 'Great job! This growth chart provides standards on typical growth patterns among infants. Your baby is following a healthy growth pattern.',
      "90th": 'This growth chart provides standards on typical growth patterns among infants. Your baby may be trending above optimal growth. Please discuss with your pediatrician.',
      "95th": 'This growth chart provides standards on typical growth patterns among infants. Your baby may be trending above optimal growth. Please discuss with your pediatrician.',
      "98th (97.7th)": 'This growth chart provides standards on typical growth patterns among infants. Your baby is above optimal growth. Please discuss with your pediatrician as soon as possible.',
    }
    const url = this.endpoint + (isParticipant ? "/participant" : "");
    this.http
      .post<any>(url, record, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .subscribe((res) => {
        this.messageSource.next({
          message: MESSAGES[res.data.percentile.percentile],
          color: res.data.percentile.color,
        });

        const currentRecords = this.recordsSource.value;
        this.recordsSource.next([res.data, ...currentRecords]);
      });
  }
}
