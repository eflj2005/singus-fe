import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasSubagendamientoComponentesListaComponent } from './personas-subagendamiento-componentes-lista.component';

describe('PersonasSubagendamientoComponentesListaComponent', () => {
  let component: PersonasSubagendamientoComponentesListaComponent;
  let fixture: ComponentFixture<PersonasSubagendamientoComponentesListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasSubagendamientoComponentesListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasSubagendamientoComponentesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
