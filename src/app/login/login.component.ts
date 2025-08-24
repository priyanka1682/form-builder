import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { setRole } from '../state/auth/auth.actions';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private store: Store, private router: Router, private auth: AuthService) {}
  login(role: 'admin'|'user') {
    this.store.dispatch(setRole({ role }));
    this.auth.setRole(role); 
    this.router.navigateByUrl('/templates');
  }
}
