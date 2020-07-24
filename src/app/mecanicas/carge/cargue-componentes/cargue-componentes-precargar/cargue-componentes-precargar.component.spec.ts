import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargueComponentesPrecargarComponent } from './cargue-componentes-precargar.component';

describe('CargueComponentesPrecargarComponent', () => {
  let component: CargueComponentesPrecargarComponent;
  let fixture: ComponentFixture<CargueComponentesPrecargarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargueComponentesPrecargarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargueComponentesPrecargarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
