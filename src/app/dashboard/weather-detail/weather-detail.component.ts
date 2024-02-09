import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrl: './weather-detail.component.css'
})
export class WeatherDetailComponent implements OnInit{
  temperatureUnit = 'C';
  cityName!: string;
  cityWeatherData: any;
  constructor(private router: Router, private route: ActivatedRoute, private weatherService: WeatherService, private cityService: CityService) {
    this.cityWeatherData = {};
   }
  
      onBack(): void {
          this.router.navigate(['/weather']);
      }

      ngOnInit() {
        this.route.params.subscribe(params => {
          this.cityName = params['cityName'];
          this.cityService.getCities().subscribe(cities => {
            let city = cities.find(city => city.City === this.cityName);
            if (city) {
              this.weatherService.getWeatherData(city.Latitude.toString(), city.Longitude.toString()).subscribe(data => {
                this.cityWeatherData = data;
              });
            }
          });
        });
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
