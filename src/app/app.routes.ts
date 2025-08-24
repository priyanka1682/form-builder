import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { TemplateEditComponent } from './template-edit/template-edit.component';
import { PreviewComponent } from './preview/preview.component';
import { FillFormComponent } from './fill-form/fill-form.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { adminGuard } from './services/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'templates', 
    component: TemplateListComponent 
  },
  { 
    path: 'templates/new/edit', 
    component: TemplateEditComponent, 
    canActivate: [adminGuard] 
  },
  { 
    path: 'templates/:id/edit', 
    component: TemplateEditComponent, 
    canActivate: [adminGuard] 
  },
  { 
    path: 'preview/:id', 
    component: PreviewComponent, 
    canActivate: [adminGuard] 
  },
  { 
    path: 'fill/:id', 
    component: FillFormComponent 
  },
  { 
    path: 'submissions/:id', 
    component: SubmissionsComponent, 
    canActivate: [adminGuard] 
  },
  { 
    path: '', 
    pathMatch: 'full', 
    redirectTo: 'templates' 
  },
  { 
    path: '**', 
    redirectTo: 'templates' 
  }
];
