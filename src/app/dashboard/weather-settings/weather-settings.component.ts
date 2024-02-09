import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from '../../services/city.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-weather-settings',
  templateUrl: './weather-settings.component.html',
  styleUrl: './weather-settings.component.css'
})
export class WeatherSettingsComponent implements OnInit{
  selectedCities$!: Observable<string[]>;
  weatherData: { [key: string]: Observable<any> } = {}; 

  constructor(private router: Router, private cityService: CityService, private cdr: ChangeDetectorRef, private changeDetector: ChangeDetectorRef) { }


  ngOnInit() {
    this.selectedCities$ = this.cityService.getSelectedCity();
  }

  onBack(): void {
    this.router.navigate(['/weather']);
  }

  goToAddLocation() {
    this.router.navigate(['/add-location']);
  }

  deleteCity(index: number) {
    setTimeout(() => {
      this.cityService.deleteCard(index);
    }, 0);
    this.cdr.detectChanges();
  }

    trackByFn(index: number, city: string): number {
      return index;
    }

    convertToCelsius() {
      for (let city in this.weatherData) {
        this.weatherData[city] = this.weatherData[city].pipe(
          map(data => {
            data.current.apparent_temperature = (data.current.apparent_temperature - 32) * 5/9;
            return data;
          })
        );
      }
    }
    
    convertToFahrenheit() {
      for (let city in this.weatherData) {
        this.weatherData[city] = this.weatherData[city].pipe(
          map(data => {
            data.current.apparent_temperature = data.current.apparent_temperature * 9/5 + 32;
            return data;
          })
        );
      }
    }
    
}
