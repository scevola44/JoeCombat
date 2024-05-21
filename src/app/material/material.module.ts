import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [],
  imports: [
    MatTableModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule { }
