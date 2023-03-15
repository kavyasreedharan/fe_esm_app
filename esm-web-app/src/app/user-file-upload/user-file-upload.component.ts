import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../service/file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-file-upload',
  templateUrl: './user-file-upload.component.html',
  styleUrls: ['./user-file-upload.component.scss']
})
export class UserFileUploadComponent implements OnInit {

  loading: boolean = false;
  file: File;
  isDisabled: boolean = true;

  ngOnInit(): void {
  }

  constructor(private fileUploadService: FileUploadService, private userMessage: MatSnackBar) { }

  onFileSelect(event: any) {
    this.file = event.target.files[0];
    if (this.file && this.file.size > 0) {
      this.isDisabled = false;
    }
  }

  onFileUpload() {
    this.userMessage.open('File uploaded successfully', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
    });
    this.fileUploadService.upload(this.file).subscribe({
      next: (response: any) => {
        if (response) {
          this.loading = false;
          this.isDisabled = false;
          this.userMessage.open('Uploaded employees data has been saved successfully', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: ['red-snackbar', 'login-snackbar'],
          });
        }
      },
      error: (error: any) => {
        this.loading = false;
        this.isDisabled = false;
        this.userMessage.open(error, '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
      },
    });
  }


}
