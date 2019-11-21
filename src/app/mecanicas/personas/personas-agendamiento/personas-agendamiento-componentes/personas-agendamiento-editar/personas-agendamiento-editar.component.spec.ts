import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasAgendamientoEditarComponent } from './personas-agendamiento-editar.component';

describe('PersonasAgendamientoEditarComponent', () => {
  let component: PersonasAgendamientoEditarComponent;
  let fixture: ComponentFixture<PersonasAgendamientoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasAgendamientoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasAgendamientoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
