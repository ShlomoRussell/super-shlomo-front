import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSiteInfoComponent } from './current-site-info.component';

describe('CurrentSiteInfoComponent', () => {
  let component: CurrentSiteInfoComponent;
  let fixture: ComponentFixture<CurrentSiteInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentSiteInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentSiteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
