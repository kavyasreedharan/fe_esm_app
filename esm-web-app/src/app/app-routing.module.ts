import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchEmployeeComponent } from './search-employee/search-employee.component';
import { UserFileUploadComponent } from './user-file-upload/user-file-upload.component';

const routes: Routes = [
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'usersDataUpload', component: UserFileUploadComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'addUser', component: AddEmployeeComponent },
  { path: 'searchUser', component: SearchEmployeeComponent },
];
UserFileUploadComponent
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
