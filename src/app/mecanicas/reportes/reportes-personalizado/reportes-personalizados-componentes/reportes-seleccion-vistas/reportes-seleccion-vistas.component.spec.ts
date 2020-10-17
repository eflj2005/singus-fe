import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesSeleccionVistasComponent } from './reportes-seleccion-vistas.component';

describe('SeleccionVistasComponent', () => {
  let component: ReportesSeleccionVistasComponent;
  let fixture: ComponentFixture<ReportesSeleccionVistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesSeleccionVistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesSeleccionVistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
