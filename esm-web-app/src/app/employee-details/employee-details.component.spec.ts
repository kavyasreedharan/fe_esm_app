import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { EmployeeDetailsComponent } from './employee-details.component';

describe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDetailsComponent ],
      imports: [ HttpClientModule, MatSnackBarModule, MatDividerModule, MatDialogModule ],
      providers: [MatDialog, MatDialogRef],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render ID label in mat-label', () => {
    const fixture = TestBed.createComponent(EmployeeDetailsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-label').textContent).toContain('Employee ID');
  });

  it('should render Login label in mat-label', () => {
    const fixture = TestBed.createComponent(EmployeeDetailsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-label').textContent).toContain('Employee Login');
  });

  it('should render Name label in mat-label', () => {
    const fixture = TestBed.createComponent(EmployeeDetailsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-label').textContent).toContain('Employee Name');
  });

  it('should render Salary label in mat-label', () => {
    const fixture = TestBed.createComponent(EmployeeDetailsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-label').textContent).toContain('Salary');
  });
});
