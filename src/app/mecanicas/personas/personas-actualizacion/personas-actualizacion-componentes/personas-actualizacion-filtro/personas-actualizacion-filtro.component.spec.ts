import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasActualizacionFiltroComponent } from './personas-actualizacion-filtro.component';

describe('PersonasActualizacionFiltroComponent', () => {
  let component: PersonasActualizacionFiltroComponent;
  let fixture: ComponentFixture<PersonasActualizacionFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasActualizacionFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasActualizacionFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
