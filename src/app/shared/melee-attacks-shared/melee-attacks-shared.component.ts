import { Component, Input, OnInit } from '@angular/core';
import { WeaponListing } from '../../entities/WeaponListing';
import { MaterialModule } from '../../material/material.module';
import { Attack } from '../../entities/Attack';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-melee-attacks-shared',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule
  ],
  templateUrl: './melee-attacks-shared.component.html',
  styleUrl: './melee-attacks-shared.component.scss'
})
export class MeleeAttacksSharedComponent implements OnInit{

  @Input() dataSource!: MatTableDataSource<WeaponListing>;
  @Input() strengthMod!: number;
  @Input() currentFlankingBonus!: number;
  @Input() isHasted!: boolean;

  @Input() powerAttack: boolean = false;

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


  ngOnInit(): void {
    this.currentAttackIteration = this.attackIterations[0];
  }

  calcAttackBonus(weaponAttack: WeaponListing){
    let powerAttackPenalty = (
      (this.isSecondAttack() || weaponAttack.DmgMult == 1)
      && this.powerAttack) ? -2 : 0;

    return weaponAttack.AttackBonus
    + this.strengthMod
    + this.currentAttackIteration.AttackPenalty
    + this.currentFlankingBonus
    + powerAttackPenalty;
  }

  calcDamageBonus(bonus: number, multiplier: number){
    let powerAttackBonus = this.powerAttack  ? 4 * multiplier : 0;
    return Math.floor(this.strengthMod*multiplier + bonus + powerAttackBonus);
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

    console.log("HASTED?: ", this.attackIterations)

    this.toggleBonus(event, 1, 0)
  }
}
