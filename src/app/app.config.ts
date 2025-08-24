import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { authReducer } from './state/auth/auth.reducer';
import { templatesReducer } from './state/templates/templates.reducer';
import { submissionsReducer } from './state/submissions/submissions.reducer';
import { TemplatesEffects } from './state/templates/templates.effects';
import { SubmissionsEffects } from './state/submissions/submissions.effects';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),

    provideStore({
      auth: authReducer,
      templates: templatesReducer,
      submissions: submissionsReducer,
    }),
    provideEffects(TemplatesEffects, SubmissionsEffects),

    importProvidersFrom(
      StoreDevtoolsModule.instrument({ maxAge: 25 }),
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 300, apiBase: 'api/' })
    ),
  ],
};
