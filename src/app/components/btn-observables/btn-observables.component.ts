import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-btn-observables',
  templateUrl: './btn-observables.component.html',
  styleUrls: ['./btn-observables.component.css']
})
export class BtnObservablesComponent {

  useObservable() {
    // Creamos un nuevo Observable que recibe una función llamada 'subscriber'
    const observable = new Observable(subscriber => {
      // Emitimos el valor 'Hola' al suscriptor
      subscriber.next('Hola');
      // Después de 1 segundo, emitimos el valor 'Mundo' al suscriptor
      setTimeout(() => subscriber.next('Mundo'), 1000);
      // Después de 2 segundos, completamos el Observable
      // (No se ejecutará por que nos vamos a desuscribir antes de que se ejecute la función)
      setTimeout(() => subscriber.complete(), 2000);
    });

    // Nos suscribimos al Observable y proporcionamos un objeto con funciones de devolución de llamada
    const subscription = observable.subscribe({
      // Esta función se ejecutará cuando el Observable emita un valor ('Hola' o 'Mundo')
      next: value => console.log(value),
      // Esta función se ejecutará cuando el Observable se complete
      // (No se ejecutará por que nos vamos a desuscribir antes de que se ejecute la función)
      complete: () => console.log('Completo')
    });

    // Para cancelar la suscripción después de 1.5 segundos
    setTimeout(() => {
      // Cancelamos la suscripción para dejar de recibir más valores del Observable
      subscription.unsubscribe();
      console.log('Suscripción cancelada');
    }, 1500);
  }


  unusedObservable() {
    // Definimos una función asincrónica personalizada llamada myAsyncFunction
    function myAsyncFunction(onNext: any, onComplete: any) {
      // Emitimos el valor 'Hola' al llamar a onNext
      onNext('Hola');
      // Después de 1 segundo, emitimos el valor 'Mundo' al llamar a onNext
      setTimeout(() => onNext('Mundo'), 1000);
      // Después de 2 segundos, llamamos a onComplete para indicar que la tarea está completa
      setTimeout(() => onComplete(), 2000);
    }

    // Variable para controlar si debemos cancelar la suscripción
    let shouldCancel = false;

    // Creamos una Promesa para manejar la ejecución asincrónica
    const promise = new Promise<void>((resolve) => {
      // Llamamos a la función asincrónica "myAsyncFunction"
      myAsyncFunction(
        // Definimos una función de devolución de llamada para manejar los valores emitidos
        (value: any) => {
          // Comprobamos si debemos cancelar la suscripción
          if (shouldCancel) {
            console.log('Promesa cancelada');
            return;
          }
          console.log(value);
        },
        // Definimos una función de devolución de llamada para manejar la finalización del proceso
        () => {
          console.log('Completo');
          // Resolvemos la Promesa para indicar que todas las operaciones están completas
          resolve();
        }
      );
    });

    // Para cancelar la suscripción después de 1.5 segundos
    setTimeout(() => {
      shouldCancel = true;
    }, 1500);

    // Cuando la Promesa se resuelva, mostramos un mensaje
    promise.then(() => {
      console.log('Todas las operaciones completadas');
    });
  }



}
