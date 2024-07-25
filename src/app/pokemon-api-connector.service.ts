import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PokemonApiConnectorService {
  private apiUrl = environment.apiUrl;
  error: string | null = null;

  constructor(private http: HttpClient) { }

  getPokemonList() : Observable<any> {
    return this.http.get<any>(this.apiUrl + "/landing").pipe(
      catchError(err => {
        this.error = 'Failed to load Pokémon list';
        return of([]);
      })
    );
  }

  getPokemonDetails(name: string | null): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/details/${name}`).pipe(
      catchError(err => {
        this.error = 'Failed to load Pokémon details';
        return of({});
      })
    )
  }
}
