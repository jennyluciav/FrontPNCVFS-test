import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

/* THIRD PARTY MODULE */
import { AppRoutingModule } from './app-routing.module';

/* COMPONENTS */
import { AppComponent } from './app.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { MapComponent } from './pages/map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    StatisticsComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
