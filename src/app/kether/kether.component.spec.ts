import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KetherComponent } from './kether.component';

describe('KetherComponent', () => {
  let component: KetherComponent;
  let fixture: ComponentFixture<KetherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KetherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KetherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
