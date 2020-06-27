import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasSubagendamientoComponentesArbolesagendasComponent } from './personas-subagendamiento-componentes-arbolesagendas.component';

describe('PersonasSubagendamientoComponentesArbolesagendasComponent', () => {
  let component: PersonasSubagendamientoComponentesArbolesagendasComponent;
  let fixture: ComponentFixture<PersonasSubagendamientoComponentesArbolesagendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasSubagendamientoComponentesArbolesagendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasSubagendamientoComponentesArbolesagendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
