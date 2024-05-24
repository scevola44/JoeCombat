import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { WeaponListing } from '../entities/WeaponListing';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ArmorClassSharedComponent } from '../shared/armor-class-shared/armor-class-shared.component';
import { MeleeAttacksSharedComponent } from '../shared/melee-attacks-shared/melee-attacks-shared.component';
import { MatTableDataSource } from '@angular/material/table';
import { SizeChangeSharedComponent } from '../shared/size-change-shared/size-change-shared.component';
import { RangedAttacksSharedComponent } from '../shared/ranged-attacks-shared/ranged-attacks-shared.component';
import { AllWeaponAttacksSharedComponent } from '../shared';
import { DamageDiceUtils } from '../utils/damage-dice.utils';

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
    AllWeaponAttacksSharedComponent,
    ArmorClassSharedComponent,
    MeleeAttacksSharedComponent,
    RangedAttacksSharedComponent,
    SizeChangeSharedComponent
  ],
  templateUrl: './kether.component.html',
  styleUrl: './kether.component.css'
})
export class KetherComponent implements AfterViewInit {

  // @ViewChild(ArmorClassSharedComponent) armorClassComponent!: ArmorClassSharedComponent;
  // @ViewChild(MeleeAttacksSharedComponent) meleeAttacksComponent!: MeleeAttacksSharedComponent;
  // @ViewChild(RangedAttacksSharedComponent) rangedAttacksComponent!: RangedAttacksSharedComponent;
  // @ViewChild(SizeChangeSharedComponent) sizeChangeComponent!: SizeChangeSharedComponent;

  @ViewChild(AllWeaponAttacksSharedComponent) weaponAttacksComponent!: AllWeaponAttacksSharedComponent;

  deadlyAimActive: boolean = false;
  withinNineMeters: boolean = false;
  isHasted: boolean = false;
  fireHandsOut: boolean = false;

  characterLevel: number = 10;
  element: string = "Fuoco";
  maxDeckPoints: number = 4;
  baseAttBonus: number = 7;
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
  }]);

  meleeAttacks: MatTableDataSource<WeaponListing> = new MatTableDataSource<WeaponListing>(INITIAL_MELEE_LISTING);

  displayedColumns: string[] = ["Arma", "Attacco", "Danni", "Bonus"];

  ngAfterViewInit(): void {
    this.weaponAttacksComponent.rangedAttacksComponent.rangePenalty = 1;
  }

  toggleElementalBody(event: any){
    let modifier = event.checked ? 1 : -1;
    this.weaponAttacksComponent.sizeChangeComponent.changeSize(modifier);

    this.dexMod += modifier*2;
  }

  toggleFireHands(event: any) {
    this.fireHandsOut = event.checked;
    let newData = this.meleeAttacks.data;

    if(this.fireHandsOut) {
      this.strengthMod += 5;
      fireHandsWeaponListing.DamageDice = DamageDiceUtils.getIncreasedDamageDice(fireHandsWeaponListing.DamageDice, this.currentSize-1)
      newData.push(fireHandsWeaponListing);
    }
    if(!this.fireHandsOut) {
      this.strengthMod -= 5;
      newData.pop();
    }

    this.meleeAttacks.data = newData;
  }
}
