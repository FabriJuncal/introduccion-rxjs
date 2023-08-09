import { Component } from '@angular/core';
import { Observable } from 'rxjs'; // Importamos la librería rxjs para utilizar observables
import { FootballService } from '../../services/football.service'; // Importamos el servicio FootballService

@Component({
  selector: 'app-btn-observables',
  templateUrl: './btn-observables.component.html',
  styleUrls: ['./btn-observables.component.css']
})
export class BtnObservablesComponent {

  constructor(private srvFootball: FootballService){}

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


  // Función para consumir la API utilizando promesas
  unusedObservableApi() {
    // Llamamos al método getTeamsData del servicio FootballService con el país 'argentina'
    this.srvFootball.getTeamsData('argentina')
      .then(data => {
        // Imprimimos los datos de la respuesta en la consola
        console.log(data.response);
      })
      .catch(error => {
        // En caso de error, mostramos un mensaje de error en la consola
        console.error('Error al obtener los datos:', error);
      });
  }

  // Función para consumir la API utilizando observables
  useObservableApi() {
    // Llamamos al método getTeamsDataObservable del servicio FootballService con el país 'argentina'
    this.srvFootball.getTeamsDataObservable('argentina').subscribe(
      data => {
        // Imprimimos los datos de la respuesta en la consola
        console.log(data.response);
      },
      error => {
        // En caso de error, mostramos un mensaje de error en la consola
        console.error('Error al obtener los datos:', error);
      }
    );
  }



}
