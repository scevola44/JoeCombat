import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeleeTableComponent } from './melee-table.component';

describe('MeleeTableComponent', () => {
  let component: MeleeTableComponent;
  let fixture: ComponentFixture<MeleeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeleeTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeleeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
