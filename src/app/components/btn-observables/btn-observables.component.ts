import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-btn-observables',
  templateUrl: './btn-observables.component.html',
  styleUrls: ['./btn-observables.component.css']
})
export class BtnObservablesComponent {

  useObservable(){
    const observable = new Observable(subscriber => {
      subscriber.next('Hola');
      setTimeout(() => subscriber.next('Mundo'), 1000);
      setTimeout(() => subscriber.complete(), 2000);
    });

    const subscription = observable.subscribe({
      next: value => console.log(value),
      complete: () => console.log('Completo')
    });

    // Para cancelar la suscripción después de 1.5 segundos
    setTimeout(() => {
      subscription.unsubscribe();
      console.log('Suscripción cancelada');
    }, 1500);
  }

  // unusedObservable(){
  //   const myAsyncFunction = (onNext: any, onComplete: any) => {
  //     onNext('Hola');
  //     setTimeout(() => onNext('Mundo'), 1000);
  //     setTimeout(() => onComplete(), 2000);
  //   };

  //   const subscription = {
  //     unsubscribe: () => { /* implementación vacía */ }
  //   };

  //   myAsyncFunction(
  //     (value: any) => {
  //       console.log(value);
  //       if (/* condición para cancelar */) {
  //         subscription.unsubscribe();
  //         console.log('Suscripción cancelada');
  //       }
  //     },
  //     () => console.log('Completo')
  //   );
  // }

}
