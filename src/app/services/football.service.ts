// Importamos las clases e interfaces necesarias de Angular
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios'; // Importamos la biblioteca Axios para hacer solicitudes HTTP

@Injectable({
  providedIn: 'root'
})
export class FootballService {

  // Definimos los encabezados requeridos para las solicitudes a la API
  private headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': 'c241f628f506820400c25626d0bb6ba2'
  };

  constructor() { }

  // Método para obtener los datos de la API como un Observable de RxJS
  getTeamsDataObservable(country: string): Observable<any> {
    // Construimos la URL de la API con el país proporcionado
    const apiUrl = `https://v3.football.api-sports.io/teams?country=${country}`;

    // Creamos un nuevo Observable para manejar la solicitud
    return new Observable(subscriber => {
      // Realizamos una solicitud GET a la API utilizando Axios
      axios.get(apiUrl, { headers: this.headers })
        .then(response => {
          // Emitimos los datos recibidos al suscriptor
          subscriber.next(response.data);
          // Indicamos que la operación ha finalizado
          subscriber.complete();
        })
        .catch(error => {
          // Si ocurre un error, notificamos al suscriptor
          subscriber.error(error);
        });
    });
  }

  // Método para obtener los datos de la API utilizando promesas
  getTeamsData(country: string): Promise<any> {
    // Construimos la URL de la API con el país proporcionado
    const apiUrl = `https://v3.football.api-sports.io/teams?country=${country}`;

    // Realizamos una solicitud GET a la API utilizando Axios
    return axios.get(apiUrl, { headers: this.headers })
      .then(response => response.data) // Devolvemos los datos de la respuesta
      .catch(error => {
        // Si ocurre un error, lanzamos una excepción para manejarlo en el componente
        throw error;
      });
  }
}
