import { Injectable } from '@angular/core';
import { Medida } from '../interfaces/medida.interface';

@Injectable({
  providedIn: 'root',
})
export class EstadisticaService {
  private datos: number[] = [];

  public media: Medida = { nombre: 'Media aritmética simple', valor: 0 };
  public moda: Medida = { nombre: 'Moda', valor: 0 };
  public mediana: Medida = { nombre: 'Mediana', valor: 0 };
  public mediaGeometrica: Medida = { nombre: 'Media geométrica', valor: 0 };
  public medidaCentralidad: Medida = {
    nombre: 'Medida de centralidad (Q1, Q2, Q3)',
    valor: 0,
  };
  public varianza: Medida = { nombre: 'Varianza', valor: 0 };
  public desviacionEstandar: Medida = {
    nombre: 'Desviación estándar',
    valor: 0,
  };

  constructor() {
    console.log('Servicio', this.datos);
  }

  calcular(datos: number[]) {
    this.media.valor = this.calcularMedia(datos);
    this.moda.valor = this.calcularModa(datos) || 0;
    this.mediana.valor = this.calcularMediana(datos);
    this.mediaGeometrica.valor = this.calcularMediaGeometrica(datos);
    this.medidaCentralidad.valor = this.calcularCuartiles(datos);
    this.varianza.valor = this.calcularVarianza(datos);
    this.desviacionEstandar.valor = this.calcularDesviacionEstandar(datos);
  }

  // ponera a 0 todas las medidas
  limpiarDatos() {
    this.media.valor = 0;
    this.moda.valor = 0;
    this.mediana.valor = 0;
    this.mediaGeometrica.valor = 0;
    this.medidaCentralidad.valor = 0;
    this.varianza.valor = 0;
    this.desviacionEstandar.valor = 0;
  }

  calcularMedia(datos: number[]): number {
    let suma = 0;
    datos.forEach((dato) => {
      suma += dato;
    });
    return suma / datos.length;
  }

  calcularModa(numeros: number[]): number | undefined {
    const frecuencias = new Map<number, number>();

    numeros.forEach((num) => {
      frecuencias.set(num, (frecuencias.get(num) || 0) + 1);
    });

    let moda: number | undefined;
    let maxFrecuencia = 0;

    frecuencias.forEach((frecuencia, num) => {
      if (frecuencia > maxFrecuencia) {
        moda = num;
        maxFrecuencia = frecuencia;
      }
    });

    return moda;
  }

  calcularMediana(numeros: number[]): number {
    const sortedNumeros = [...numeros].sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedNumeros.length / 2);

    if (sortedNumeros.length % 2 === 0) {
      return (sortedNumeros[middleIndex - 1] + sortedNumeros[middleIndex]) / 2;
    } else {
      return sortedNumeros[middleIndex];
    }
  }

  calcularMediaGeometrica(numeros: number[]): number {
    const product = numeros.reduce((product, num) => product * num, 1);
    return Math.pow(product, 1 / numeros.length);
  }

  calcularMedidaCentralidad(numeros: number[]): number {
    const media = this.calcularMedia(numeros);
    const moda = this.calcularModa(numeros) || 0;
    const mediana = this.calcularMediana(numeros);
    const mediaGeometrica = this.calcularMediaGeometrica(numeros);

    return (media + moda + mediana + mediaGeometrica) / 4;
  }

  calcularCuartiles(numerosArray: number[]): number[] {
    const sortedNumeros = [...numerosArray].sort((a, b) => a - b);

    function calcularInterpolacionLineal(arr: number[], position: number): number {
        const lowerIndex = Math.floor(position);
        const upperIndex = Math.ceil(position);

        const lowerValue = arr[lowerIndex];
        const upperValue = arr[upperIndex];

        return lowerValue + (position - lowerIndex) * (upperValue - lowerValue);
    }

    const q1Position = 0.25 * (sortedNumeros.length - 1);
    const q2Position = 0.5 * (sortedNumeros.length - 1);
    const q3Position = 0.75 * (sortedNumeros.length - 1);

    const q1 = calcularInterpolacionLineal(sortedNumeros, q1Position);
    const q2 = calcularInterpolacionLineal(sortedNumeros, q2Position);
    const q3 = calcularInterpolacionLineal(sortedNumeros, q3Position);

    return [q1, q2, q3];
}

  calcularVarianza(numeros: number[]): number {
    const media = this.calcularMedia(numeros);
    const sumatoria = numeros.reduce((sum, num) => {
      return sum + Math.pow(num - media, 2);
    }, 0);

    return sumatoria / numeros.length;
  }

  calcularDesviacionEstandar(numeros: number[]): number {
    const varianza = this.calcularVarianza(numeros);
    return Math.sqrt(varianza);
  }
}
