import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEstadisticasComponent } from './dashboard-estadisticas.component';

describe('DashboardEstadisticasComponent', () => {
  let component: DashboardEstadisticasComponent;
  let fixture: ComponentFixture<DashboardEstadisticasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardEstadisticasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
