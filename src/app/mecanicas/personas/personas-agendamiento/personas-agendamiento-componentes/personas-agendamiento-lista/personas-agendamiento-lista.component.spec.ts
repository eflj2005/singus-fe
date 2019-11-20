import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasAgendamientoListaComponent } from './personas-agendamiento-lista.component';

describe('PersonasAgendamientoListaComponent', () => {
  let component: PersonasAgendamientoListaComponent;
  let fixture: ComponentFixture<PersonasAgendamientoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasAgendamientoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasAgendamientoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
