import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosComponentesListaComponent } from './eventos-componentes-lista.component';

describe('EventosComponentesListaComponent', () => {
  let component: EventosComponentesListaComponent;
  let fixture: ComponentFixture<EventosComponentesListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosComponentesListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosComponentesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
