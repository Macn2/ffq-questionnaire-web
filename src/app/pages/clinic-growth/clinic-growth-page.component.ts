import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  GrowthRecord,
  GrowthService,
} from "src/app/services/growth/growth-service";

@Component({
  selector: "app-clinic-growth-page",
  templateUrl: "./clinic-growth-page.component.html",
  styleUrls: ["./clinic-growth-page.component.css"],
})
export class ClinicGrowthPage {
  records: GrowthRecord[] = [];
  constructor(private growthService: GrowthService, private translate: TranslateService) {}

  ngOnInit() {
    this.loadRecords();
  }

  async loadRecords() {
    const records = await this.growthService.getClinicRecords();
    this.records = records.data;
  }
  toggleLanguage(): void {
    this.growthService.toggleLanguage();
  }
  async exportRecords() {
    try {
      const result = await this.growthService.exportRecords("clinic");
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
