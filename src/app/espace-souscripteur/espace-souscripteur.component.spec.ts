import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceSouscripteurComponent } from './espace-souscripteur.component';

describe('EspaceSouscripteurComponent', () => {
  let component: EspaceSouscripteurComponent;
  let fixture: ComponentFixture<EspaceSouscripteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EspaceSouscripteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceSouscripteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
