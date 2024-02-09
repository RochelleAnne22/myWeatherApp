import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherCardComponent } from './dashboard/weather-card/weather-card.component';
import { AddLocationComponent } from './dashboard/add-location/add-location.component';
import { WeatherSettingsComponent } from './dashboard/weather-settings/weather-settings.component';
import { WeatherDetailComponent } from './dashboard/weather-detail/weather-detail.component';

export const routes: Routes = [
    { path: 'weather', component: WeatherCardComponent },
    { path: 'add-location', component: AddLocationComponent},
    { path: 'settings', component: WeatherSettingsComponent},
    { path: 'detail/:cityName', component: WeatherDetailComponent},
    { path: 'detail', component: WeatherDetailComponent},
    { path: '', redirectTo: '/weather', pathMatch: 'full' },
    { path: '**', redirectTo: '/weather' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }