import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComplexComponent } from './search-complex.component';

describe('SearchComplexComponent', () => {
  let component: SearchComplexComponent;
  let fixture: ComponentFixture<SearchComplexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComplexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
