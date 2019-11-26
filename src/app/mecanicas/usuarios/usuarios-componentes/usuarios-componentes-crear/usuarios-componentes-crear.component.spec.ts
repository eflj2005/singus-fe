import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosComponentesCrearComponent } from './usuarios-componentes-crear.component';

describe('UsuariosComponentesCrearComponent', () => {
  let component: UsuariosComponentesCrearComponent;
  let fixture: ComponentFixture<UsuariosComponentesCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosComponentesCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosComponentesCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
