import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasActualizacionInformacionComponent } from './personas-actualizacion-informacion.component';

describe('PersonasActualizacionInformacionComponent', () => {
  let component: PersonasActualizacionInformacionComponent;
  let fixture: ComponentFixture<PersonasActualizacionInformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasActualizacionInformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasActualizacionInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
