import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CityService } from '../../services/city.service';
import { FormControl, Validators } from '@angular/forms';
import { City } from '../../../assets/City';
import { WeatherDetailComponent } from '../weather-detail/weather-detail.component';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrl: './add-location.component.css'
})
export class AddLocationComponent implements OnInit{
  cities: City[] = [];
  weatherData: any;
  selectedCity: number | null = null;
  selectedCityObject: { ZipCode: number, City: string, State: string, Latitude: number, Longitude: number } | null = null;
  @Output() citySelected = new EventEmitter<any>();
  isAddLocationVisible: boolean = false;

  constructor(private cityService: CityService, private weatherService: WeatherService, private router: Router) {}

  ngOnInit() {
    this.cityService.getCities().subscribe((cities: City[]) => {
      this.cities = cities;
    });
    
  }


  onCityChange(zipCode: number) {
    
    const cityObject = this.cities.find(city => city.ZipCode === zipCode);
  this.selectedCityObject = cityObject ? cityObject : null;
    
    if (this.selectedCityObject) {
      if (this.selectedCityObject) {
        this.weatherService.getWeatherData(this.selectedCityObject.Latitude.toString(), this.selectedCityObject.Longitude.toString()).subscribe(data => {
          this.weatherData = data;
          this.citySelected.emit({ city: this.selectedCityObject, weatherData: this.weatherData });
        });
      }
    }
  }


  getCityName(zipCode: number): string {
    const city = this.cities.find(city => city.ZipCode === zipCode);
    return city ? city.City : '';
  }


  saveLocation(): void {
    if (this.selectedCity !== null) {
      const cityName = this.getCityName(this.selectedCity);
      this.cityService.setSelectedCity(cityName);
      this.cityService.incrementCardCount();
      
    }
  this.router.navigate(['/weather']);
  }

  onCancel(): void {
    this.router.navigate(['/weather']);
  }

  openAddLocation() {
    this.isAddLocationVisible = true;
  }
  
  closeAddLocation() {
    this.isAddLocationVisible = false;
  }

}
