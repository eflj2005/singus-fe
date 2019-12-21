import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesPersonalizadoPrincipalComponent } from './reportes-personalizado-principal.component';

describe('ReportesPersonalizadoPrincipalComponent', () => {
  let component: ReportesPersonalizadoPrincipalComponent;
  let fixture: ComponentFixture<ReportesPersonalizadoPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesPersonalizadoPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesPersonalizadoPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
