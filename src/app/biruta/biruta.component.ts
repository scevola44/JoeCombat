import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { DamageDiceUtils } from '../utils/damage-dice.utils';
import { FormsModule } from '@angular/forms';
import { WeaponListing } from '../entities/WeaponListing';
import { Attack } from '../entities/Attack';
import { ArmorClassSharedComponent } from '../shared/armor-class-shared/armor-class-shared.component';
import { MeleeAttacksSharedComponent } from '../shared/melee-attacks-shared/melee-attacks-shared.component';
import { SizeChangeSharedComponent } from '../shared/size-change-shared/size-change-shared.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-biruta',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ArmorClassSharedComponent,
    MeleeAttacksSharedComponent,
    SizeChangeSharedComponent
  ],
  templateUrl: './biruta.component.html',
  styleUrl: './biruta.component.css'
})
export class BirutaComponent {

  @ViewChild(ArmorClassSharedComponent) armorClassComponent!: ArmorClassSharedComponent;
  @ViewChild(MeleeAttacksSharedComponent) attacksComponent!: MeleeAttacksSharedComponent;

  displayedColumns: string[] = ["Arma", "Attacco", "Danni", "Bonus"];

  meleeAttacks: MatTableDataSource<WeaponListing> = new MatTableDataSource<WeaponListing>([{
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
  }]);

  strengthMod: number = +4;
  dexMod: number = +1;
  armorBonus: number = 6;
  shieldBonus: number = 0;
  currentSize: number = 1;
  untypedAcBonus: number = 0;

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

  calcDamageBonus(bonus: number, multiplier: number){
    let powerAttackBonus = this.powerAttack  ? 4 * multiplier : 0;
    return Math.floor(this.strengthMod*multiplier + bonus + powerAttackBonus);
  }

  isSecondAttack(){
    return this.currentAttackIteration.AttackNumber != 1;
  }

  calcAttackBonus(weaponAttack: WeaponListing){
    let powerAttackPenalty = ((this.isSecondAttack() || weaponAttack.DmgMult == 1) && this.powerAttack) ? -2 : 0;

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
    this.meleeAttacks.data.forEach(a => {a.AttackBonus += -modifier});
  }

  toggleLeadBlades(event: any){
    let modifier = event.checked ? 1 : -1;

    this.increaseDamageDice(modifier);
  }

  increaseDamageDice(modifier: number){
    this.meleeAttacks.data.forEach(attack => {
      attack.DamageDice = DamageDiceUtils.getIncreasedDamageDice(attack.DamageDice, modifier);
    });
  }

  toggleElementalBody(event: any){
    let modifier = event.checked ? 1 : -1;

    this.strengthMod += modifier*3;
    this.dexMod -= modifier;
    this.armorBonus += modifier*6;

    this.changeSize(modifier);
  }

  toggleStrengthBonus(event: any, strengthChange: number){
    let strengthBon = event.checked ? strengthChange : -strengthChange;

    this.strengthMod += strengthBon;
  }
}


