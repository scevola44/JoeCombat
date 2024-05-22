import { Component } from '@angular/core';
import { WeaponListing } from '../entities/WeaponListing';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { DamageDiceUtils } from '../utils/damage-dice.utils';

@Component({
  selector: 'app-kether',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule
  ],
  templateUrl: './kether.component.html',
  styleUrl: './kether.component.css'
})
export class KetherComponent {
  deadlyAimActive: boolean = false;
  withinNineMeters: boolean = false;
  isHasted: boolean = false;
  dexMod: number = 5;
  rangeIncrements: number = 0;
  currentSize: number = 1;

  dataSource: WeaponListing[] = [{
    "Name": "Fucile",
    "AttackBonus": 9,
    "DamageDice": "2d12",
    "DamageBonus": 2,
    "DmgMult": 1
  },
  {
    "Name": "Ondata di Fuoco",
    "AttackBonus": 7,
    "DamageDice": "6d6",
    "DamageBonus": 5,
    "DmgMult": 1
  }];

  displayedColumns: string[] = ["Arma", "Attacco", "Danni", "Bonus"];

  calcAttackBonus(bonus: number){
    let deadlyAimMalus = this.deadlyAimActive ? -2 : 0;
    let preciseShotBonus = this.withinNineMeters ? +1 : 0;
    let rangePenalty = -this.rangeIncrements;

    return bonus + this.dexMod + deadlyAimMalus + preciseShotBonus + rangePenalty;
  }

  calcDamageBonus(bonus: number){
    let deadlyAimBonus = this.deadlyAimActive ? 4 : 0;
    let preciseShotBonus = this.withinNineMeters ? +1 : 0;

    return bonus + this.dexMod + deadlyAimBonus + preciseShotBonus;
  }

  toggleBonus(event: any, attack: number, damage: number){
    if (!event.checked) {
      attack = attack * -1;
      damage = damage * -1;
    }
    this.dataSource.forEach(a => {a.AttackBonus += attack; a.DamageBonus += damage});
  }

  getSize(): string {
    return DamageDiceUtils.sizeList[this.currentSize];
  }

  changeSize(modifier: number){
    this.currentSize += modifier;

    this.increaseDamageDice(modifier);
    this.dataSource.forEach(a => {a.AttackBonus += -modifier});
  }

  changeRangeIncrements(steps: number){
    this.rangeIncrements += steps;
    if (this.rangeIncrements > 0) this.withinNineMeters = false;
  }

  increaseDamageDice(modifier: number){
    this.dataSource.forEach(attack => {
      let newDice = DamageDiceUtils.getIncreasedDamageDice(attack.DamageDice, modifier);
      attack.DamageDice = newDice == "4d6" ? "2d12" : newDice;
    });
  }

  adjustDiceForVitalStrike(damageDice: string): string{
    let x = damageDice.split('d');
    let numberOfDice: number = +x[0];
    return numberOfDice*2 + "d" + x[1];
  }

  toggleElementalBody(event: any){
    let modifier = event.checked ? 1 : -1;
    this.changeSize(modifier);

    this.dexMod += modifier*2;
    this.toggleBonus(event, 1, 0);
  }

  toggleHaste(event: any){
    this.isHasted = event.checked;

    this.toggleBonus(event, 1, 0)
  }
}
