import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerationForm: FormGroup;
  errormsg: string = '';
  newerrornessage: boolean = false;
  constructor(
    private RegisterService: RegisterService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.registerationForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
      ]),
      password: new FormControl('', [Validators.required]),
      // address: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zipcode: new FormControl('', Validators.required),
      // })
    });
  }

  // get city() {
  //   return this.registerationForm.get('address')?.get('city');
  // }

  onSubmit(form: FormGroup) {
    console.log(form.value);
    if (form.valid) {
      this.RegisterService.createUser(form.value).subscribe(
        (result) => {
          this.router.navigate(['login'])
          form.reset();
        },
        (error) => {
          if (error.message) {
            this.newerrornessage = true;
            this.errormsg = 'this email is exist';
            form.reset();
          }
        }
      );
    }
  }
}