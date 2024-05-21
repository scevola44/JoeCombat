import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { DamageDiceUtils } from '../utils/damage-dice.utils';

@Component({
  selector: 'app-melee-table',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './melee-table.component.html',
  styleUrl: './melee-table.component.css'
})
export class MeleeTableComponent {
  displayedColumns: string[] = ["Arma", "Attacco", "Danni", "Bonus"];

  dataSource: WeaponAttack[] = [{
    "Name": "mazza",
    "AttackBonus": 8,
    "Damage": "1d10",
    "DamageBonus": 1,
    "DmgMult": 1.5
  },
  {
    "Name": "altra arma",
    "AttackBonus": 5,
    "Damage": "1d6",
    "DamageBonus": 1,
    "DmgMult": 1
  }];

  strengthMod: number = +4;
  currentSize: number = 1;
  powerAttack: boolean = false;
  secondAttack: boolean = false;

  calcDamageBonus(bonus: number, multiplier: number){
    return Math.floor(this.strengthMod*multiplier + bonus);
  }

  calcAttackBonus(bonus: number){
    return bonus + this.strengthMod;
  }

  getSize(): string {
    return DamageDiceUtils.sizeList[this.currentSize];
  }

  changeSize(modifier: number){
    this.currentSize += modifier;
    this.strengthMod += modifier;

    this.increaseDamageDice(modifier);
    this.dataSource.forEach(a => {a.AttackBonus += -modifier});
  }

  toggleLeadBlades(event: any){
    let modifier = event.checked ? 1 : -1;

    this.increaseDamageDice(modifier);
  }

  increaseDamageDice(modifier: number){
    this.dataSource.forEach(attack => {
      attack.Damage = DamageDiceUtils.increaseDamageDice(attack.Damage, modifier);
    });
  }

  toggleElementalBody(event: any){
    let modifier = event.checked ? 1 : -1;
    this.changeSize(modifier);

    this.strengthMod += modifier*2;
  }

  toggleBonus(event: any, attack: number, damage: number){
    if (!event.checked) {
      attack = attack * -1;
      damage = damage * -1;
    }
    this.dataSource.forEach(a => {a.AttackBonus += attack; a.DamageBonus += damage});
  }

  toggleStrengthBonus(event: any, strengthChange: number){
    let strengthBon = event.checked ? strengthChange : -strengthChange;

    this.strengthMod += strengthBon;
  }

  toggleSecondAttack(event: any){
    this.secondAttack = event.checked;
    let attackBonus = -5;

    if (this.powerAttack) attackBonus =- 4;

    this.toggleBonus(event, attackBonus, 0)
  }

  togglePowerAttack(event: any){
    this.powerAttack = event.checked;
    let attackBonus = 0;

    if (this.secondAttack) attackBonus = -4;

    this.toggleBonus(event, attackBonus, 6);
  }
}

export interface WeaponAttack{
  Name: string,
  AttackBonus: number,
  Damage: string,
  DamageBonus: number,
  DmgMult: number
}
