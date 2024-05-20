import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-melee-table',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './melee-table.component.html',
  styleUrl: './melee-table.component.css'
})
export class MeleeTableComponent {
  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ["Arma", "Attacco", "Danni"]
}
