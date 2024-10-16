import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSouscripteurComponent } from './home-souscripteur.component';

describe('HomeSouscripteurComponent', () => {
  let component: HomeSouscripteurComponent;
  let fixture: ComponentFixture<HomeSouscripteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeSouscripteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSouscripteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
