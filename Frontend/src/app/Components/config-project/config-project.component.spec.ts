import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigProjectComponent } from './config-project.component';

describe('ConfigProjectComponent', () => {
  let component: ConfigProjectComponent;
  let fixture: ComponentFixture<ConfigProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
