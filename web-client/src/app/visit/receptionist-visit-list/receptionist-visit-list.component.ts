import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReceptionistVisit} from "../../data/visit/receptionist-visit";
import {ReceptionistVisitListService} from '../../service/receptionist-visit-list.service'
import {User} from "../../data/user/user";
import {UserService} from "../../service/user.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-receptionist-visit-list',
  templateUrl: './receptionist-visit-list.component.html',
  styleUrls: ['./receptionist-visit-list.component.css']
})
export class ReceptionistVisitListComponent implements OnInit, OnDestroy {

  visitList: ReceptionistVisit[]
  user: User
  userSub: Subscription
  visitSub: Subscription

  constructor(private visitService: ReceptionistVisitListService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userSub =
      this.userService.getAuthenticationEvent().subscribe(user => {
          this.user = user;
          if (this.user != null)
            this.visitSub = this.visitService.getVisits(user.id).subscribe(visits => this.visitList = visits);
        }
      );


  }

  ngOnDestroy(): void {
    if (this.userSub != null)
      this.userSub.unsubscribe()

    if(this.visitSub != null)
      this.visitSub.unsubscribe()
  }


}