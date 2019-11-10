import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioRecuperarClaveComponent } from './inicio-recuperar-clave.component';

describe('RecuperarClaveComponent', () => {
  let component: InicioRecuperarClaveComponent;
  let fixture: ComponentFixture<InicioRecuperarClaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioRecuperarClaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioRecuperarClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
