import { Component, Input, ViewChild } from '@angular/core';
import { MeleeAttacksSharedComponent } from '../melee-attacks-shared';
import { RangedAttacksSharedComponent } from '../ranged-attacks-shared';
import { ArmorClassSharedComponent } from '../armor-class-shared';
import { SizeChangeSharedComponent } from '../size-change-shared';
import { MatTableDataSource } from '@angular/material/table';
import { WeaponListing } from '../../entities/WeaponListing';
import { MaterialModule } from '../../material/material.module';
import { Attack } from '../../entities/Attack';

@Component({
  selector: 'app-all-weapon-attacks-shared',
  standalone: true,
  imports: [
    MaterialModule,
    MeleeAttacksSharedComponent,
    RangedAttacksSharedComponent,
    ArmorClassSharedComponent,
    SizeChangeSharedComponent
  ],
  templateUrl: './all-weapon-attacks-shared.component.html',
  styleUrl: './all-weapon-attacks-shared.component.scss'
})
export class AllWeaponAttacksSharedComponent {

  @ViewChild(MeleeAttacksSharedComponent) meleeAttacksComponent!: MeleeAttacksSharedComponent;
  @ViewChild(RangedAttacksSharedComponent) rangedAttacksComponent!: RangedAttacksSharedComponent;
  @ViewChild(SizeChangeSharedComponent) sizeChangeComponent!: SizeChangeSharedComponent;

  @Input() rangedAttacks!: MatTableDataSource<WeaponListing>;
  @Input() meleeAttacks!: MatTableDataSource<WeaponListing>;

  
  attackIterations: Attack[] = [{
    "AttackNumber":1,
    "AttackPenalty": 0
   },
   {
    "AttackNumber": 2,
    "AttackPenalty": -5
  }];

  currentAttackIteration!: Attack;

  @Input() deadlyAimActive: boolean = false;
  withinNineMeters: boolean = false;
  isHasted: boolean = false;

  @Input() characterLevel!: number;
  @Input() element!: string;
  @Input() maxDeckPoints!: number;
  @Input() baseAttBonus!: number;
  @Input() dexMod!: number;
  rangeIncrements: number = 0;
  @Input() currentSize!: number;
  @Input() armorBonus!: number;
  @Input() shieldBonus!: number;
  @Input() untypedAcBonus!: number;
  @Input() dodgeBonus!: number;
  @Input() flankingBonus: number = 2;
  @Input() strengthMod!: number;
  @Input() isFlanking: boolean = false;

  isAgainstTouch: boolean = false;

  temporaryAttMod: number = 0;
  temporaryDmgMod: number = 0;

  toggleBonus(event: any, attack: number, damage: number){
    this.meleeAttacksComponent.toggleBonus(event, attack,damage);
    this.rangedAttacksComponent.toggleBonus(event, attack, damage);
  }

  toggleHaste(event: any) {
    this.meleeAttacksComponent.toggleHaste(event);
    // this.rangedAttacksComponent.toggleHaste(event);
  }

  changeRangeIncrements(step: number){
    this.rangedAttacksComponent.changeRangeIncrements(step);
  }
}
