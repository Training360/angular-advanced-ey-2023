import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.currentUserValue;

  if (!route.data?.['role']) {
    return true;
  }

  if (user?.role && user?.role <= route.data['role']) {
    return true;
  }

  router.navigate(['/forbidden']);
  return false;
};
