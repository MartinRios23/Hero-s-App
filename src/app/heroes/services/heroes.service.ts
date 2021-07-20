import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroes } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getHeroes(): Observable<Heroes[]>{
    return this.http.get<Heroes[]>(`${this.baseUrl}/heroes`);
  }

  getHeroId(id: string):Observable<Heroes>{
    return this.http.get<Heroes>(`${this.baseUrl}/heroes/${id}`);
  }

  getAutocomplete(termino:string):Observable<Heroes[]>{
    return this.http.get<Heroes[]>(`${this.baseUrl}/heroes/?q=${termino}&_limit=6`);
  }

  addHeroe(heroe:Heroes):Observable<Heroes>{
    return this.http.post<Heroes>(`${this.baseUrl}/heroes/`, heroe);
  }

  refreshHeroe(heroe:Heroes):Observable<Heroes>{
    return this.http.put<Heroes>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
  }

  deleteHeroe(id:string):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`);
  }
}
