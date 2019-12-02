import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestrasComponentesListaComponent } from './maestras-componentes-lista.component';

describe('MaestrasComponentesListaComponent', () => {
  let component: MaestrasComponentesListaComponent;
  let fixture: ComponentFixture<MaestrasComponentesListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestrasComponentesListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestrasComponentesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
