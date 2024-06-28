import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitAnsComponent } from './submit-ans.component';

describe('SubmitAnsComponent', () => {
  let component: SubmitAnsComponent;
  let fixture: ComponentFixture<SubmitAnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmitAnsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
