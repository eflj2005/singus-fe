import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarguesComponentesAnalizartipo1Component } from './cargues-componentes-analizartipo1.component';

describe('CarguesComponentesAnalizartipo1Component', () => {
  let component: CarguesComponentesAnalizartipo1Component;
  let fixture: ComponentFixture<CarguesComponentesAnalizartipo1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarguesComponentesAnalizartipo1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarguesComponentesAnalizartipo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
