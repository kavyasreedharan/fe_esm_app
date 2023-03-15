import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Employee } from '../model/employee.model';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let employees: Employee[] = [
    { id: 'e0001', login: 'hpotter', name: 'Harry Potter', salary: 1234 },
    { id: 'e0002', login: 'rwesley', name: 'Ron Weasley', salary: 19234.5  },
    { id: 'e0003', login: 'ssnape', name: 'Severus Snape', salary: 4000  }
  ];
  let snackBar: MatSnackBar;
  const mockSnackbarMock = jasmine.createSpyObj(['open']);
  mockSnackbarMock.open

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ HttpClientModule, MatSnackBarModule, BrowserAnimationsModule, ReactiveFormsModule, MatDialogModule, MatDividerModule, MatFormFieldModule,
         MatInputModule, MatSliderModule, MatPaginatorModule, MatTableModule, ],
          providers: [{provide: MatSnackBar},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h2 tag', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Employees');
  });

  it('should render slider label in a mat-label tag', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-label').textContent).toContain('Select a salary range');
  });

  it('should render no reords row tag', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('td').textContent).toContain('No records');
  });

  // it('should test the data in table tag', (done) => {
  //   let dataSource = new MatTableDataSource(employees);
  //   expect(component.dataSource).toEqual(dataSource);
  
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     fixture.detectChanges();
  
  //     let tableRows = fixture.nativeElement.querySelectorAll('tr');
  //     expect(tableRows.length).toBe(4);
  
  //     // Header row
  //     let headerRow = tableRows[0];
  //     expect(headerRow.cells[0].innerHTML).toBe('ID');
  //     expect(headerRow.cells[1].innerHTML).toBe('Login');
  //     expect(headerRow.cells[2].innerHTML).toBe('Name');
  //     expect(headerRow.cells[3].innerHTML).toBe('Salary');
  
  //     // Data rows
  //     let row1 = tableRows[1];
  //     expect(row1.cells[0].innerHTML).toBe('e0001');
  //     expect(row1.cells[1].innerHTML).toBe('hpotter');
  //     expect(row1.cells[2].innerHTML).toBe('Harry Potter');
  //     expect(row1.cells[3].innerHTML).toBe(1234);
  //     done();
  //   });
  // }, 10000);
});
