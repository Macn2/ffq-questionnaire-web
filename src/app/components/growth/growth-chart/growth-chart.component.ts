import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import ApexCharts from "apexcharts";
import BOYS_RED_RANGE from "src/assets/ranges/boys/red_range";
import BOYS_YELLOW_RANGE from "src/assets/ranges/boys/yellow_range";
import BOYS_GREEN_RANGE from "src/assets/ranges/boys/green_range";
import GIRLS_RED_RANGE from "src/assets/ranges/girls/red_range";
import GIRLS_YELLOW_RANGE from "src/assets/ranges/girls/yellow_range";
import GIRLS_GREEN_RANGE from "src/assets/ranges/girls/green_range";
import CHART_DEFAULT_OPTIONS from "./chart-default-options";
import {
  GrowthRecord,
  GrowthService,
} from "src/app/services/growth/growth-service";
import { Subscription } from "rxjs";
import { Gender } from "src/app/models/Enums";
import { TranslateService } from "@ngx-translate/core";

const BOYS_SERIES = [BOYS_RED_RANGE, BOYS_YELLOW_RANGE, BOYS_GREEN_RANGE];
const GIRLS_SERIES = [GIRLS_RED_RANGE, GIRLS_YELLOW_RANGE, GIRLS_GREEN_RANGE];

@Component({
  selector: "app-growth-chart",
  templateUrl: "./growth-chart.component.html",
  styleUrls: ["./growth-chart.component.css"],
})
export class GrowthChartComponent implements AfterViewInit {
  @ViewChild("chart") chartElement: ElementRef;
  private chart: ApexCharts;
  public chartOptions: any;
  private genderSubscription: Subscription;
  private languageSubscription: Subscription;
  currentGender: Gender = Gender.NotAssigned;
  currentLanguage: string = this.translate.currentLang;
  private currentSeries = [];

  constructor(
    private growthService: GrowthService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.genderSubscription = this.growthService.currentGender.subscribe(
      (gender: Gender) => {
        this.currentGender = gender;
        this.updateChartGender();
      }
    );
  }

  ngAfterViewInit(): void {
    this.languageSubscription = this.growthService.currentLanguage.subscribe(
      (lang) => {
        this.currentLanguage = lang;
        if (this.chart) {
          const newSeries = [...this.currentSeries];
          newSeries[3].name =
            this.currentLanguage === "es" ? "Mediciones" : "Measurements";
          this.chart.updateOptions(
            {
              title: { text: this.getTitle() },
              series: this.currentSeries,
              xaxis: {
                title: {
                  text:
                    this.currentLanguage === "es"
                      ? "Altura (cm)"
                      : "Length (cm)",
                },
              },
              yaxis: {
                title: {
                  text:
                    this.currentLanguage === "es" ? "Peso (kg)" : "Weight (cm)",
                },
                labels: {
                  formatter: (value) => value?.toFixed?.(0) ?? value,
                },
              },
            },
            true
          );
        }
      }
    );
    this.currentSeries = [
      ...(this.currentGender === Gender.Female ? GIRLS_SERIES : BOYS_SERIES),
      {
        type: "scatter",
        name: "Measurements",
        data: [],
        color: "#000000",
      },
    ];
    this.chartOptions = {
      series: this.currentSeries,
      ...CHART_DEFAULT_OPTIONS,
    };
    this.chart = new ApexCharts(
      this.chartElement.nativeElement,
      this.chartOptions
    );
    this.chart.render();
    this.growthService.records.subscribe((records) => {
      this.updateChartData(records);
    });
  }

  updateChartData(records: GrowthRecord[]): void {
    const newRecordSeriesData = records
      .map((record) => ({
        x: record.height,
        y: record.weight,
        percentile: record?.percentile,
      }))
      .sort(({ x: xl }, { x: xr }) => (xl > xr ? 1 : -1));

    const type = newRecordSeriesData.length > 1 ? "line" : "scatter";
    const updatedSeries = [...this.currentSeries];
    updatedSeries[updatedSeries.length - 1] = {
      ...updatedSeries[updatedSeries.length - 1],
      data: newRecordSeriesData,
      type,
    };

    this.currentSeries = updatedSeries;
    this.chart.updateSeries(updatedSeries);
  }

  getTitle(): string {
    const isFemale = this.currentGender === Gender.Female;
    if (this.currentLanguage === "es") {
      const newTitleText = `Percentiles de talla y peso (${
        isFemale ? "niñas" : "niños"
      })`;
      return newTitleText;
    }
    const newTitleText = `Weight-for-length Percentiles (${
      isFemale ? "girls" : "boys"
    })`;
    return newTitleText;
  }

  updateChartGender(): void {
    if (this.chart) {
      const isFemale = this.currentGender === Gender.Female;
      const newSeries = isFemale ? GIRLS_SERIES : BOYS_SERIES;

      this.currentSeries.splice(0, this.currentSeries.length - 1, ...newSeries);

      this.chart.updateOptions(
        {
          series: this.currentSeries,
          title: {
            text: this.getTitle(),
          },
        },
        true
      );
    }
  }

  ngOnDestroy(): void {
    if (this.genderSubscription) {
      this.genderSubscription.unsubscribe();
    }
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
