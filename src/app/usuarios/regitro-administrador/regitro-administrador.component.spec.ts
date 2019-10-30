import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegitroAdministradorComponent } from './regitro-administrador.component';

describe('RegitroAdministradorComponent', () => {
  let component: RegitroAdministradorComponent;
  let fixture: ComponentFixture<RegitroAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegitroAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegitroAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
