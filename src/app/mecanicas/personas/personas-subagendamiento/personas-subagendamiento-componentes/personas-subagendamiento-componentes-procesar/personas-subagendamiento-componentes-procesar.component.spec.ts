import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasSubagendamientoComponentesProcesarComponent } from './personas-subagendamiento-componentes-procesar.component';

describe('PersonasSubagendamientoComponentesProcesarComponent', () => {
  let component: PersonasSubagendamientoComponentesProcesarComponent;
  let fixture: ComponentFixture<PersonasSubagendamientoComponentesProcesarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasSubagendamientoComponentesProcesarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasSubagendamientoComponentesProcesarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
