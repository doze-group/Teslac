import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListconversationsComponent } from './listconversations.component';

describe('ListconversationsComponent', () => {
  let component: ListconversationsComponent;
  let fixture: ComponentFixture<ListconversationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListconversationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListconversationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
