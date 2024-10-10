import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionelDeSanteComponent } from './professionel-de-sante.component';

describe('ProfessionelDeSanteComponent', () => {
  let component: ProfessionelDeSanteComponent;
  let fixture: ComponentFixture<ProfessionelDeSanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessionelDeSanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionelDeSanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
