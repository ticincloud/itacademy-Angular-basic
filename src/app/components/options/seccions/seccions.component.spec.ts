import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionsComponent } from './seccions.component';

describe('SeccionsComponent', () => {
  let component: SeccionsComponent;
  let fixture: ComponentFixture<SeccionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
