import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DamageDiceUtils } from '../../utils/damage-dice.utils';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-size-change-shared',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './size-change-shared.component.html',
  styleUrl: './size-change-shared.component.scss'
})
export class SizeChangeSharedComponent {

  @Input() currentSize!: number;
  @Output() adjust = new EventEmitter<number>();

  getSize(): string {
    return DamageDiceUtils.sizeList[this.currentSize];
  }

  changeSize(modifier: number){
    this.adjust.emit(modifier);
  }
}
