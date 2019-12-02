import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestrasComponentesProcesarComponent } from './maestras-componentes-procesar.component';

describe('MaestrasComponentesProcesarComponent', () => {
  let component: MaestrasComponentesProcesarComponent;
  let fixture: ComponentFixture<MaestrasComponentesProcesarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestrasComponentesProcesarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestrasComponentesProcesarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
