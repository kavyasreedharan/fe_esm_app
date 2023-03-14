import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';

import { UserFileUploadComponent } from './user-file-upload.component';

describe('UserFileUploadComponent', () => {
  let component: UserFileUploadComponent;
  let fixture: ComponentFixture<UserFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFileUploadComponent ],
      imports: [ HttpClientModule, MatSnackBarModule, MatDividerModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect file input change and set file model', () => {
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(new File([''], 'sample-data1.csv'))

    const inputDebugEl  = fixture.debugElement.query(By.css('input[type=file]'));
    inputDebugEl.nativeElement.files = dataTransfer.files;

    inputDebugEl.nativeElement.dispatchEvent(new InputEvent('change'));

    fixture.detectChanges();
    expect(component.file).toBeTruthy();
    expect(component.file.name).toBe('sample-data1.csv');
});

it('should render title in a h2 tag', () => {
  const fixture = TestBed.createComponent(UserFileUploadComponent);
  fixture.detectChanges();
  const compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('h2').textContent).toContain('Upload User Data');
});

it('should render upload data button in a button tag', () => {
  const fixture = TestBed.createComponent(UserFileUploadComponent);
  fixture.detectChanges();
  const compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('button').textContent).toContain('Upload Data');
});

});
