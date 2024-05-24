import { Routes } from '@angular/router';
import { BirutaComponent } from './biruta';
import { KetherComponent } from './kether';
import { AllWeaponAttacksSharedComponent } from './shared';
 
export const routes: Routes = [
    { path: 'test', component: AllWeaponAttacksSharedComponent },
    { path: 'sheets/kether', component: KetherComponent },
    { path: 'sheets/biruta', component: BirutaComponent },
];
