
import { Component, OnInit } from "@angular/core";
import { FFQClinician } from "src/app/models/ffqclinician";
import { FFQParent } from "src/app/models/ffqparent";
import { FFQAdmin } from "src/app/models/ffqadmin";
import { FFQClinicianResponse } from "src/app/models/ffqclinician-response";
import { ParentService } from "src/app/services/parent/parent-service";
import { ClinicianService } from "src/app/services/clinician/clinician-service";
import { Observable, BehaviorSubject } from "rxjs";
import { FFQParentResponse } from "src/app/models/ffqparent-response";
import { FFQClinicResponse } from "src/app/models/ffqclinic-response";
import { FFQAdminResponse } from "src/app/models/ffqadmin-response";
import { FFQResearchtResponse } from "src/app/models/ffqresearch-response";
import { ClinicService } from "src/app/services/clinic/clinic-service";
import { AdminService } from "src/app/services/admin/admin-service";
import { ResearchService } from "src/app/services/research/research-service";
import { FFQClinic } from "src/app/models/ffqclinic";
import { SearchPipe } from "src/app/pipes/searchFilter.pipe";
import { User } from "src/app/models/user";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { FFQResearch } from "src/app/models/ffqresearch";
import { FFQResearchInstitutionResponse } from "src/app/models/ffqresearch-institution-response";
import { ResearchInstitutionService } from 'src/app/services/research-institution-service/research-institution-service';

@Component({
  templateUrl: "./research-admin-users.component.html",
  styleUrls: ["./research-admin-users.component.css"],
})
export class AdminResearchUsersComponent implements OnInit {
  private showParticipants: boolean;
  private showResearchers: boolean;   

  search: string;

  constructor(    
    public authenticationService: AuthenticationService,  
      
    public researcherService: ResearchService,
    public researchInstitutionService: ResearchInstitutionService,
  ) {}
  
  public filtered: boolean;
  public filtered_researchInst: String[] = [];
  checked_users: string[] = [];
  public researcherUserNames: string[] =[];
  ResearchInstNames: string[] = [];
  researchInstitutionList: FFQResearchInstitutionResponse[];
  researcherList: FFQResearchtResponse[] = []; 
  researchInstitutionLenght: Number;

  ngOnInit() {   
    this.showParticipants = true;
    this.showResearchers = true;    
    this.filtered = false;
    
    this.loadAllUsers(); 
  }

//participants
  toggleParticipants() {
    this.showParticipants = !this.showParticipants;
  }

//researchers
  toggleResearcherUsers() {
    this.showResearchers = !this.showResearchers;
  } 


//filterby research Institution
  filterByResearchInstitution(researchInst_name: string) {
    const index = this.filtered_researchInst.indexOf(researchInst_name);
    if (index === -1) {
      this.filtered_researchInst.push(researchInst_name);
    } else {
      this.filtered_researchInst.splice(index, 1);
    }
    if (this.filtered_researchInst.length == 0) {
      this.filtered = false;
    } else {
      this.filtered = true;
    }
  }

  /* Loads all users from the databases and pushes them into their respective lists to be displayed */
  private loadAllUsers() {
      
    var researchInstList: Observable<
    FFQResearchInstitutionResponse[]> = 
    this.researchInstitutionService.getAllResearchInstitutions();
    researchInstList.subscribe((data) => {
        this.researchInstitutionList = data;
        data.forEach((researchInst) => {
        this.ResearchInstNames.push(researchInst.institutionName);
        this.researchInstitutionLenght = data.length;
      });
    });
     
    var researcherUserList: Observable<
    FFQResearchtResponse[]> = this.researcherService.getAllUsers();
     researcherUserList.subscribe((data) => {
        this.researcherList = data;
        
        for(var i = 0; i < data.length; i++)
      {
        this.researcherUserNames.push(data[i].firstname + " " + data[i].lastname);
      }
    });
  }
}
