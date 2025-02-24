import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  GrowthRecord,
  GrowthService,
} from "src/app/services/growth/growth-service";

@Component({
  selector: "app-growth",
  templateUrl: "./adminresults.component.html",
  styleUrls: ["./adminresults.component.css"],
})
export class AdminresultsComponent {
  records: GrowthRecord[] = [];
  constructor(private growthService: GrowthService, private translate: TranslateService) {}

  ngOnInit() {
    this.loadRecords();
  }

  async loadRecords() {
    const records = await this.growthService.getAdminRecords();
    this.records = records.data;
  }
  toggleLanguage(): void {
    this.growthService.toggleLanguage();
  }
  async exportRecords() {
    try {
      const result = await this.growthService.exportRecords("admin");
      const title =
        this.translate.currentLang === "es"
          ? "Resultados de gráficos de crecimiento.xlsx"
          : "Growth Chart Results.xlsx";
      this.growthService.downloadFile(result, title);
    } catch (error) {
      console.error("Error exporting events:", error);
    }
  }
}
