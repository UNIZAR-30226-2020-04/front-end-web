import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPlaylistComponent } from './ver-playlist.component';

describe('VerPlaylistComponent', () => {
  let component: VerPlaylistComponent;
  let fixture: ComponentFixture<VerPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
