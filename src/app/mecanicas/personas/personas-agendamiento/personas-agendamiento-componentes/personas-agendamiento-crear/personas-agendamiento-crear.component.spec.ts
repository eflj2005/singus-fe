import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasAgendamientoCrearComponent } from './personas-agendamiento-crear.component';

describe('PersonasAgendamientoCrearComponent', () => {
  let component: PersonasAgendamientoCrearComponent;
  let fixture: ComponentFixture<PersonasAgendamientoCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasAgendamientoCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasAgendamientoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
