import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultComponentComponent } from './search-result-component.component';

describe('SearchResultComponentComponent', () => {
  let component: SearchResultComponentComponent;
  let fixture: ComponentFixture<SearchResultComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
