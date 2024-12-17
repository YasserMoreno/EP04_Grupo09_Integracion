import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/loginService/login.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  if(loginService.isLoggedIn()){
    return true;
  }

  router.navigate(['/login']);
  return false;

};
