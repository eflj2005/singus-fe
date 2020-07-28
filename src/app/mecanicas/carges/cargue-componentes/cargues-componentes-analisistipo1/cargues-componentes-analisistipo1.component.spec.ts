import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarguesComponentesAnalisistipo1Component } from './cargues-componentes-analisistipo1.component';

describe('CarguesComponentesAnalisistipo1Component', () => {
  let component: CarguesComponentesAnalisistipo1Component;
  let fixture: ComponentFixture<CarguesComponentesAnalisistipo1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarguesComponentesAnalisistipo1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarguesComponentesAnalisistipo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
