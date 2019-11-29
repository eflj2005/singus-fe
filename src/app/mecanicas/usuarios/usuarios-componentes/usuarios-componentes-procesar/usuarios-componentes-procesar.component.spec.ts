import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosComponentesProcesarComponent } from './usuarios-componentes-procesar.component';

describe('UsuariosComponentesProcesarComponent', () => {
  let component: UsuariosComponentesProcesarComponent;
  let fixture: ComponentFixture<UsuariosComponentesProcesarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosComponentesProcesarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosComponentesProcesarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
