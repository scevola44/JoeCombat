import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-armor-class-shared',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule
  ],
  templateUrl: './armor-class-shared.component.html',
  styleUrl: './armor-class-shared.component.scss'
})
export class ArmorClassSharedComponent {

  @Input() isAgainstTouch!: boolean;
  @Input() dexMod!: number;
  @Input() armorBonus!: number;
  @Input() shieldBonus!: number;
  @Input() currentSize!: number;
  @Input() untypedAcBonus!: number;
  @Input() isHasted!: boolean;
  @Input() dodgeBonus!: number;

  getArmorClass(){
    let armorClass = 10
    + (1 - this.currentSize)
    + this.dexMod + (this.isAgainstTouch ? 0 : this.armorBonus + this.shieldBonus)
    + (this.isHasted ? 1 : 0)
    + this.untypedAcBonus
    + this.dodgeBonus;

    return armorClass;
  }
}
