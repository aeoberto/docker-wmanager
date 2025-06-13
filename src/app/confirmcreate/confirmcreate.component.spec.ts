import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmcreateComponent } from './confirmcreate.component';

describe('ConfirmcreateComponent', () => {
  let component: ConfirmcreateComponent;
  let fixture: ComponentFixture<ConfirmcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmcreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
