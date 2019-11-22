import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasAgendamientoVerComponent } from './personas-agendamiento-ver.component';

describe('PersonasAgendamientoVerComponent', () => {
  let component: PersonasAgendamientoVerComponent;
  let fixture: ComponentFixture<PersonasAgendamientoVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasAgendamientoVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasAgendamientoVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
