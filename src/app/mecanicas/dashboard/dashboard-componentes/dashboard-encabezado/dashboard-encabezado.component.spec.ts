import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEncabezadoComponent } from './dashboard-encabezado.component';

describe('DashboardEncabezadoComponent', () => {
  let component: DashboardEncabezadoComponent;
  let fixture: ComponentFixture<DashboardEncabezadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardEncabezadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEncabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
