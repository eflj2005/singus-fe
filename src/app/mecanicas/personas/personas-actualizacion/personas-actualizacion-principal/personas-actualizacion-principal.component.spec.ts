import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasActualizacionPrincipalComponent } from './personas-actualizacion-principal.component';

describe('PersonasActualizacionPrincipalComponent', () => {
  let component: PersonasActualizacionPrincipalComponent;
  let fixture: ComponentFixture<PersonasActualizacionPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasActualizacionPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasActualizacionPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
