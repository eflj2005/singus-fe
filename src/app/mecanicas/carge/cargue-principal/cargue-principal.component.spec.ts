import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarguePrincipalComponent } from './cargue-principal.component';

describe('CarguePrincipalComponent', () => {
  let component: CarguePrincipalComponent;
  let fixture: ComponentFixture<CarguePrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarguePrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarguePrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
