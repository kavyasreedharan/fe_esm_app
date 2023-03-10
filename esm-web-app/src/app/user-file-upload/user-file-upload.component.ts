import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../service/file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-file-upload',
  templateUrl: './user-file-upload.component.html',
  styleUrls: ['./user-file-upload.component.scss']
})
export class UserFileUploadComponent implements OnInit {

  loading: boolean = false; 
  file: File; 
  isDisabled:boolean = true;

  ngOnInit(): void {
    console.log('Loading UserFileUploadComponent')
  }

  constructor(private fileUploadService: FileUploadService, private userMessage: MatSnackBar) { }

  onFileSelect(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
    if(this.file && this.file.size > 0) {
      this.isDisabled = false;
    }
  }
  

  onFileUpload() {
    this.loading = !this.loading;
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
