import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioLoguearComponent } from './inicio-loguear.component';

describe('InicioLogearComponent', () => {
  let component: InicioLoguearComponent;
  let fixture: ComponentFixture<InicioLoguearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioLoguearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioLoguearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
