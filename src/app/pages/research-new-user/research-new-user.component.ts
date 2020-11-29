import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogPopupComponent} from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import {Subscription} from 'rxjs/internal/Subscription';
import {combineLatest, Observable} from 'rxjs';
import {ParticipantService} from 'src/app/services/participant/participant-service';
import {ResearchService} from 'src/app/services/research/research-service';
import {FFQResearchParticipant} from 'src/app/models/ffqresearch-participant';
import {FFQResearch} from 'src/app/models/ffqresearch';
import {ResearchInstitutionService} from 'src/app/services/research-institution-service/research-institution-service';
import {FFQInstitution} from 'src/app/models/ffqinstitution';
import {Usertype} from '../../models/usertype.enum';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {User} from '../../models/user';
import {skipWhile, take} from 'rxjs/operators';
import {FFQParticipantResponse} from '../../models/ffqresearch-participant-response';
// import { Angular2CsvComponent } from 'angular2-csv/Angular2-csv';
import {FFQInstitutionResponse} from "../../models/ffqinstitution-response";

@Component({
  selector: 'app-research-new-user',
  templateUrl: './research-new-user.component.html',
  styleUrls: ['./research-new-user.component.css']
})
export class ResearchNewUserComponent implements OnInit {
  loggedInUser = this.authenticationService.currentUserValue;
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [],
    showTitle: true,
    title: 'User Info',
    titles: 'User Info',
    useBom: false,
    removeNewLines: true,
    keys: ['userName', 'password' ]
  };
  data = [];
  selectedInstitution: FFQInstitution;
  userType = Usertype.Participant;
  userTypes = Usertype;
  ffqParticipant: FFQResearchParticipant;
  ffqInstitutionList$: Observable<FFQInstitution[]>;
  usersQuantity = 1;
  currentUser$: Observable<FFQResearch[]>;
  private participantLimitForResearch: number;
  currentUser: Observable<FFQResearch[]>;
  clicked = false;
  noMoreRoom = false;
  limit = this.loggedInUser[0].limitNumberOfParticipants;
  numParticipants = 0;
  prefix = (this.loggedInUser[0].prefix === undefined) ? '' : this.loggedInUser[0].prefix;
  lastUserId;
  suffix;
  userPassword;
  dissabled = false;
  intialLoad = true;
  initial = true;
  testing = [];
  newParticipants = [];
  loggedInInstitutionName;

  constructor(
    public participantService: ParticipantService,
    public researchService: ResearchService,
    private errorDialog: MatDialog,
    private router: Router,
    public institutionService: ResearchInstitutionService,
    private authenticationService: AuthenticationService
  ) {
    this.ffqInstitutionList$ = this.institutionService.getAllResearchInstitutions();
    this.currentUser$ = this.authenticationService.currentUser as unknown as Observable<FFQResearch[]>;
    this.currentUser = this.currentUser$;
  }

  numberOfPatients: number[] = [];
  ffqparticipantList: FFQResearchParticipant[] = [];
  ffqinstitutionList: FFQInstitution[] = [];


  ngOnInit() {
    combineLatest([this.currentUser$, this.ffqInstitutionList$]).pipe(
      skipWhile(([users, institutions]) => users.length === 0 || institutions.length === 0),
      take(1))
      .subscribe(([user, institution]) => {
        this.selectedInstitution = institution.find(i => i.researchInstitutionId === user[0].AssignedResearchInstitutionId);
      });

    const participantList: Observable<FFQParticipantResponse[]> = this.participantService.getAllParticipants();
    participantList.subscribe(a => {
      this.ffqparticipantList = a;
    });
    const institutionList: Observable<FFQInstitutionResponse[]> = this.institutionService.getAllResearchInstitutions();
    institutionList.subscribe(a => {
      this.ffqinstitutionList = a;
    });
  }
  getInstiutionName() {
    for (let item of this.ffqinstitutionList) {
      if ( this.loggedInUser[0].AssignedResearchInstitutionId === item.researchInstitutionId){
        this.loggedInInstitutionName= item.institutionName;
      }
    }

}
  countParticipants(){
    for (let i = 0; i < this.ffqparticipantList.length; i++){
    if (this.loggedInUser[0].userId === this.ffqparticipantList[i].assignedResearcherUsers[0]){
      this.limit --;
      this.numParticipants ++;
  }
    if (this.limit <= 0){
      this.limit = 0;
      this.noMoreRoom = true;
    }
    // console.log(this.data[0].userName);
  }}
  addUser() {
    switch (this.userType) {
      //Create researchers not required in this place. Implement the these methods if required.
      case Usertype.Researcher: {
        if (this.usersQuantity === 1) {
          this.addResearcher();
        } else {
          this.addMultipleResearchers();
        }
        break;
      }
      case Usertype.Participant: {
        if (this.usersQuantity === 1) {
          this.addParticipant();
        } else {
          this.addMultipleParticipants();
        }
        break;
      }
    }
  }

  addResearcher() {
    throw new Error("Not implemented");

    // const ffqclinician = new FFQClinician('', '', '', '', '', '', this.selectedClinic.clinicId, [], true, this.parentLimitForClinician, this.prefix);

    // this.clinicianService.addClinician(ffqclinician).subscribe(clinician => {
    //     const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
    //     dialogRef.componentInstance.title = clinician.username + ' was added!';
    //   },
    //   error => {
    //     const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
    //     dialogRef.componentInstance.title = error.error.message;
    //   });
  }

  addMultipleResearchers() {
    throw new Error("Not implemented");

    // const newClinicians = [];
    // for (let i = 0; i < this.usersQuantity; i++) {
    //   newClinicians.push(new FFQClinician('', '', '', '', '', '', this.selectedClinic.clinicId, [], true, this.parentLimitForClinician, this.prefix));
    // }

    // this.clinicianService.addMultipleClinicians(newClinicians).subscribe(clinicians => {
    //     const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
    //     dialogRef.componentInstance.title = 'Users<br/>' + clinicians.map(clinician => clinician.username).join('<br/>') + '<br/>were added!';
    //   },
    //   error => {
    //     const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
    //     dialogRef.componentInstance.title = error.error.message;
    //   });
  }

  getSuffix(){
    if (this.ffqparticipantList.length === 0){
      this.suffix = 1;
    } else {
    this.lastUserId = this.ffqparticipantList[this.ffqparticipantList.length - 1].userId;
    this.suffix = parseInt(this.lastUserId, 10) + 1;
  }}

  addParticipant() {
    this.getSuffix();
    this.generatePassword();
    if (this.prefix === '') {
      this.prefix = 'participant';
      this.ffqParticipant = new FFQResearchParticipant('','',this.userPassword,'participant','','',this.selectedInstitution.researchInstitutionId,[this.loggedInUser[0].userId],[''],true);
    }
    else {
      this.ffqParticipant = new FFQResearchParticipant('', this.prefix + this.suffix,this.userPassword,'participant','','',this.selectedInstitution.researchInstitutionId,[this.loggedInUser[0].userId],[''],true);
    }
    this.participantService.addParticipant(this.ffqParticipant).subscribe(participant  => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = participant.username + ' was added!';
        this.save2csvSingleParticipant();
        this.dissabled = true;
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
        this.router.navigateByUrl('/research/home');
      });
  }
  dataLoop(){
    for (let i = 0; i < 7; i++){
      this.data[i] = [
        {
          userName: '',
          password: ''
        },
      ];
    }
  }
  save2csvSingleParticipant() {
    this.getInstiutionName();
    this.dataLoop();

    this.data[0].userName = 'Assingned institution: ';
    this.data[0].password = this.loggedInInstitutionName;
    this.data[1].userName = 'Assingned institution ID: ';
    this.data[1].password = this.loggedInUser[0].AssignedResearchInstitutionId;
    this.data[2].userName = 'Assingned researcher: ';
    this.data[2].password = this.loggedInUser[0].username;
    this.data[3].userName = '';
    this.data[3].password = '';
    this.data[4].userName = 'User Name';
    this.data[4].password = 'Password';
    this.data[5].userName = '';
    this.data[5].password = '';
    this.data[6].userName = this.prefix + this.suffix;
    this.data[6].password = this.userPassword;
  }
  dataLoopMultiple() {
    for (let i = 0; i < this.newParticipants.length + 6; i++) {
      this.data[i] = [
        {
          userName: '',
          password: ''
        },
      ];
    }
  }
  save2csvMultipleParticipant() {
    this.getInstiutionName();
    this.dataLoopMultiple();
    this.data[0].userName = 'Assingned institution: ';
    this.data[0].password = this.loggedInInstitutionName;
    this.data[1].userName = 'Assingned institution ID: ';
    this.data[1].password = this.loggedInUser[0].AssignedResearchInstitutionId;
    this.data[2].userName = 'Assingned researcher: ';
    this.data[2].password = this.loggedInUser[0].username;
    this.data[3].userName = '';
    this.data[3].password = '';
    this.data[4].userName = 'User Name';
    this.data[4].password = 'Password';
    this.data[5].userName = '';
    this.data[5].password = '';

    for (let i = 0; i < this.newParticipants.length; i++){
      this.data[i + 6].userName = this.newParticipants[i].username;
      this.data[i + 6].password = this.newParticipants[i].userpassword;
    }
  }
  addMultipleParticipants() {
    this.getSuffix();
    if (this.prefix === '') {
      for (let i = 0; i < this.usersQuantity; i++) {
        this.prefix = this.ffqinstitutionList[0].institutionName;
        this.generatePassword();
        this.newParticipants.push(new FFQResearchParticipant('', this.prefix + '_' + this.suffix, this.userPassword, 'participant', '','', this.selectedInstitution.researchInstitutionId, [this.loggedInUser[0].userId], [''], true));
        this.suffix++;
      }
    }
    else {
    for (let i = 0; i < this.usersQuantity; i++) {
      this.generatePassword();
      this.newParticipants.push(new FFQResearchParticipant('', this.prefix + '_' + this.suffix.toString(), this.userPassword, 'participant', '','', this.selectedInstitution.researchInstitutionId, [this.loggedInUser[0].userId], [''], true));
      this.suffix++;
    }}

    this.participantService.addMultipleParticipants(this.newParticipants).subscribe(researchers => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = 'Users<br/>' + researchers.map(researcher => researcher.username).join('<br/>') + '<br/>were added!';
        console.log(this.newParticipants[0].username);
        this.save2csvMultipleParticipant();
        this.dissabled = true;
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
        this.router.navigateByUrl('/research/home');
      });
  }
  generatePassword() {
    this.userPassword = Math.random().toString(36).slice(-10);
  }
}

