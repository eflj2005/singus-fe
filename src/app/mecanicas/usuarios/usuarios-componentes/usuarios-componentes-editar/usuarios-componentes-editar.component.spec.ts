import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosComponentesEditarComponent } from './usuarios-componentes-editar.component';

describe('UsuariosComponentesEditarComponent', () => {
  let component: UsuariosComponentesEditarComponent;
  let fixture: ComponentFixture<UsuariosComponentesEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosComponentesEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosComponentesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
