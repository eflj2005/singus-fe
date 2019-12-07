import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicacionesPrincipalComponent } from './comunicaciones-principal.component';

describe('ComunicacionesPrincipalComponent', () => {
  let component: ComunicacionesPrincipalComponent;
  let fixture: ComponentFixture<ComunicacionesPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunicacionesPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunicacionesPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
