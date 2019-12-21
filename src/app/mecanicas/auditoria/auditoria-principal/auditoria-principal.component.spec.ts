import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaPrincipalComponent } from './auditoria-principal.component';

describe('AuditoriaPrincipalComponent', () => {
  let component: AuditoriaPrincipalComponent;
  let fixture: ComponentFixture<AuditoriaPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriaPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
