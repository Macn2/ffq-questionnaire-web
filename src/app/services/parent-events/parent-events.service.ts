import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ParentEventsService {
  endpoint = environment.apiUrl + "/parent-events";
  private token;
  events = [];

  constructor(private http: HttpClient) {}

  async logEvent(name, title, category, props) {
    const record = {};
    const [user] = JSON.parse(localStorage.getItem("currentUser"));
    this.token = user.token;
    record["name"] = name;
    record["title"] = title;
    record["category"] = category;
    record["properties"] = props;
    return this.http
      .post<any>(`${this.endpoint}`, record, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .toPromise();
  }

  async loadAllEvents() {
    const [user] = JSON.parse(localStorage.getItem("currentUser"));
    this.token = user.token;
    return this.http
      .get<any>(this.endpoint + "/admin", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .toPromise();
  }
  async exportEvents() {
    const [user] = JSON.parse(localStorage.getItem("currentUser"));
    this.token = user.token;
    return this.http
      .get<any>(this.endpoint + "/admin/export", {
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
}
