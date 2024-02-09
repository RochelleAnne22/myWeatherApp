import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, map } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { City } from '../../assets/City';

export interface CityCard {
    id: number;
    name: string;
  }

@Injectable({
    providedIn: 'root'
  })

export class CityService{

    constructor(private http: HttpClient) { }
    private selectedCities = new BehaviorSubject<string[]>([]);;
    private cardCount = new BehaviorSubject<number>(0);
    cardCount$ = this.cardCount.asObservable();

    getCities(): Observable<City[]>{
        return this.http.get<City[]>('/assets/cities.json');
    }

    setSelectedCity(city: string) {
        const currentCities = this.selectedCities.getValue();
        if (currentCities && currentCities.length < 6 ) {
          this.selectedCities.next([...currentCities, city]);
        }
    }

    getSelectedCity() {
        return this.selectedCities.asObservable();
    }

    incrementCardCount() {
        this.cardCount.next(this.cardCount.value + 1);
      }

      deleteCard(index: number) {
        const currentCities = this.selectedCities.getValue();
        if (index >= 0 && index < currentCities.length) {
          currentCities.splice(index, 1);
          this.selectedCities.next(currentCities);
        }
        
      }
}