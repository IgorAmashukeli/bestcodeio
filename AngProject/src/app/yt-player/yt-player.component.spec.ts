import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YtPlayerComponent } from './yt-player.component';

describe('YtPlayerComponent', () => {
  let component: YtPlayerComponent;
  let fixture: ComponentFixture<YtPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YtPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YtPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
