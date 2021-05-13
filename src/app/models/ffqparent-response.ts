//Class used to store parent user data from response

import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQParentResponse {
  id: string;
  userId: string;
  username: string;
  userpassword: string;
  usertype: string;
  firstname: string;
  lastname: string;
  assignedclinic: string;
  assignedclinician: string;
  childrennames: any;
  isactive: boolean;
  prefix: string;
  assignedClinicOrSiteId: string;


  constructor(userId: string, username: string, userpassword: string, usertype:string, firstname: string,
              lastname: string, assignedclinic: string, assignedclinician: string, childrennames: any, isactive: boolean, prefix: string) {
    this.userId = userId;
    this.username = username;
    this.userpassword = userpassword;
    this.usertype = usertype;
    this.firstname = firstname;
    this.lastname = lastname;
    this.assignedclinic = assignedclinic;
    this.assignedclinician = assignedclinician;
    this.childrennames = childrennames;
    this.isactive = isactive;
    this.prefix = prefix;
  }

}
