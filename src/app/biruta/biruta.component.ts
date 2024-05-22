import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { DamageDiceUtils } from '../utils/damage-dice.utils';
import { FormsModule } from '@angular/forms';
import { WeaponListing } from '../entities/WeaponListing';
import { Attack } from '../entities/Attack';

@Component({
  selector: 'app-biruta',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule
  ],
  templateUrl: './biruta.component.html',
  styleUrl: './biruta.component.css'
})
export class BirutaComponent {
  displayedColumns: string[] = ["Arma", "Attacco", "Danni", "Bonus"];

  dataSource: WeaponListing[] = [{
    "Name": "Glaive Guisarme",
    "AttackBonus": 8,
    "DamageDice": "1d10",
    "DamageBonus": 1,
    "DmgMult": 1.5
  },
  {
    "Name": "Mazza",
    "AttackBonus": 8,
    "DamageDice": "1d8",
    "DamageBonus": 1,
    "DmgMult": 1
  }];

  strengthMod: number = +4;
  dexMod: number = +2;
  armorBonus: number = 2;
  shieldBonus: number = 0;
  currentSize: number = 1;

  currentFlankingBonus: number = 0;

  powerAttack: boolean = false;
  isHasted: boolean = false;
  isAgainstTouch: boolean = false;

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

  flankingOptions: any[] = [
    {
      "label": "N/A",
      "bonus": 0
    },
    {
      "label": "+2",
      "bonus": 2
    },
    {
      "label": "+4",
      "bonus": 4
    },
    {
      "label": "+6",
      "bonus": 6
    }
  ]

  getArmorClass(){
    let armorClass = 10
    + (1 - this.currentSize)
    + this.dexMod + (this.isAgainstTouch ? 0 : this.armorBonus + this.shieldBonus)
    + (this.isHasted ? 1 : 0);

    return armorClass;
  }

  calcDamageBonus(bonus: number, multiplier: number){
    let powerAttackBonus = this.powerAttack  ? 4 * multiplier : 0;
    return Math.floor(this.strengthMod*multiplier + bonus + powerAttackBonus);
  }

  secondAttack(){
    return this.currentAttackIteration.AttackNumber != 1;
  }

  calcAttackBonus(weaponAttack: WeaponListing){
    let powerAttackPenalty = ((this.secondAttack() || weaponAttack.DmgMult == 1) && this.powerAttack) ? -2 : 0;

    return weaponAttack.AttackBonus + this.strengthMod + this.currentAttackIteration.AttackPenalty + this.currentFlankingBonus + powerAttackPenalty;
  }

  getSize(): string {
    return DamageDiceUtils.sizeList[this.currentSize];
  }

  changeSize(modifier: number){
    this.currentSize += modifier;
    this.strengthMod += modifier;
    this.dexMod -= modifier;

    this.increaseDamageDice(modifier);
    this.dataSource.forEach(a => {a.AttackBonus += -modifier});
  }

  toggleLeadBlades(event: any){
    let modifier = event.checked ? 1 : -1;

    this.increaseDamageDice(modifier);
  }

  increaseDamageDice(modifier: number){
    this.dataSource.forEach(attack => {
      attack.DamageDice = DamageDiceUtils.getIncreasedDamageDice(attack.DamageDice, modifier);
    });
  }

  toggleElementalBody(event: any){
    let modifier = event.checked ? 1 : -1;

    this.strengthMod += modifier*3;
    this.dexMod -= modifier;
    this.armorBonus += modifier*6;

    this.toggleBonus(event, modifier, 0);
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

  togglePowerAttack(event: any){
    this.powerAttack = event.checked;

    this.toggleBonus(event, 0, 6);
  }

  toggleHaste(event: any){
    this.isHasted = event.checked;

    if (this.isHasted){
      let lastAttack: Attack = {
        "AttackNumber": this.attackIterations[this.attackIterations.length-1].AttackNumber +1,
        "AttackPenalty": this.attackIterations[0].AttackPenalty
      }

      this.attackIterations.push(lastAttack);
    }
    else {
      this.attackIterations.pop();
    }

    this.toggleBonus(event, 1, 0)
  }
}


