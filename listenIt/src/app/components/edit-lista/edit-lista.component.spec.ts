import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListaComponent } from './edit-lista.component';

describe('EditListaComponent', () => {
  let component: EditListaComponent;
  let fixture: ComponentFixture<EditListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
