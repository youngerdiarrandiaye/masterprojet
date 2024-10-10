import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAssuranceTemplateComponent } from './agent-assurance-template.component';

describe('AgentAssuranceTemplateComponent', () => {
  let component: AgentAssuranceTemplateComponent;
  let fixture: ComponentFixture<AgentAssuranceTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentAssuranceTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentAssuranceTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
