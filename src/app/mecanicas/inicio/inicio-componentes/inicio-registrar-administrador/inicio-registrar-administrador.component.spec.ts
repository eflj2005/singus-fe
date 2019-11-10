import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioRegistrarAdministradorComponent } from './inicio-registrar-administrador.component';

describe('InicioRegistrarAdministradorComponent', () => {
  let component: InicioRegistrarAdministradorComponent;
  let fixture: ComponentFixture<InicioRegistrarAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioRegistrarAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioRegistrarAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
