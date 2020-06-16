import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasSubagendamientoPrincipalComponent } from './personas-subagendamiento-principal.component';

describe('PersonasSubagendamientoPrincipalComponent', () => {
  let component: PersonasSubagendamientoPrincipalComponent;
  let fixture: ComponentFixture<PersonasSubagendamientoPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasSubagendamientoPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasSubagendamientoPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
