import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirutaComponent } from './biruta.component';

describe('BirutaComponent', () => {
  let component: BirutaComponent;
  let fixture: ComponentFixture<BirutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirutaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BirutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
