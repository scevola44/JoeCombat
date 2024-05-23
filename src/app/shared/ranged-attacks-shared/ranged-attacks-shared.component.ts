import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Attack } from '../../entities/Attack';
import { WeaponListing } from '../../entities/WeaponListing';

@Component({
  selector: 'app-ranged-attacks-shared',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './ranged-attacks-shared.component.html',
  styleUrl: './ranged-attacks-shared.component.scss'
})
export class RangedAttacksSharedComponent implements OnInit{

  @Input() dataSource!: MatTableDataSource<WeaponListing>;
  @Input() dexMod!: number;
  @Input() isHasted!: boolean;

  @Input() withinNineMeters: boolean = false;
  @Input() deadlyAimActive: boolean = false;

  displayedColumns: string[] = ["Arma", "Attacco", "Danni", "Bonus"];

  attackIterations: Attack[] = [{
    "AttackNumber":1,
    "AttackPenalty": 0
   },
   {
    "AttackNumber": 2,
    "AttackPenalty": -5
  }];

  currentAttackIteration!: Attack;
  rangeIncrements: number = 0;

  temporaryAttMod: number = 0;
  temporaryDmgMod: number = 0;

  ngOnInit(): void {
    this.currentAttackIteration = this.attackIterations[0];
  }

  calcAttackBonus(bonus: number){
    let deadlyAimPenalty = this.deadlyAimActive ? -2 : 0;
    let preciseShotBonus = this.withinNineMeters ? +1 : 0;
    let rangePenalty = -this.rangeIncrements;

    return bonus
    + this.dexMod
    + deadlyAimPenalty
    + this.currentAttackIteration.AttackPenalty
    + preciseShotBonus
    + rangePenalty
    + this.temporaryAttMod;
  }

  calcDamageBonus(bonus: number){
    let deadlyAimBonus = this.deadlyAimActive ? 4 : 0;
    let preciseShotBonus = this.withinNineMeters ? +1 : 0;

    return bonus
    + this.dexMod
    + deadlyAimBonus
    + preciseShotBonus
    + this.temporaryDmgMod;
  }

  isSecondAttack(){
    return this.currentAttackIteration.AttackNumber != 1;
  }

  toggleBonus(event: any, attack: number, damage: number){
    if (!event.checked) {
      attack = attack * -1;
      damage = damage * -1;
    }
    this.dataSource.data.forEach(a => {a.AttackBonus += attack; a.DamageBonus += damage});
  }

  changeRangeIncrements(steps: number){
    this.rangeIncrements += steps;
    if (this.rangeIncrements > 0) this.withinNineMeters = false;
  }
}
