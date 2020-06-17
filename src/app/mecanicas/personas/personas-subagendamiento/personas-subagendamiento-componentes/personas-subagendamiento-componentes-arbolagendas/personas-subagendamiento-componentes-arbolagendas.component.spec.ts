import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasSubagendamientoComponentesArbolagendasComponent } from './personas-subagendamiento-componentes-arbolagendas.component';

describe('PersonasSubagendamientoComponentesArbolagendasComponent', () => {
  let component: PersonasSubagendamientoComponentesArbolagendasComponent;
  let fixture: ComponentFixture<PersonasSubagendamientoComponentesArbolagendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasSubagendamientoComponentesArbolagendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasSubagendamientoComponentesArbolagendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
