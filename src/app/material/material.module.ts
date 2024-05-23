import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    MatTableModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatRadioModule,
    FormsModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatRadioModule,
    FormsModule
  ]
})
export class MaterialModule { }
