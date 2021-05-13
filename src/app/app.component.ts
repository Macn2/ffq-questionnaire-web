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
      "up_arrow",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/up_arrow.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "down_arrow",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/down_arrow.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "equal_sign",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/equal_sign.svg")
    );
  }
  title = 'ffq-questionnaire-web';

}
