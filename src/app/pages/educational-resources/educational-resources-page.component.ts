import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ParentEventsService } from "src/app/services/parent-events/parent-events.service";
import { EDUCATIONAL_RESOURCES_EN } from "src/assets/educational-resources/EN";
import { EDUCATIONAL_RESOURCES_ES } from "src/assets/educational-resources/ES";

@Component({
  selector: "app-educational-resources-page",
  templateUrl: "./educational-resources-page.component.html",
  styleUrls: ["./educational-resources-page.component.css"],
})
export class EducationalResourcesPage implements OnInit {
  currentLang = this.translate.currentLang;
  resources = [];

  resourcesEn = EDUCATIONAL_RESOURCES_EN;
  resourcesEs = EDUCATIONAL_RESOURCES_ES;

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private parentEventsService: ParentEventsService
  ) {}
  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.updateResources();
    });

    this.updateResources();
  }

  updateResources() {
    const currentLang = this.translate.currentLang;
    if (currentLang === "es") {
      this.resources = this.resourcesEs;
    } else {
      this.resources = this.resourcesEn;
    }
  }
  handleClick(item, category) {
    this.openResource(item.url);
    this.parentEventsService.logEvent(
      "external-resource-click",
      item.text,
      category,
      { url: item.url }
    );
  }
  openResource(url: string) {
    window.open(url, "_blank");
  }
  toggleLanguage() {
    if (this.translate.currentLang == "es") {
      this.translate.use("en-US");
    } else {
      this.translate.use("es");
    }
  }
}
