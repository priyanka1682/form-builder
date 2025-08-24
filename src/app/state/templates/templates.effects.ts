import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as A from './templates.actions';
import { ApiService } from '../../services/api.service';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';

@Injectable()
export class TemplatesEffects {
  private actions$ = inject(Actions);
  private api = inject(ApiService);

  load$ = createEffect(() => this.actions$.pipe(
    ofType(A.loadTemplates),
    switchMap(() => this.api.listTemplates().pipe(
      map(templates => A.loadTemplatesSuccess({ templates })),
      catchError(() => of(A.loadTemplatesFailure()))
    ))
  ));

  get$ = createEffect(() => this.actions$.pipe(
    ofType(A.getTemplate),
    mergeMap(({ id }) => this.api.getTemplate(id).pipe(
      map(template => A.getTemplateSuccess({ template })),
      catchError(() => of(A.getTemplateFailure()))
    ))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(A.createTemplate),
    switchMap(({ template }) =>
      this.api.createTemplate(template).pipe(
        tap(saved => console.log('[EFFECT] API returned', saved)), 
        map(saved =>  A.createTemplateSuccess({ template: saved })),
        catchError(error => {
          console.error('[EFFECT] API error', error);                          
          return of(A.loadTemplatesFailure());
        })
      )
    )
  ));

update$ = createEffect(() => this.actions$.pipe(
    ofType(A.updateTemplate),
    switchMap(({ template }) =>
      this.api.updateTemplate(template).pipe(
        map(saved => A.updateTemplateSuccess({ template: saved })),
        catchError(error => of(A.loadTemplatesFailure()))
      )
    )
  ));


  // upsert$ = createEffect(() => this.actions$.pipe(
  //   ofType(A.upsertTemplate),
  //   mergeMap(({ template }) => {
  //     const call = template.id ? this.api.updateTemplate(template) : this.api.createTemplate(template);
  //     return call.pipe(
  //       map(t => A.upsertTemplateSuccess({ template: t })),
  //       catchError(() => of(A.upsertTemplateFailure()))
  //     );
  //   })
  // ));

  del$ = createEffect(() => this.actions$.pipe(
    ofType(A.deleteTemplate),
    mergeMap(({ id }) => this.api.deleteTemplate(id).pipe(
      map(() => A.deleteTemplateSuccess({ id })),
      catchError(() => of(A.deleteTemplateFailure()))
    ))
  ));
}
