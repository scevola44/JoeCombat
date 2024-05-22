import { Routes } from '@angular/router';
import { BirutaComponent } from './biruta';
import { KetherComponent, KetherMeleeComponent } from './kether';
 
export const routes: Routes = [
    { path: 'sheets/kether/ranged', component: KetherComponent },
    { path: 'sheets/kether/melee', component: KetherMeleeComponent },
    { path: 'sheets/biruta', component: BirutaComponent },
];
