//Class used to store participant user data from response

import {FFQItemResponse} from './ffqitem-response';
import { ObjectUnsubscribedError } from 'rxjs';

export class FFQParticipantResponse {
  id: string;
  userId: string;
  username: string;
  userpassword: string;
  usertype: string;
  firstname: string;
  lastname: string;
  assignedResearcherInst: string;
  assignedResearcherUsers: string[];
  childrennames: string[];
  isactive: boolean;


  constructor(userId: string, username: string, userpassword: string, usertype: string, firstname: string, lastname: string, assignedResearcherInst: string, assignedResearcherUsers: string[], childrennames: string[], isactive: boolean){
    this.userId = userId;
    this.username = username;
    this.userpassword = userpassword;
    this.usertype = usertype;
    this.firstname = firstname;
    this.lastname = lastname;
    this.assignedResearcherInst = assignedResearcherInst;
    this.assignedResearcherUsers = assignedResearcherUsers;
    this.childrennames = childrennames;
    this.isactive = isactive;
  }

}
