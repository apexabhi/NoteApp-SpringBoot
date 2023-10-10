import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";


//to handling token verification by adding bearer token to header
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private api: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.api.getToken();
        console.log("adding token to header");
        if (token != null) {
            authReq = authReq.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
               
            });
        }
        return next.handle(authReq);
    }

}

export const authInterceptorProviders = [
    {
        provide:HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
]