import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as A from './submissions.actions';
import { ApiService } from '../../services/api.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class SubmissionsEffects {
  private actions$ = inject(Actions);
  private api = inject(ApiService);

  submit$ = createEffect(() => this.actions$.pipe(
    ofType(A.submitForm),
    mergeMap(({ submission }) => this.api.createSubmission(submission).pipe(
      map(s => A.submitFormSuccess({ submission: s })),
      catchError(() => of(A.submitFormFailure()))
    ))
  ));

  load$ = createEffect(() => this.actions$.pipe(
    ofType(A.loadSubmissions),
    mergeMap(({ templateId }) => this.api.listSubmissionsByTemplate(templateId).pipe(
      map(list => A.loadSubmissionsSuccess({ templateId, list })),
      catchError(() => of(A.loadSubmissionsFailure()))
    ))
  ));
}
