import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosComponentesListaComponent } from './usuarios-componentes-lista.component';

describe('UsuariosComponentesListaComponent', () => {
  let component: UsuariosComponentesListaComponent;
  let fixture: ComponentFixture<UsuariosComponentesListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosComponentesListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosComponentesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
