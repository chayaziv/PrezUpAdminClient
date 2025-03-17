import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getToken();
  if (authToken) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
    console.log(authToken);
  } else {
    console.log('no token');
    req = req.clone({
      headers: req.headers.set('Authorization', ''),
    });
    console.log(authToken);
  }

  return next(req);
};
