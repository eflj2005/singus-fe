import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestrasDetalleComponent } from './maestras-detalle.component';

describe('MaestrasDetalleComponent', () => {
  let component: MaestrasDetalleComponent;
  let fixture: ComponentFixture<MaestrasDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestrasDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestrasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
