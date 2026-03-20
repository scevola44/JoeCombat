import { Attack } from '../entities/Attack';

export class AttackUtils {
  static toggleHastenAttackIterations(attackIterations: Attack[], isHasted: boolean): void {
    if (isHasted) {
      const lastAttack = attackIterations[attackIterations.length - 1];
      const newAttack: Attack = {
        AttackNumber: lastAttack.AttackNumber + 1,
        AttackPenalty: attackIterations[0].AttackPenalty
      };
      attackIterations.push(newAttack);
    } else {
      attackIterations.pop();
    }
  }
}
