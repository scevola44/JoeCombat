import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material/material.module';
@Component({
    selector: 'app-root', // component name used in markup
    standalone: true, // component is self-contained
    templateUrl: './app.component.html',
    imports: [RouterOutlet, RouterLink, MaterialModule],
    styleUrls: ['./app.component.scss']
})
// export component
export class AppComponent implements OnInit{
  title = 'Joe Combat';
  ngOnInit(): void {
    
   }
 }