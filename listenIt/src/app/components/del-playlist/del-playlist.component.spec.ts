import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelPlaylistComponent } from './del-playlist.component';

describe('DelPlaylistComponent', () => {
  let component: DelPlaylistComponent;
  let fixture: ComponentFixture<DelPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
