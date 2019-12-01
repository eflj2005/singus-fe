import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionMaestrasDetalleComponent } from './administracion-maestras-detalle.component';

describe('AdministracionMaestrasDetalleComponent', () => {
  let component: AdministracionMaestrasDetalleComponent;
  let fixture: ComponentFixture<AdministracionMaestrasDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracionMaestrasDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionMaestrasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
