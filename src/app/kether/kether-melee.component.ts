import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { WeaponListing } from '../entities/WeaponListing';
import { Attack } from '../entities/Attack';
import { DamageDiceUtils } from '../utils/damage-dice.utils';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

const INITIAL_WEAP_LISTING: WeaponListing[] = [{
  "Name": "Pugno d'Acciaio",
  "AttackBonus": 8,
  "DamageDice": "1d6",
  "DamageBonus": 0,
  "DmgMult": 1
}];

@Component({
  selector: 'app-kether-melee',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule
  ],
  templateUrl: './kether-melee.component.html',
  styleUrl: './kether.component.css'
})
export class KetherMeleeComponent {
  displayedColumns: string[] = ["Arma", "Attacco", "Danni", "Bonus"];
  dataToDisplay: WeaponListing[] = [...INITIAL_WEAP_LISTING];

  dataSource = new MatTableDataSource<WeaponListing>(INITIAL_WEAP_LISTING);

  fireHandsWeaponListing: WeaponListing = {
    "Name": "Braccia di Brace",
    "AttackBonus": 7,
    "DamageDice": "2d10",
    "DamageBonus": 0,
    "DmgMult": 1
  };

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

  strengthMod: number = +2;
  currentSize: number = 1;

  isFlanking: boolean = false;
  fireHandsOut: boolean = false;
  isHasted: boolean = false;

  secondAttack(){
    return this.currentAttackIteration.AttackNumber != 1;
  }

  calcAttackBonus(weaponAttack: WeaponListing){
    return weaponAttack.AttackBonus + this.strengthMod + this.currentAttackIteration.AttackPenalty + (this.isFlanking ? 2 : 0);
  }

  calcDamageBonus(bonus: number, multiplier: number){
    return Math.floor(this.strengthMod*multiplier + bonus);
  }

  getSize(): string {
    return DamageDiceUtils.sizeList[this.currentSize];
  }

  changeSize(modifier: number){
    this.currentSize += modifier;
    this.strengthMod += modifier;

    this.increaseDamageDice(modifier);
    this.dataSource.data.forEach(a => {a.AttackBonus += -modifier});
  }

  increaseDamageDice(modifier: number){
    this.dataSource.data.forEach(attack => {
      attack.DamageDice = DamageDiceUtils.getIncreasedDamageDice(attack.DamageDice, modifier);
    });
  }

  toggleBonus(event: any, attack: number, damage: number){
    if (!event.checked) {
      attack = attack * -1;
      damage = damage * -1;
    }
    this.dataSource.data.forEach(a => {a.AttackBonus += attack; a.DamageBonus += damage});
  }

  toggleStrengthBonus(event: any, strengthChange: number){
    let strengthBon = event.checked ? strengthChange : -strengthChange;

    this.strengthMod += strengthBon;
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

  toggleElementalBody(event: any){
    let modifier = event.checked ? 1 : -1;
    this.changeSize(modifier);
    this.toggleBonus(event, modifier, 0);
  }

  toggleFireHands(event: any) {
    this.fireHandsOut = event.checked;
    let newData = this.dataSource.data;

    if(this.fireHandsOut) newData.push(this.fireHandsWeaponListing);
    if(!this.fireHandsOut) newData.pop();

    this.dataSource.data = newData;
  }
}

class WeaponListingDataSource extends DataSource<WeaponListing> {
  private _dataStream = new ReplaySubject<WeaponListing[]>();

  constructor(initialData: WeaponListing[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<WeaponListing[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: WeaponListing[]) {
    this._dataStream.next(data);
  }
}
