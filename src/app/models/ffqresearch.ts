//Classed to store admin user data in components

export class FFQResearch {
  id: string;
  userId: string;
  username: string;
  userpassword: string;
  usertype: string;
  firstname: string;
  lastname: string;
  isactive: boolean;
  AssignedResearchInstitutionId: string;
  limitNumberOfParticipants: number;


  constructor(userId: string, username: string, userpassword: string, usertype:string, firstname: string, lastname: string, isactive: boolean, AssignedResearchInstitutionId: string, limitNumberOfParticipants: number) {
    this.userId = userId;
    this.username = username;
    this.userpassword = userpassword;
    this.usertype = usertype;
    this.firstname = firstname;
    this.lastname = lastname;
    this.AssignedResearchInstitutionId = AssignedResearchInstitutionId;
    this.limitNumberOfParticipants = limitNumberOfParticipants;
    this.isactive = isactive;
  
  }

}
