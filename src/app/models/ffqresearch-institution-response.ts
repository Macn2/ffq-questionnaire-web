//Class used to store admin user data from response

export class FFQResearchInstitutionResponse {
  id: string;
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
