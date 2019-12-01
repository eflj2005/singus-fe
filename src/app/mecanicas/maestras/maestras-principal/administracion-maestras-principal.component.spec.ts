import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestrasPrincipalComponent } from './maestras-principal.component';

describe('MaestrasPrincipalComponent', () => {
  let component: MaestrasPrincipalComponent;
  let fixture: ComponentFixture<MaestrasPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestrasPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestrasPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
