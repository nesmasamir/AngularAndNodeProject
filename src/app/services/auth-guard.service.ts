import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login.service';
// import { UserService } from '../_api/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(public loginService: LoginService, public router: Router) { }
    canActivate(): boolean {
        if (!this.loginService.isLoggedIn()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}