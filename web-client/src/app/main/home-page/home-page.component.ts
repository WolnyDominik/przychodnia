import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subscription} from 'rxjs/internal/Subscription'

import {UserService} from '../../service/user.service'
import {User} from '../../data/user/user'
import {Router} from '@angular/router'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  userFullName = ''
  private authSubscription: Subscription
  private user: User

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.authSubscription = this.userService.getAuthenticationEvent().subscribe(
      user => {
        this.user = user
        if (this.user != null)
          this.userFullName = this.user.firstName + ' ' + this.user.lastName
        else
          this.userFullName = ''

      })
  }

  ngOnDestroy(): void {
    if (this.authSubscription != null) this.authSubscription.unsubscribe()
  }



}
