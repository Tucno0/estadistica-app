import { Component, ElementRef, ViewChild } from '@angular/core';
import { EstadisticaService } from 'src/app/estadistica/services/estadistica.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @ViewChild('datosTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  public error: boolean = false;

  constructor(private estadisticaService: EstadisticaService) {}

  calcular() {
    const newTag = this.tagInput.nativeElement.value;

    if (newTag.trim().length === 0) {
      return;
    }

    this.procesarDatos(newTag);

    // this.estadisticaService.searchTag(newTag);
  }

  limpiar() {
    this.tagInput.nativeElement.value = '';
    this.error = false;
    this.estadisticaService.limpiarDatos();
  }

  procesarDatos(datos: string) {
    const arregloDatos: number[] = datos.split(',').map(valor => parseFloat(valor.trim()))

    for (const num of arregloDatos) {
      if (isNaN(num)) {
        this.error = true;
        return;
      }
    }

    if (this.error) {
      return;
    }

    this.estadisticaService.calcular(arregloDatos);

    // console.log(arregloDatos);

    // this.estadisticaService.agregarDatos(arregloDatos);
  }
}
