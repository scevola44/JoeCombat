import { Routes } from '@angular/router';
import { BirutaComponent } from './biruta';
import { KetherComponent } from './kether';

export const routes: Routes = [
    { path: 'sheets/kether', component: KetherComponent },
    { path: 'sheets/biruta', component: BirutaComponent },
];
