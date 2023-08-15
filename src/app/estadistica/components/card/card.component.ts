import { Component, Input } from '@angular/core';
import { Medida } from '../../interfaces/medida.interface';

@Component({
  selector: 'estadistica-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() medida!: Medida;
}
