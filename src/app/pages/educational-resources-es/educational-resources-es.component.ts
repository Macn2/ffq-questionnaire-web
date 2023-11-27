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
  selector: 'app-educational-resources-es',
  templateUrl: './educational-resources-es.component.html',
  styleUrls: ['./educational-resources-es.component.css']

})
export class EducationalResourcesESComponent implements OnInit{
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
      // this.clickable.incrementOne();
    //   this.clickable.incrementCorrespondingClickCount(0);
      window.open('https://espanol.babycenter.com/v14600031/10-consejos-para-amamantar-video', '_blank');
    }
    babyTake(){
      // this.clickable.incrementTwo();
    //   this.clickable.incrementCorrespondingClickCount(1);
      window.open('https://www.youtube.com/watch?v=0KuEhs4opag&list=PLNEN4w93BoO1GQq4oD7bt05DJq_RfnXT5&index=1', '_blank');
    }
    mixBreastfeed(){
      // this.clickable.incrementThree();
    //   this.clickable.incrementCorrespondingClickCount(2);
      window.open('https://www.youtube.com/watch?v=SUNWEV9arLM&t=173s', '_blank');
    }
    adven1(){
      // this.clickable.incrementFour();
    //   this.clickable.incrementCorrespondingClickCount(3);
      window.open('https://dttpvmri50pw3.cloudfront.net/doctor-yum/downloadables/raising-adventurous-eaters-spanish-1-4-months/rae-spanish-guide-1-4mos-1329.pdf', '_blank');
    }
    adven4(){
      // this.clickable.incrementFive();
    //   this.clickable.incrementCorrespondingClickCount(4);
      window.open('https://dttpvmri50pw3.cloudfront.net/doctor-yum/downloadables/raising-adventurous-eaters-spanish-4-6-months/rae-spanish-guide-4-6mos-1284.pdf', '_blank');
    }


    compFeed(){
      // this.clickable.incrementSix();
    //   this.clickable.incrementCorrespondingClickCount(5);
      window.open('https://www.youtube.com/watch?v=wA07Pous8ZY', '_blank');
    }

    babyWeaning(){
      // this.clickable.incrementSeven();
    //   this.clickable.incrementCorrespondingClickCount(6);
      window.open('https://espanol.babycenter.com/v25015203/baby-led-weaning-c%C3%B3mo-empezar-video', '_blank');
    }
    prepPorr(){
      // this.clickable.incrementEight();
    //   this.clickable.incrementCorrespondingClickCount(7);
      window.open('https://www.youtube.com/watch?v=FjlwlgL0hgM', '_blank');
    }
    howMuch(){
      // this.clickable.incrementNine();
    //   this.clickable.incrementCorrespondingClickCount(8);
      window.open('https://www.youtube.com/watch?v=3arYE01K4Fs', '_blank');
    }
    foodAvoid(){
      // this.clickable.incrementTen();
    //   this.clickable.incrementCorrespondingClickCount(9);
      window.open('https://www.youtube.com/watch?v=I9hBvb2dIlI', '_blank');
    }
    adven6(){
      // this.clickable.incrementEleven();
    //   this.clickable.incrementCorrespondingClickCount(10);
      window.open('https://dttpvmri50pw3.cloudfront.net/doctor-yum/downloadables/raising-adventurous-eaters-spanish-6-9-months/rae-spanish-guide-6-9mos-1285.pdf', '_blank');
    }
    superFood(){
      // this.clickable.incrementTwelve();
    //   this.clickable.incrementCorrespondingClickCount(11);
      window.open('https://espanol.babycenter.com/v25027324/5-s%C3%BAperalimentos-para-tu-beb%C3%A9', '_blank');
    }



}