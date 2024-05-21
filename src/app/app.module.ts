import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { KetherComponent } from './kether';
import { BirutaComponent } from './biruta';
import { HomeComponent } from './home';
import { BrowserModule } from '@angular/platform-browser';

@NgModule ({
  declarations: [
    AppComponent,
    HomeComponent,
    BirutaComponent,
    KetherComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule
  ],
  bootstrap: [AppComponent]
})
class AppModule {}