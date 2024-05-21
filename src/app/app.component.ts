import {Component, OnInit} from '@angular/core';
import { MeleeTableComponent } from "./melee-table/melee-table.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root', // component name used in markup
    standalone: true, // component is self-contained
    templateUrl: './app.component.html',
    imports: [RouterOutlet, MeleeTableComponent]
})

// export component
export class AppComponent implements OnInit{
  title = 'Joe Combat';
  
  Arma: any;

  data = [];
  displayColumns: string[] = ["Nome", "Attacco", "Danni"];

  ngOnInit(): void {
    
  }
}