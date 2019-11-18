import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasActualizacionListaComponent } from './personas-actualizacion-lista.component';

describe('PersonasActualizacionListaComponent', () => {
  let component: PersonasActualizacionListaComponent;
  let fixture: ComponentFixture<PersonasActualizacionListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasActualizacionListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasActualizacionListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
