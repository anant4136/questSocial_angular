import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavbaradminComponent } from './sidenavbaradmin.component';

describe('SidenavbaradminComponent', () => {
  let component: SidenavbaradminComponent;
  let fixture: ComponentFixture<SidenavbaradminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidenavbaradminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidenavbaradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
