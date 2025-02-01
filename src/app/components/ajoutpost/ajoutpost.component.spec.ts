import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutpostComponent } from './ajoutpost.component';

describe('AjoutpostComponent', () => {
  let component: AjoutpostComponent;
  let fixture: ComponentFixture<AjoutpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutpostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
