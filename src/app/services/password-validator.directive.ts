import { Directive } from '@angular/core';
import {AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[appPasswordValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true },
  ]
})
export class PasswordValidatorDirective {

  constructor() { }

  static validate(formGroup: FormGroup): {[key: string]: any} {
    console.log('password', formGroup.value.password);
    console.log('confirm password', formGroup.value.passwordConfirm);
    // @ts-ignore
    return formGroup.value.password === formGroup.value.passwordConfirm ? null : {passwordMismatch: true};
  }

  public validate(c: FormGroup): {[key: string]: any} {
     return  PasswordValidatorDirective.validate(c);
  }

}
