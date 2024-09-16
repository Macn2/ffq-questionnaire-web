import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogPopupComponent} from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {ResearchService} from 'src/app/services/research/research-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeletePopupComponent} from "src/app/components/delete-popup/delete-popup.component";
import { FFQResearchtResponse } from "src/app/models/ffqresearch-response";
import { FFQResearch } from 'src/app/models/ffqresearch';
import { FFQResearchInstitutionResponse } from "src/app/models/ffqresearch-institution-response";
import { ResearchInstitutionService } from 'src/app/services/research-institution-service/research-institution-service';


@Component({
  selector: 'app-modify-researcher',
  templateUrl: './modify-researcher.component.html',
  styleUrls: ['./modify-researcher.component.css']
})
export class UpdateResearcherComponent implements OnInit {
  
  dataLoaded: Promise<boolean>;
  public selectedResearcher:FFQResearchtResponse;
  researchAttributes: FFQResearch;
  userPassword: string;
  limitNumberOfParticipants: number;
  AssignedResearchInstitutionName: string;
  AssignedResearchInstitutionId: string;
  researchInstitutionList: FFQResearchInstitutionResponse[];

  constructor(
    private researcherService: ResearchService,
    private researchInstitutionService: ResearchInstitutionService,
    private errorDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit() {     

    const UserID = this.route.snapshot.paramMap.get('id'); 
          
    var researcherResult: Observable<FFQResearchtResponse> = this.researcherService.getUserById(UserID);
    
    researcherResult.subscribe(data => {
      
      this.selectedResearcher = data;        
      this.researchAttributes = this.selectedResearcher;
      this.userPassword = this.researchAttributes.userpassword;
 
      var chosenResearchInstName: Observable<FFQResearchInstitutionResponse> = this.researchInstitutionService.getResearchInstitution(this.researchAttributes.AssignedResearchInstitutionId);

      chosenResearchInstName.subscribe (inst => {
        this.AssignedResearchInstitutionName = inst.institutionName;       
      })
      var researchInstitutionList: Observable<FFQResearchInstitutionResponse[]> = this.researchInstitutionService.getAllResearchInstitutions();
      researchInstitutionList.subscribe(a => {
      this.researchInstitutionList = a;   
            
      if(data != null && a != null)
      { 
        this.dataLoaded = Promise.resolve(true);       
      }     
    });  
       
    })   
    
  }  


  updateResearchInstitution() {   

    var chosenResearchInstName: Observable<FFQResearchInstitutionResponse> = this.researchInstitutionService.getResearchInstitutionByName(this.AssignedResearchInstitutionName);

    chosenResearchInstName.subscribe(inst => {
      this.researchAttributes.AssignedResearchInstitutionId = inst.researchInstitutionId;      

      this.researcherService.updateUser(<FFQResearchtResponse>this.researchAttributes).subscribe(
        data => {        
          this.router.navigateByUrl("/admin/research/users");
          const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
          dialogRef.componentInstance.title = 'Researcher was successfully updated!';
        }
      );
      
    });

 
  }

  deleteResearcher() {
    const confirmDelete = this.modalService.open(DeletePopupComponent);    
    confirmDelete.componentInstance.service = "Researcher";
    confirmDelete.componentInstance.attributes = this.researchAttributes;
  }

  generatePassword() {
    this.userPassword = Math.random().toString(36).slice(-10);
    this.researchAttributes.userpassword =  this.userPassword;
  }
}




