import { Component } from '@angular/core';
import { MatIconRegistry }  from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    this.matIconRegistry.addSvgIcon(
      "arrow_red",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/arrow_red.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "arrow_yellow",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/arrow_yellow.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "check_green",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/check_green.svg")
    );
  }
  title = 'ffq-questionnaire-web';

}
