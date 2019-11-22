import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionMaestrasPrincipalComponent } from './administracion-maestras-principal.component';

describe('AdministracionMaestrasPrincipalComponent', () => {
  let component: AdministracionMaestrasPrincipalComponent;
  let fixture: ComponentFixture<AdministracionMaestrasPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracionMaestrasPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionMaestrasPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
