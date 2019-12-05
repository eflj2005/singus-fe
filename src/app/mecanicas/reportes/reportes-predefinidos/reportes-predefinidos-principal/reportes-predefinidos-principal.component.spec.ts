import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesPredefinidosPrincipalComponent } from './reportes-predefinidos-principal.component';

describe('ReportesPredefinidosPrincipalComponent', () => {
  let component: ReportesPredefinidosPrincipalComponent;
  let fixture: ComponentFixture<ReportesPredefinidosPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesPredefinidosPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesPredefinidosPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
