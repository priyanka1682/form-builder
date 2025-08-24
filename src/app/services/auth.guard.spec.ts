import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { adminGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('adminGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAdmin']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
  });

  it('should allow when admin', () => {
    authServiceSpy.isAdmin.and.returnValue(true);
    const guard = TestBed.inject<any>(adminGuard);
    expect(guard.canActivate()).toBeTrue();
  });

  it('should block and redirect when not admin', () => {
    authServiceSpy.isAdmin.and.returnValue(false);
    const guard = TestBed.inject<any>(adminGuard);
    expect(guard.canActivate()).toBeFalse();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
