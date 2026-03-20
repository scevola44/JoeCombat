import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { DamageDiceUtils } from '../utils/damage-dice.utils';
import { FormsModule } from '@angular/forms';
import { WeaponListing } from '../entities/WeaponListing';
import { Attack } from '../entities/Attack';
import { MatTableDataSource } from '@angular/material/table';
import { AllWeaponAttacksSharedComponent } from '../shared';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-biruta',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    AllWeaponAttacksSharedComponent
  ],
  templateUrl: './biruta.component.html',
  styleUrl: './biruta.component.css'
})
export class BirutaComponent {

  displayedColumns: string[] = ["Arma", "Attacco", "Danni", "Bonus"];

  rangedAttacks: MatTableDataSource<WeaponListing> = new MatTableDataSource<WeaponListing>();
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
    "DamageDice": "1d6",
    "DamageBonus": 1,
    "DmgMult": 1
  }]);

  characterLevel: number = 10;
  element: string = "Terra";
  maxDeckPoints: number = 4;
  baseAttBonus: number = 7;

  readonly baseStrengthMod: number = 4;
  readonly baseDexMod: number = 1;
  readonly baseArmorBonus: number = 6;

  shieldBonus: number = 0;
  untypedAcBonus: number = 0;
  dodgeBonus: number = 0;

  isFlanking: boolean = false;
  flankingBonus: number = 2;

  powerAttack: boolean = false;
  isAgainstTouch: boolean = false;

  // Ability flags
  elementalBodyActive: boolean = false;
  leadBladesActive: boolean = false;
  animalFocusStrActive: boolean = false;
  animalFocusDexActive: boolean = false;
  ironskinActive: boolean = false;

  get sizeSteps(): number {
    return this.elementalBodyActive ? 1 : 0;
  }

  get currentSize(): number {
    return 1 + this.sizeSteps;
  }

  get strengthMod(): number {
    return this.baseStrengthMod
      + (this.elementalBodyActive ? 3 : 0)
      + this.sizeSteps
      + (this.animalFocusStrActive ? 2 : 0);
  }

  get dexMod(): number {
    return this.baseDexMod
      - this.sizeSteps
      + (this.animalFocusDexActive ? 2 : 0);
  }

  get armorBonus(): number {
    return this.baseArmorBonus
      + (this.elementalBodyActive ? 6 : 0)
      + (this.ironskinActive ? 5 : 0);
  }

  get meleeDiceSteps(): number {
    return this.sizeSteps + (this.leadBladesActive ? 1 : 0);
  }

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
    { "label": "N/A", "bonus": 0 },
    { "label": "+2", "bonus": 2 },
    { "label": "+4", "bonus": 4 },
    { "label": "+6", "bonus": 6 }
  ];

  getSize(): string {
    return DamageDiceUtils.sizeList[this.currentSize];
  }

  toggleElementalBody(event: any) {
    this.elementalBodyActive = event.checked;
  }

  toggleLeadBlades(event: any) {
    this.leadBladesActive = event.checked;
  }
}
