import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasSubagendamientoComponentesListaagendamientoComponent } from './personas-subagendamiento-componentes-listaagendamiento.component';

describe('PersonasSubagendamientoComponentesListaagendamientoComponent', () => {
  let component: PersonasSubagendamientoComponentesListaagendamientoComponent;
  let fixture: ComponentFixture<PersonasSubagendamientoComponentesListaagendamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasSubagendamientoComponentesListaagendamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasSubagendamientoComponentesListaagendamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
