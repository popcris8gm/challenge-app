import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phoneNumber' })
export class PhoneNumberPipe implements PipeTransform {
  transform(value: string): string {

    return value ? `(${value.substring(0, 4)}) ${value.substring(3, 6)} ${value.substring(6)}` : '';
  }
}
