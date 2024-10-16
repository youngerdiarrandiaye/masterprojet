import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationGrossesseComponent } from './declaration-grossesse.component';

describe('DeclarationGrossesseComponent', () => {
  let component: DeclarationGrossesseComponent;
  let fixture: ComponentFixture<DeclarationGrossesseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeclarationGrossesseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclarationGrossesseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
