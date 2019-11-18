import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasActualizacionDetalleComponent } from './personas-actualizacion-detalle.component';

describe('PersonasActualizacionDetalleComponent', () => {
  let component: PersonasActualizacionDetalleComponent;
  let fixture: ComponentFixture<PersonasActualizacionDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasActualizacionDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasActualizacionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
