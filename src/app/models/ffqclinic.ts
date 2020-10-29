//Classed to store clinic data in components

export class FFQClinic {
  id: string;
  clinicId: string;
  address: string;
  datebuilt: string;
  clinicname: string
  headclinician: string;
  isactive: boolean;
  usersLimit: number;


    constructor(clinicId: string, address: string, datebuilt: string, clinicname: string, headclinician: string, isactive: boolean, usersLimit: number) {
      this.clinicId = clinicId;
      this.address = address;
      this.datebuilt = datebuilt;
      this.clinicname = clinicname;
      this.headclinician = headclinician;
      this.isactive = isactive;
      this.usersLimit = usersLimit;
  }

}
