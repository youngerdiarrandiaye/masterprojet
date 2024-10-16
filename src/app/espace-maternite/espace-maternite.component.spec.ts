import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceMaterniteComponent } from './espace-maternite.component';

describe('EspaceMaterniteComponent', () => {
  let component: EspaceMaterniteComponent;
  let fixture: ComponentFixture<EspaceMaterniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EspaceMaterniteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceMaterniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
