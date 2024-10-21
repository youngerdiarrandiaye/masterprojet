import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitesdespatientComponent } from './visitesdespatient.component';

describe('VisitesdespatientComponent', () => {
  let component: VisitesdespatientComponent;
  let fixture: ComponentFixture<VisitesdespatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitesdespatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitesdespatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
