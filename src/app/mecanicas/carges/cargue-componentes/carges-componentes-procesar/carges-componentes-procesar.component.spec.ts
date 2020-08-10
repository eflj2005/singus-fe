import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargesComponentesProcesarComponent } from './carges-componentes-procesar.component';

describe('CargesComponentesProcesarComponent', () => {
  let component: CargesComponentesProcesarComponent;
  let fixture: ComponentFixture<CargesComponentesProcesarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargesComponentesProcesarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargesComponentesProcesarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
