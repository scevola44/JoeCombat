import { Component, Input } from '@angular/core';
import { DamageDiceUtils } from '../../utils/damage-dice.utils';
import { WeaponListing } from '../../entities/WeaponListing';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-size-change-shared',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './size-change-shared.component.html',
  styleUrl: './size-change-shared.component.scss'
})
export class SizeChangeSharedComponent {

  @Input() meleeAttacks!: MatTableDataSource<WeaponListing>;
  @Input() rangedAttacks!: MatTableDataSource<WeaponListing>;
  @Input() currentSize!: number;
  @Input() strengthMod!: number;
  @Input() dexMod!: number;

  getSize(): string {
    return DamageDiceUtils.sizeList[this.currentSize];
  }

  changeSize(modifier: number){
    this.currentSize += modifier;
    this.strengthMod += modifier;
    this.dexMod -= modifier;

    this.increaseDamageDice(modifier);
    this.meleeAttacks.data.forEach(a => {a.AttackBonus += -modifier});
    this.rangedAttacks.data.forEach(a => {a.AttackBonus += -modifier});
  }

  increaseDamageDice(modifier: number){
    this.meleeAttacks.data.forEach(attack => {
      attack.DamageDice = DamageDiceUtils.getIncreasedDamageDice(attack.DamageDice, modifier);
    });

    this.rangedAttacks.data.forEach(attack => {
      attack.DamageDice = DamageDiceUtils.getIncreasedDamageDice(attack.DamageDice, modifier);
    });
  }
}
