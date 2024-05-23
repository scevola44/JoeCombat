import { Component, ViewChild } from '@angular/core';
import { WeaponListing } from '../entities/WeaponListing';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ArmorClassSharedComponent } from '../shared/armor-class-shared/armor-class-shared.component';
import { MeleeAttacksSharedComponent } from '../shared/melee-attacks-shared/melee-attacks-shared.component';
import { MatTableDataSource } from '@angular/material/table';
import { SizeChangeSharedComponent } from '../shared/size-change-shared/size-change-shared.component';
import { RangedAttacksSharedComponent } from '../shared/ranged-attacks-shared/ranged-attacks-shared.component';

const INITIAL_MELEE_LISTING: WeaponListing[] = [{
  "Name": "Pugno d'Acciaio",
  "AttackBonus": 8,
  "DamageDice": "1d6",
  "DamageBonus": 0,
  "DmgMult": 1
}];

const fireHandsWeaponListing: WeaponListing = {
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
    ArmorClassSharedComponent,
    MeleeAttacksSharedComponent,
    RangedAttacksSharedComponent,
    SizeChangeSharedComponent
  ],
  templateUrl: './kether.component.html',
  styleUrl: './kether.component.css'
})
export class KetherComponent {

  @ViewChild(ArmorClassSharedComponent) armorClassComponent!: ArmorClassSharedComponent;
  @ViewChild(MeleeAttacksSharedComponent) meleeAttacksComponent!: MeleeAttacksSharedComponent;
  @ViewChild(SizeChangeSharedComponent) sizeChangeComponent!: SizeChangeSharedComponent;

  deadlyAimActive: boolean = false;
  withinNineMeters: boolean = false;
  isHasted: boolean = false;
  fireHandsOut: boolean = false;

  dexMod: number = 5;
  rangeIncrements: number = 0;
  currentSize: number = 1;

  armorBonus: number = 3;
  isAgainstTouch: boolean = false;
  shieldBonus: number = 0;
  untypedAcBonus: number = 0;
  dodgeBonus: number = 1;
  flankingBonus: number = 0;
  strengthMod: number = 2;

  rangedAttacks: MatTableDataSource<WeaponListing> = new MatTableDataSource<WeaponListing>([{
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
  }]);

  meleeAttacks: MatTableDataSource<WeaponListing> = new MatTableDataSource<WeaponListing>(INITIAL_MELEE_LISTING);

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


  toggleElementalBody(event: any){
    let modifier = event.checked ? 1 : -1;
    this.sizeChangeComponent.changeSize(modifier);

    this.dexMod += modifier*2;
    this.meleeAttacksComponent.toggleBonus(event, 1, 0);
  }

  toggleFireHands(event: any) {
    this.fireHandsOut = event.checked;
    let newData = this.meleeAttacks.data;

    if(this.fireHandsOut) {
      this.strengthMod += 5;
      newData.push(fireHandsWeaponListing);
    }
    if(!this.fireHandsOut) {
      this.strengthMod -= 5;
      newData.pop();
    }

    this.meleeAttacks.data = newData;
  }
}
