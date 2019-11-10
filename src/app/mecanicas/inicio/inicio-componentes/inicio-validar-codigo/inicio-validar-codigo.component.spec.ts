import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioValidarCodigoComponent } from './inicio-validar-codigo.component';

describe('ValidarCodigoComponent', () => {
  let component: InicioValidarCodigoComponent;
  let fixture: ComponentFixture<InicioValidarCodigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioValidarCodigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioValidarCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
