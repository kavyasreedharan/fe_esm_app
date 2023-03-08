import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../service/file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-file-upload',
  templateUrl: './user-file-upload.component.html',
  styleUrls: ['./user-file-upload.component.scss']
})
export class UserFileUploadComponent implements OnInit {

  // Variable to store shortLink from api response
  loading: boolean = false; // Flag variable
  file: any; // Variable to store file

  ngOnInit(): void {
    console.log('Loading UserFileUploadComponent')
  }

  constructor(private fileUploadService: FileUploadService, private userMessage: MatSnackBar) { }

  onFileSelect(event: any) {
    this.file = event.target.files[0];
  }

  onFileUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
      (response: any) => {
        console.log('response => ' + JSON.stringify(response));
        this.loading = false;
        this.userMessage.open(response.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
      },
      (error: any) => {
        console.log('error => ' + JSON.stringify(error));
        this.loading = false;
        this.userMessage.open(error, '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
      }
    )
  }


}
