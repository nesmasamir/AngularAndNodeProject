import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(public loginService: LoginService, public router: Router) { }
    canActivate(): boolean {
        if (this.loginService.isLoggedIn()) {
            this.router.navigate(['products']);
            return false;
        }
        return true;
    }
}
