import { createReducer, on } from '@ngrx/store';
import * as A from './submissions.actions';
import { Submission } from '../../models/form.models';

export interface SubmissionsState {
  byTemplate: Record<string, Submission[]>;
}
export const initialSubmissionsState: SubmissionsState = { byTemplate: {} };

export const submissionsReducer = createReducer(
  initialSubmissionsState,
  on(A.loadSubmissionsSuccess, (s, { templateId, list }) => ({
    ...s, byTemplate: { ...s.byTemplate, [templateId]: list }
  })),
  on(A.submitFormSuccess, (s, { submission }) => {
    const list = s.byTemplate[submission.templateId] ?? [];
    return { ...s, byTemplate: { ...s.byTemplate, [submission.templateId]: [...list, submission] } };
  })
);
