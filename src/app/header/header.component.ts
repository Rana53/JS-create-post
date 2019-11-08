import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
  onLoading = false;
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

  onLogout(){
    this.onLoading = true;
    this.userIsAunthenticated = false;
    this.authService.logout();
    this.onLoading = false;
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}