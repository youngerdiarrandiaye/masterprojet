import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouscriptionsComponent } from './souscriptions.component';

describe('SouscriptionsComponent', () => {
  let component: SouscriptionsComponent;
  let fixture: ComponentFixture<SouscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SouscriptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SouscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
