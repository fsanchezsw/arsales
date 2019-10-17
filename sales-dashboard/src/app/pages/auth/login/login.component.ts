import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonProvider } from 'src/providers/person.provider';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/services/toolbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;
  hiddenPass = true;

  constructor(
    private formBuilder: FormBuilder,
    private toolbarService: ToolbarService,
    private personProvider: PersonProvider,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: [, Validators.email],
      password: []
    });
  }

  ngOnInit() {
    this.toolbarService.setOptions(null);
  }

  onSubmit() {
    const { email, password } = this.form.value;
    this.personProvider.login(email, password).subscribe(token => {
      this.authenticationService.setToken(token.id);
      this.router.navigate([`/shops`], { replaceUrl: true });
    }, err => this.errorMessage = 'Usuario y/o contraseña incorrectos');
  }
}
