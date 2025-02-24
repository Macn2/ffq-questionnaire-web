import {Component, OnChanges} from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'research-participant-home',
  templateUrl: './research-participant-home.component.html',
  styleUrls: ['./research-participant-home.component.css']
})
export class ResearchParticipantHome {
  viewConfiguration: any = null;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.viewConfigurationObservable.subscribe((viewConfiguration) => {
      if(viewConfiguration) {
        this.viewConfiguration = viewConfiguration;
      }
    })
  }
}
