import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { MeleeTableComponent } from './melee-table/melee-table.component';

@NgModule ({
  declarations: [
    AppComponent
  ],
  imports: [
    MaterialModule
  ],
  bootstrap: [AppComponent]
})
class AppModule {}