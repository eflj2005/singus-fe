import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarguesPrincipalComponent } from './cargues-principal.component';

describe('CarguesPrincipalComponent', () => {
  let component: CarguesPrincipalComponent|;
  let fixture: ComponentFixture<CarguesPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarguesPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarguesPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
