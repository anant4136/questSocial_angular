import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightboardComponent } from './rightboard.component';

describe('RightboardComponent', () => {
  let component: RightboardComponent;
  let fixture: ComponentFixture<RightboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RightboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RightboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
