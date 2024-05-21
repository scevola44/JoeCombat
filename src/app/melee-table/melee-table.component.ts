import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { DamageDiceUtils } from '../utils/damage-dice.utils';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-melee-table',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule
  ],
  templateUrl: './melee-table.component.html',
  styleUrl: './melee-table.component.css'
})
export class MeleeTableComponent {
  displayedColumns: string[] = ["Arma", "Attacco", "Danni", "Bonus"];

  dataSource: WeaponListing[] = [{
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
  isHasted: boolean = false;
  currentAttackIteration: Attack = {
    "AttackNumber":1,
    "AttackPenalty": 0
  };
  attackIterations: Attack[] = [{
    "AttackNumber":1,
    "AttackPenalty": 0
   },
   {
    "AttackNumber": 2,
    "AttackPenalty": -5
  }];

  calcDamageBonus(bonus: number, multiplier: number){
    return Math.floor(this.strengthMod*multiplier + bonus);
  }

  secondAttack(){
    return this.currentAttackIteration.AttackNumber != 1;
  }

  calcAttackBonus(bonus: number){
    let powerAttackMalus = this.secondAttack() && this.powerAttack ? -4 : 0;

    return bonus + this.strengthMod + this.currentAttackIteration.AttackPenalty + powerAttackMalus;
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
  }

  togglePowerAttack(event: any){
    this.powerAttack = event.checked;

    this.toggleBonus(event, 0, 6);
  }

  toggleHaste(event: any){
    this.isHasted = event.checked;

    if (this.isHasted){
      this.attackIterations.push({
        "AttackNumber": 3,
        "AttackPenalty": 0
      })

    }
    else {
      this.attackIterations.pop();
    }

    this.toggleBonus(event, 1, 0)
  }
}

export interface Attack{
  AttackNumber: number;
  AttackPenalty: number;
}

export interface WeaponListing{
  Name: string,
  AttackBonus: number,
  Damage: string,
  DamageBonus: number,
  DmgMult: number
}
