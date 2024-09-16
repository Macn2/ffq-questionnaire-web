
import { Component, OnInit } from '@angular/core';
import { FFQClinic } from 'src/app/models/ffqclinic';
import { FFQParent } from 'src/app/models/ffqparent';
import { FFQClinician } from 'src/app/models/ffqclinician';
import { Observable } from 'rxjs';
import { FFQResearchtResponse } from 'src/app/models/ffqresearch-response'; 
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response'; // change to research add institution response
import { ResearchService } from 'src/app/services/research/research-service';
import { ParentService } from 'src/app/services/parent/parent-service';
import { ClinicianService } from 'src/app/services/clinician/clinician-service'; // change to research add institution service
import { ClinicianPipe } from 'src/app/pipes/clinicianFilter.pipe'; // change to research add ResearchPipe
import { ParentPipe } from 'src/app/pipes/parentFilter.pipe';

@Component({
  templateUrl: './admin-researchers.component.html',
  styleUrls: ['./admin-researchers.component.css']
})

export class AdminResearchersComponent implements OnInit {

  constructor(

    public researcherService: ResearchService,
    public clinicianService: ResearchService,
    public parentService: ResearchService
  ){}

  public ffqresearcherLocationList: FFQClinic[] = []; // change to research
  public ffqresearcherList: FFQClinician[] = []; // change to research
  public ffqparentList: FFQParent[] = [];
  public researcherNames: string[] =[];


  /* Loads all the data necessary to fill out the table in the html component */
  ngOnInit() {

    this.researcherNames.push("");

    const clinicList: Observable<FFQClinicResponse[]> = this.clinicService.getAllClinics();
    clinicList.subscribe(a => {
      this.ffqresearcherLocationList = a;
      //console.log(a);
    });

    var clinicianList: Observable<FFQClinicianResponse[]> = this.clinicianService.getAllClinicians();
    clinicianList.subscribe(a => {
      this.ffqresearcherLocationList = a;
      for(var i = 0; i < a.length; i++)
      {
        this.researcherNames.push(a[i].abbreviation + " " + a[i].firstname + " " + a[i].lastname);
      }
      //console.log(a);
    });

    var parentList: Observable<FFQParentResponse[]> = this.parentService.getAllParents();
    parentList.subscribe(a => {
      this.ffqparentList = a;
      //console.log(a);
    });

  }
}
