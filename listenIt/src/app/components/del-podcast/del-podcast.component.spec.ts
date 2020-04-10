import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelPodcastComponent } from './del-podcast.component';

describe('DelPodcastComponent', () => {
  let component: DelPodcastComponent;
  let fixture: ComponentFixture<DelPodcastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelPodcastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelPodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
