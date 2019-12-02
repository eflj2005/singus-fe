import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosComponentesCrearComponent } from './eventos-componentes-crear.component';

describe('EventosComponentesCrearComponent', () => {
  let component: EventosComponentesCrearComponent;
  let fixture: ComponentFixture<EventosComponentesCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosComponentesCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosComponentesCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
