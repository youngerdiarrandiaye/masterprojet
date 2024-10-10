import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTemplateComponent } from './patient-template.component';

describe('PatientTemplateComponent', () => {
  let component: PatientTemplateComponent;
  let fixture: ComponentFixture<PatientTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
