import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConstants {
    public HOST_URL = "http://localhost:8080";
    public USER_DATA_FILE_UPLOAD_ENDPOINT = "/users/upload";
    public GET_USERS_DATA_ENDPOINT = "/users";
}
