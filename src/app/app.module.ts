import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { authReducer } from './state/auth/auth.reducer';
import { templatesReducer } from './state/templates/templates.reducer';
import { submissionsReducer } from './state/submissions/submissions.reducer';
import { TemplatesEffects } from './state/templates/templates.effects';
import { SubmissionsEffects } from './state/submissions/submissions.effects';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { LoginComponent } from './login/login.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { TemplateEditComponent } from './template-edit/template-edit.component';
import { PreviewComponent } from './preview/preview.component';
import { FillFormComponent } from './fill-form/fill-form.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { FieldPaletteComponent } from './field-palette/field-palette.component';
import { DynamicFormComponent } from './shared/dynamic-form/dynamic-form.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    AppComponent,
    LoginComponent,
    TemplateListComponent,
    TemplateEditComponent,
    PreviewComponent,
    FillFormComponent,
    SubmissionsComponent,
    FieldPaletteComponent,
    DynamicFormComponent,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 300, apiBase: '/api/' }),
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      auth: authReducer,
      templates: templatesReducer,
      submissions: submissionsReducer
    }),
    EffectsModule.forRoot([TemplatesEffects, SubmissionsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
