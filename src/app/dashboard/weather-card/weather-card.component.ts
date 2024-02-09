import { ChangeDetectorRef, Component, Input, HostListener, OnInit } from '@angular/core';
import { CityService } from '../../services/city.service';
import { WeatherService } from '../../services/weather.service';
import { Observable, from } from 'rxjs';
import { City } from '../../../assets/City';

interface CityWithWeatherData extends City {
  weatherData?: any; // Replace 'any' with the type of your weather data
}

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.css'
})
export class WeatherCardComponent implements OnInit{
  selectedCities: string[] = [];
  selectedCityData: City[] = [];
  weatherData: { [key: string]: Observable<any> } = {}; 
  weatherDataArray: any[] = [];
  cols: number;
  rowHeight = '350px';



  constructor(private cityService: CityService, private weatherService: WeatherService, private changeDetector: ChangeDetectorRef) { 
    this.cols = 3;
    this.setCols();
  }
  @Input() cityData: any;

  ngOnInit() {
    let lastSelectedCity = localStorage.getItem('selectedCity');

    this.cityService.getSelectedCity().subscribe(cityNames => {
      if (lastSelectedCity && !cityNames.includes(lastSelectedCity)) {
        cityNames.push(lastSelectedCity);
      }

    this.cityService.getSelectedCity().subscribe(cityNames => {
      this.cityService.getCities().subscribe(cities => {
        this.selectedCityData = cities.filter(city => cityNames.includes(city.City));
        this.selectedCityData.forEach(city => {
          this.weatherData[city.City] = this.weatherService.getWeatherData(city.Latitude.toString(), city.Longitude.toString());
        });
        this.weatherDataArray = Object.values(this.weatherData);
      });
    });

    if (cityNames.length > 0) {
      localStorage.setItem('selectedCity', cityNames[cityNames.length - 1]);
    }
  });
  }

  ngOnChanges() {
    if (this.cityData && this.cityData.weatherData) {
      this.weatherData = this.cityData.weatherData;
    }
  }

  getWeatherIcon(weather_code: number, localTime: string): string {
    let date = new Date(localTime);
    let hours = date.getUTCHours();
    let isDayTime = hours > 6 && hours < 18;


    if ([0, 1, 2, 3].includes(weather_code)) {
      if (isDayTime) {
        return '../../../assets/Sunny/sun_3750217.png';
      } else {
        return '../../../assets/Sunny/full-moon_3750247.png';
      }
    } else if ([45,48].includes(weather_code)) {
      return '../../../assets/Foggy/fog_7284137.png';
    } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weather_code)) {
      return '../../../assets/Rainy/rainy_3750349.png';
    } else if ([56, 57, 66, 67].includes(weather_code)) {
      return '../../../assets/Snowy/snow_2204358.png';
    } else if ([71, 73, 75, 77, 85, 86].includes(weather_code)) {
      return '../../../assets/Snowy/snowy_3750438.png';
    } else if ([95, 96, 97].includes(weather_code)) {
      return '../../../assets/Stormy/thunderstorm_3750399.png';
    } else {
      return ''; // default image or null
    }
  }

  getWeatherLabel(weatherCode: number): string {
    switch (weatherCode) {
      case 0:
      case 1:
      case 2:
      case 3:
        return 'Clear/Sunny';
      case 45:
      case 48:
        return 'Foggy';
      case 51:
      case 53:
      case 55:
      case 61:
      case 63:
      case 65:
      case 80:
      case 81:
      case 82:
        return 'Rainy';
      case 56:
      case 57:
      case 66:
      case 67:
        return 'Freezing Drizzle/Rain';
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        return 'Snowy';
      case 95:
      case 96:
      case 99:
        return 'Thunderstorm';
      default:
        return 'Unknown';
    }
  }
 

  temperatureInCelsius: boolean = true;

  toggleTemperatureUnit() {
    this.temperatureInCelsius = !this.temperatureInCelsius;
  }


  getTemperature() {
    this.weatherData['key'].subscribe(data => {
      if (this.temperatureInCelsius) {
        return this.convertToCelsius(data.current.apparent_temperature);
      } else {
        return this.convertToFahrenheit(data.current.apparent_temperature);
      }
    });
  }

  convertToCelsius(fahrenheit: number) {
    return (fahrenheit - 32) * 5/9;
  }
  
  convertToFahrenheit(celsius: number) {
    return celsius * 9/5 + 32;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setCols();
  }


  setCols() {
    if (window.innerWidth <= 768) {
      this.cols = 1;
  }
}

convertDate(timeString: string): string {
  let date = new Date(timeString);

  let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let day = date.getUTCDate();
  let month = monthNames[date.getUTCMonth()];
  let year = date.getUTCFullYear();
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();

  let period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `${month}/${day < 10 ? '0' + day : day}/${year} - ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;

}
}
