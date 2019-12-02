import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosComponentesEditarComponent } from './eventos-componentes-editar.component';

describe('EventosComponentesEditarComponent', () => {
  let component: EventosComponentesEditarComponent;
  let fixture: ComponentFixture<EventosComponentesEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosComponentesEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosComponentesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
