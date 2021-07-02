import { FormControl, FormGroup, Validators } from '@angular/forms';

export class Forms {
  public loginForm: FormGroup;
  public createAccountForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.maxLength(12)]),
      'password': new FormControl('', [Validators.required])
    });

    this.createAccountForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.maxLength(12)]),
      'password': new FormControl('', [Validators.required, Validators.maxLength(64)]),
      'confirmPassword': new FormControl('', [Validators.required, Validators.maxLength(64)]),
      'email': new FormControl('', [Validators.email]),
    }, {
      validators: this.passwordsMatch
    });
  }

  passwordsMatch(group: FormGroup)
  {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }
}
