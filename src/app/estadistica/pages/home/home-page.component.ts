import { Component, inject } from '@angular/core';
import { Medida } from '../../interfaces/medida.interface';
import { EstadisticaService } from '../../services/estadistica.service';

@Component({
  selector: 'estadistica-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  private estadisticaService = inject(EstadisticaService);

  public media:               Medida = this.estadisticaService.media;
  public moda:                Medida = this.estadisticaService.moda;
  public mediana:             Medida = this.estadisticaService.mediana;
  public mediaGeometrica:     Medida = this.estadisticaService.mediaGeometrica;
  public medidaCentralidad:   Medida = this.estadisticaService.medidaCentralidad;
  public varianza:            Medida = this.estadisticaService.varianza;
  public desviacionEstandar:  Medida = this.estadisticaService.desviacionEstandar;
}
