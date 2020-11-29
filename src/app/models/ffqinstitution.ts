export class FFQInstitution {
    
  researchInstitutionId: string;
	address: string;
	createdDate: string;
	institutionName: string;
	siteType: string;	
  
  
    constructor(researchInstitutionId: string, address: string, createdDate: string, institutionName:string, siteType: string) {
      this.researchInstitutionId = researchInstitutionId;
      this.address = address;
      this.createdDate = createdDate;
      this.institutionName = institutionName;
      this.siteType = siteType;
      
    }
  
  }