import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'http://localhost:5015/api/'; // ה-URL הבסיסי שלך
  const apiReq = req.clone({ url: `${baseUrl}${req.url}` });
  return next(apiReq);
};
