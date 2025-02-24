import { Component, OnInit, OnDestroy } from "@angular/core";
import { GrowthService } from "src/app/services/growth/growth-service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-growth-message",
  templateUrl: "./growth-message.component.html",
  styleUrls: ["./growth-message.component.css"],
})
export class GrowthMessageComponent implements OnInit, OnDestroy {
  message: { color: string; message: string } | null = null;
  private messageSubscription: Subscription;

  constructor(private growthService: GrowthService) {}

  ngOnInit(): void {
    this.messageSubscription = this.growthService.message.subscribe(
      (message) => {
        this.message = message;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
