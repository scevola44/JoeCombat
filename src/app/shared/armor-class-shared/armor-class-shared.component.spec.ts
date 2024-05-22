import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorClassSharedComponent } from './armor-class-shared.component';

describe('ArmorClassSharedComponent', () => {
  let component: ArmorClassSharedComponent;
  let fixture: ComponentFixture<ArmorClassSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArmorClassSharedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArmorClassSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
