import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasserconsultationComponent } from './passerconsultation.component';

describe('PasserconsultationComponent', () => {
  let component: PasserconsultationComponent;
  let fixture: ComponentFixture<PasserconsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasserconsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasserconsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
