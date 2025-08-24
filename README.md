# Dynamic Form Builder 

## Features
- Admin builds templates with drag-drop & properties and saves them.
- Users fill generated forms and submit to a mock API.
- Admins can view submissions.
- NgRx: auth, templates, submissions.
- Centralized routes in `app.routes.ts`.
- 2 unit tests (guard + dynamic form).

## Key paths
- Builder: `src/app/template-edit/*`
- Renderer: `src/app/shared/dynamic-form/*`
- Store: `src/app/state/*`
- Mock API: `src/app/services/*`
