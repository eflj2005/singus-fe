import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasSubagendamientoComponentesArbolesComponent } from './personas-subagendamiento-componentes-arboles.component';

describe('PersonasSubagendamientoComponentesArbolesagendasComponent', () => {
  let component: PersonasSubagendamientoComponentesArbolesComponent;
  let fixture: ComponentFixture<PersonasSubagendamientoComponentesArbolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasSubagendamientoComponentesArbolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasSubagendamientoComponentesArbolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
