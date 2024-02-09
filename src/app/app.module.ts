import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './shared/header/header.component';
import { AddLocationComponent } from './dashboard/add-location/add-location.component';
import { WeatherCardComponent } from './dashboard/weather-card/weather-card.component';
import { WeatherDetailComponent } from './dashboard/weather-detail/weather-detail.component';
import { WeatherSettingsComponent } from './dashboard/weather-settings/weather-settings.component';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddLocationComponent,
    WeatherCardComponent,
    WeatherDetailComponent,
    WeatherSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
