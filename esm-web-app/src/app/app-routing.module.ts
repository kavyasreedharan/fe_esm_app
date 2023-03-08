import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserFileUploadComponent } from './user-file-upload/user-file-upload.component';

const routes: Routes = [
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'usersDataUpload', component: UserFileUploadComponent },
  { path: 'dashboard', component: DashboardComponent },
];
UserFileUploadComponent
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
