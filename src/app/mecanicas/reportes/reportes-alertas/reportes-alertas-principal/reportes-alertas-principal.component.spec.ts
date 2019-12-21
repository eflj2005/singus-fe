import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesAlertasPrincipalComponent } from './reportes-alertas-principal.component';

describe('ReportesAlertasPrincipalComponent', () => {
  let component: ReportesAlertasPrincipalComponent;
  let fixture: ComponentFixture<ReportesAlertasPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesAlertasPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesAlertasPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
