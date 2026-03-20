import { Component } from '@angular/core';
import { WeaponListing } from '../entities/WeaponListing';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ArmorClassSharedComponent } from '../shared/armor-class-shared/armor-class-shared.component';
import { MeleeAttacksSharedComponent } from '../shared/melee-attacks-shared/melee-attacks-shared.component';
import { MatTableDataSource } from '@angular/material/table';
import { SizeChangeSharedComponent } from '../shared/size-change-shared/size-change-shared.component';
import { RangedAttacksSharedComponent } from '../shared/ranged-attacks-shared/ranged-attacks-shared.component';
import { AllWeaponAttacksSharedComponent } from '../shared';

const INITIAL_MELEE_LISTING: WeaponListing[] = [{
  "Name": "Pugno d'Acciaio",
  "AttackBonus": 8,
  "DamageDice": "1d6",
  "DamageBonus": 0,
  "DmgMult": 1
}];

const FIRE_HANDS_WEAPON: WeaponListing = {
  "Name": "Braccia di Brace",
  "AttackBonus": 7,
  "DamageDice": "2d10",
  "DamageBonus": 0,
  "DmgMult": 1
};

@Component({
  selector: 'app-kether',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    AllWeaponAttacksSharedComponent,
    ArmorClassSharedComponent,
    MeleeAttacksSharedComponent,
    RangedAttacksSharedComponent,
    SizeChangeSharedComponent
  ],
  templateUrl: './kether.component.html',
  styleUrl: './kether.component.css'
})
export class KetherComponent {

  deadlyAimActive: boolean = false;
  withinNineMeters: boolean = false;
  isHasted: boolean = false;
  fireHandsOut: boolean = false;
  elementalBodyActive: boolean = false;

  characterLevel: number = 10;
  element: string = "Fuoco";
  maxDeckPoints: number = 4;
  baseAttBonus: number = 7;
  rangeIncrements: number = 0;

  readonly baseStrengthMod: number = 2;
  readonly baseDexMod: number = 5;

  armorBonus: number = 3;
  isAgainstTouch: boolean = false;
  shieldBonus: number = 0;
  untypedAcBonus: number = 0;
  dodgeBonus: number = 1;
  isFlanking: boolean = false;
  flankingBonus: number = 0;

  get sizeSteps(): number {
    return this.elementalBodyActive ? 1 : 0;
  }

  get currentSize(): number {
    return 1 + this.sizeSteps;
  }

  get strengthMod(): number {
    return this.baseStrengthMod
      + (this.fireHandsOut ? 5 : 0)
      + this.sizeSteps;
  }

  get dexMod(): number {
    return this.baseDexMod
      + (this.elementalBodyActive ? 2 : 0)
      - this.sizeSteps;
  }

  get meleeDiceSteps(): number {
    return this.sizeSteps;
  }

  rangedAttacks: MatTableDataSource<WeaponListing> = new MatTableDataSource<WeaponListing>([{
    "Name": "Fucile",
    "AttackBonus": 9,
    "DamageDice": "2d12",
    "DamageBonus": 2,
    "DmgMult": 1
  }]);

  meleeAttacks: MatTableDataSource<WeaponListing> = new MatTableDataSource<WeaponListing>(
    [...INITIAL_MELEE_LISTING]
  );

  displayedColumns: string[] = ["Arma", "Attacco", "Danni", "Bonus"];

  toggleElementalBody(event: any) {
    this.elementalBodyActive = event.checked;
  }

  toggleFireHands(event: any) {
    this.fireHandsOut = event.checked;
    this.rebuildMeleeWeapons();
  }

  toggleFlanking(event: any) {
    this.isFlanking = event.checked;
    this.flankingBonus = event.checked ? 2 : 0;
  }

  private rebuildMeleeWeapons() {
    const data: WeaponListing[] = [...INITIAL_MELEE_LISTING];
    if (this.fireHandsOut) data.push(FIRE_HANDS_WEAPON);
    this.meleeAttacks.data = data;
  }
}
