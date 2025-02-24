import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { GrowthService, GrowthRecord } from 'src/app/services/growth/growth-service';  // Verifica la ruta

@Component({
  selector: 'app-growth-table',
  templateUrl: './growth-table.component.html',
  styleUrls: ['./growth-table.component.css']
})
export class GrowthTableComponent implements OnInit, OnDestroy {
  @Input() hidePercentile: boolean = false;
  records: GrowthRecord[] = [];
  private recordsSubscription: Subscription;

  constructor(private growthService: GrowthService) {}

  ngOnInit(): void {
    this.recordsSubscription = this.growthService.records.subscribe(
      (newRecords: GrowthRecord[]) => {
        this.records = newRecords;
      }
    );
  }

  ngOnDestroy(): void {
    this.recordsSubscription.unsubscribe();
  }
}
