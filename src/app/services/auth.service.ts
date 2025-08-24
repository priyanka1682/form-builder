// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private role: 'admin' | 'user' | null = localStorage.getItem('role') as any;

  setRole(role: 'admin' | 'user') {
    this.role = role;
    localStorage.setItem('role', role); // keeps it after refresh
  }

  getRole(): 'admin' | 'user' | null {
    return this.role ?? (localStorage.getItem('role') as any);
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  clear() {
    this.role = null;
    localStorage.removeItem('role');
  }
}
