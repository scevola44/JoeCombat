import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [],
  imports: [
    MatTableModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatRadioModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatRadioModule
  ]
})
export class MaterialModule { }
