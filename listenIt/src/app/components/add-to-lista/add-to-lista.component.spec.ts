import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToListaComponent } from './add-to-lista.component';

describe('AddToListaComponent', () => {
  let component: AddToListaComponent;
  let fixture: ComponentFixture<AddToListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
