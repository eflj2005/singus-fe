import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarguesComponentesPrecargarComponent } from './cargues-componentes-precargar.component';

describe('CarguesComponentesPrecargarComponent', () => {
  let component: CarguesComponentesPrecargarComponent;
  let fixture: ComponentFixture<CarguesComponentesPrecargarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarguesComponentesPrecargarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarguesComponentesPrecargarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
