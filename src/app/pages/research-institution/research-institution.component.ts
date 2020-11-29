
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ResearchInstitutionService } from 'src/app/services/research-institution-service/research-institution-service';
import { FFQResearchtResponse } from 'src/app/models/ffqresearch-response';
import { FFQResearchParticipant } from 'src/app/models/ffqresearch-participant';
import {FFQResearch} from 'src/app/models/ffqresearch';
import { FFQClinician } from 'src/app/models/ffqclinician';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';
import { ClinicService } from 'src/app/services/clinic/clinic-service';
import { FFQInstitution } from 'src/app/models/ffqinstitution';
import { ResearchService } from 'src/app/services/research/research-service';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from "src/app/components/delete-popup/delete-popup.component";
import { FFQResearchInstitutionResponse } from "src/app/models/ffqresearch-institution-response";


@Component({
  selector: 'app-research-institution',
  templateUrl: './research-institution.component.html',
  styleUrls: ['./research-institution.component.css']
})
export class ResearchInstitutionComponent implements OnInit {

  private routeSub: Subscription;
  private isNew: boolean;
  private isUpdate: boolean;
  showMsg: boolean = false;
  institutionName: string;
  location: string;
  resultObjectList: Object[] = [];

  constructor(
    public researcherService: ResearchService,
    public researchInstitutionService: ResearchInstitutionService,
    private errorDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal

    ) { }


  researcher: FFQResearchtResponse[] = []; 
  researchInstitutionAttributes: object;
  dataLoaded: Promise<boolean>;
  ffqinsitution: FFQResearchInstitutionResponse;
  public ffqresearcherList: FFQResearch[] = [];
  public ffqresearchInstList: FFQResearchInstitutionResponse[] = [];
  researcherNames: string[] = [];

  ngOnInit() {

   }

  addResearchInstitution(form:NgForm){

   var todayDate = new Date();
   var dd = String(todayDate.getDate()).padStart(2, '0');
   var mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
   var yyyy = todayDate.getFullYear();
   var today = mm + '/' + dd + '/' + yyyy;


  var researchInstitutionList: Observable<FFQResearchInstitutionResponse[]> = this.researchInstitutionService.getAllResearchInstitutions();
  console.log(researchInstitutionList);
  
       researchInstitutionList.subscribe(data => {
      var newResearchInstId = (data.length+1).toString();
      
      
     console.log(newResearchInstId,this.location, today, 
                this.institutionName);
                
      this.ffqinsitution = new FFQResearchInstitutionResponse(newResearchInstId, this.location, today, 
                this.institutionName, "researchInstitution");         
 
 console.log(this.ffqinsitution);
                
      this.researchInstitutionService.addUser(this.ffqinsitution).subscribe(data => {         
          this.router.navigateByUrl('/admin/research/users');
          const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
          dialogRef.componentInstance.title = 'Research Institution: "' + this.ffqinsitution.institutionName + '" was added!';
      },
      error =>{
          const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
          dialogRef.componentInstance.title = error.error.message;
      });

    });
}

  private getResearchInstById(id: string)
  {
      this.researchInstitutionService.getResearchInstitution(id).subscribe(data => {
       this.researchInstitutionAttributes = data;
      });
      this.dataLoaded = Promise.resolve(true);
  }



  updateResearchInstitution()
  {
    this.researchInstitutionService.updateUser(<FFQResearchInstitutionResponse>this.ffqinsitution).subscribe(
     data => {this.router.navigateByUrl('admin/research/users');
     const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
     dialogRef.componentInstance.title = 'Research Institution successfully updated!';}

    );
  }

  deleteResearchInstitution(){
    const confirmDelete = this.modalService.open(DeletePopupComponent);
    confirmDelete.componentInstance.service = "research_institution";
    confirmDelete.componentInstance.attributes = this.researchInstitutionAttributes;
  }
}




