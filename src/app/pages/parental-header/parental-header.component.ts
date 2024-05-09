import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { User } from 'src/app/services/authentication/temp-user';
import {TranslateService} from '@ngx-translate/core';
// let clickable = document.querySelector("bx-menu");

// clickable.addEventListener('click',() => {

//   clickable.classList.toggle('bxs-x-circle')

// })

@Component({
  selector: 'app-parental-header',
  templateUrl: './parental-header.component.html',
  styleUrls: ['./parental-header.component.css']
})
export class ParentalHeaderComponent {
    TITLE = this.translate.instant('Parent Portal');
    currentUser: User;
    router: Router;

    constructor(router: Router, private authenticationService: AuthenticationService, private translate: TranslateService) {
      this.router = router;
      this.authenticationService = this.authenticationService;
        //this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    change() {

        let clickable = document.querySelector("#menus");

        const tabLinks = document.querySelectorAll('.tab-link')

        clickable.classList.toggle('bxs-x-circle');

        tabLinks.forEach((tab) => {
          tab.classList.toggle('superactive')
        })

        let header = document.querySelector('.header');

        header.classList.toggle('changed')

    }

}