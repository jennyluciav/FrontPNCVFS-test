import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* PAGES */
import { StatisticsComponent }  from './pages/statistics/statistics.component';
import { MapComponent }         from './pages/map/map.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'mapa',
        pathMatch: 'full'
      },
      {
        path: 'mapa',
        component: MapComponent,
      },
      {
        path: 'estadisticas',
        component: StatisticsComponent,
      }
    ])
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }