import { createAction, props } from '@ngrx/store';
import { Submission } from '../../models/form.models';

export const submitForm = createAction('[Submissions] Submit', props<{ submission: Submission }>()); 
export const submitFormSuccess = createAction('[Submissions] Submit Success', props<{ submission: Submission }>()); 
export const submitFormFailure = createAction('[Submissions] Submit Failure');

export const loadSubmissions = createAction('[Submissions] Load', props<{ templateId: string }>()); 
export const loadSubmissionsSuccess = createAction('[Submissions] Load Success', props<{ templateId: string, list: Submission[] }>()); 
export const loadSubmissionsFailure = createAction('[Submissions] Load Failure');
