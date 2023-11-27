import { Component, OnInit } from '@angular/core';
import { Description } from 'src/app/models/ffqfooddescription';
import { Observable } from 'rxjs';
import { FoodDescriptionService } from 'src/app/services/food-description/food-description.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { formatDate } from '@angular/common';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { TrackerResultsResponse } from 'src/app/models/trackerresultsresponse';
import { TrackerItems } from 'src/app/models/trackeritems';
import { TrackerResponseService } from 'src/app/services/tracker-response/tracker-response.service';
import { HttpErrorResponse } from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import { User } from 'src/app/services/authentication/temp-user';

@Component({
  selector: 'app-educational-resources-en',
  templateUrl: './educational-resources-en.component.html',
  styleUrls: ['./educational-resources-en.component.css']

})
export class EducationalResourcesENComponent {
  TITLE = this.translate.instant('Parent Portal');
  currentUser: User;
    router: Router;

    constructor(router: Router, private authenticationService: AuthenticationService, private translate: TranslateService) {
      this.router = router;
      this.authenticationService = this.authenticationService;
    }


    ngOnInit():void {

      if(!sessionStorage.getItem("reloadables")) {
            sessionStorage.setItem("reloadables","no longer");
            location.reload();
          } else {
            sessionStorage.removeItem("reloadables");
          }

    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    breastfeedTips(){
    //   this.clicksService.incrementEnglishLinkCount(0);
      window.open('https://www.youtube.com/watch?v=vijHv5GxqRs', '_blank');
    }
    breastFeeding(){
    //   this.clicksService.incrementEnglishLinkCount(1);
      window.open('https://familymealproject.fiu.edu/breastfeeding/', '_blank');
    }
    instantForm(){
    //   this.clicksService.incrementEnglishLinkCount(2);
      window.open('https://familymealproject.fiu.edu/bottle-feeding-infant-formulas/#section-overview-formula', '_blank');
    }
    babyDrink(){
    //   this.clicksService.incrementEnglishLinkCount(3);
      window.open('https://www.youtube.com/watch?v=V4YxL2Mt_Rk&list=PLNEN4w93BoO0gc09i8RmpxPVg7UzBKBKq&index=1', '_blank');
    }
    adven1(){
    //   this.clicksService.incrementEnglishLinkCount(4);
      window.open('https://dttpvmri50pw3.cloudfront.net/doctor-yum/downloadables/raising-adventurous-eaters-1-4-months/pha-rae-1-4-months-1262.pdf', '_blank');
    }
    adven4(){
    //   this.clicksService.incrementEnglishLinkCount(5);
      window.open('https://dttpvmri50pw3.cloudfront.net/doctor-yum/downloadables/raising-adventurous-eaters-4-6-months/pha-rae-4-6-months-1264.pdf', '_blank');
    }
    solidFood(){
    //   this.clicksService.incrementEnglishLinkCount(6);
      window.open('https://www.youtube.com/watch?v=OTjmKmTVF6U', '_blank');
    }

    goodFirstFood(){
    //   this.clicksService.incrementEnglishLinkCount(7);
      window.open('https://www.youtube.com/watch?v=DpucN2eNG8s', '_blank');
    }
    babyWeaning(){
    //   this.clicksService.incrementEnglishLinkCount(8);
      window.open('https://www.youtube.com/watch?v=BYJLL9foFHQ', '_blank');
    }
    ncFirstFood(){
    //   this.clicksService.incrementEnglishLinkCount(9);
      window.open('https://www.youtube.com/watch?v=1nltYRgthj4', '_blank');
    }
    sweetPotato(){
    //   this.clicksService.incrementEnglishLinkCount(10);
      window.open('https://www.youtube.com/watch?v=iQmGyom49Hg', '_blank');
    }
    howMuch(){
    //   this.clicksService.incrementEnglishLinkCount(11);
      window.open('https://www.youtube.com/watch?v=3arYE01K4Fs', '_blank');
    }
    peanutFood(){
    //   this.clicksService.incrementEnglishLinkCount(12);
      window.open('https://www.youtube.com/watch?v=oQATffVjAMs', '_blank');
    }
    foodAvoid(){
    //   this.clicksService.incrementEnglishLinkCount(13);
      window.open('https://www.youtube.com/watch?v=uGSkpChO7x8', '_blank');
    }
    adven6(){
    //   this.clicksService.incrementEnglishLinkCount(14);
      window.open('https://pha-cms.s3.amazonaws.com/documents/165/ac8c1865-e643-447a-86e7-82491996757e.pdf?1667961477', '_blank');
    }

}
