import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SubmissionsState } from './submissions.reducer';

export const selectSubmissions = createFeatureSelector<SubmissionsState>('submissions');
export const selectSubmissionsByTemplate = (templateId: string) =>
  createSelector(selectSubmissions, s => s.byTemplate[templateId] ?? []);
