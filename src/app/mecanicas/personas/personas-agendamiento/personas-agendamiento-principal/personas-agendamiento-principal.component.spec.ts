import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasAgendamientoPrincipalComponent } from './personas-agendamiento-principal.component';

describe('PersonasAgendamientoPrincipalComponent', () => {
  let component: PersonasAgendamientoPrincipalComponent;
  let fixture: ComponentFixture<PersonasAgendamientoPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasAgendamientoPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasAgendamientoPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
