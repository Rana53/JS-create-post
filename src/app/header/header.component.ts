import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
  private authListenerSubs: Subscription;
  userIsAunthenticated = false;
  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    this.authListenerSubs = this.authService
      .getAuthStatus()
      .subscribe(isAuthenticated => {
        this.userIsAunthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}