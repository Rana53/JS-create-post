import { AbstractControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

export const minType = (
  control: AbstractControl
  ): Promise<{ [key: string]: any}> | Observable<{ [key: string]: any}> => {
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObser = Observable.create((observer: Observer<{ [key: string]: any}>) =>{
    fileReader.addEventListener("loadend", () => {

    });
    fileReader.readAsArrayBuffer(file);
  });
}
