import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubscriptionDialogComponent } from './update-subscription-dialog.component';

describe('AddFamilyMemberDialogComponent', () => {
  let component: UpdateSubscriptionDialogComponent;
  let fixture: ComponentFixture<UpdateSubscriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSubscriptionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSubscriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
