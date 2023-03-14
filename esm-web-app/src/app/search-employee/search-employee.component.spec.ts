import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchEmployeeComponent } from './search-employee.component';


describe('SearchEmployeeComponent', () => {
  let component: SearchEmployeeComponent;
  let fixture: ComponentFixture<SearchEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchEmployeeComponent ],
      imports: [ HttpClientModule, MatSnackBarModule, MatDividerModule, MatDialogModule ],
      providers: [MatDialog, MatDialogRef],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
