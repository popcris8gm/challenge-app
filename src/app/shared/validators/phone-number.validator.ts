import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

const regex: RegExp = new RegExp(`^(?=0[723][2-8]\\d{7})(?!.*(.)\\1{2,}).{10}$`);

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl) => {

    return regex.test(control.value) ? null : { invalidPhoneNumber: true };
  };
}
