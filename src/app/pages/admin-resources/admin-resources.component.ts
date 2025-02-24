import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ParentEventsService } from "src/app/services/parent-events/parent-events.service";

@Component({
  templateUrl: "./admin-resources.component.html",
  styleUrls: ["./admin-resources.component.css"],
})
export class AdminExternalResourcesComponent implements OnInit {
  events = [];
  constructor(
    private translate: TranslateService,
    private parentEventsService: ParentEventsService
  ) {}
  ngOnInit(): void {
    this.parentEventsService.loadAllEvents().then(({ data }) => {
      this.events = data;
    });
  }
  toggleLanguage(): void {
    if (this.translate.currentLang == "es") {
      this.translate.use("en-US");
    } else {
      this.translate.use("es");
    }
  }
  async exportEvents() {
    try {
      const result = await this.parentEventsService.exportEvents();
      const title =
        this.translate.currentLang === "es"
          ? "Eventos de Recursos Externos.xlsx"
          : "Educational Resources Events.xlsx";
      this.parentEventsService.downloadFile(result, title);
    } catch (error) {
      console.error("Error exporting events:", error);
    }
  }
}
