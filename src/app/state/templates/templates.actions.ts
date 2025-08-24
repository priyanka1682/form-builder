import { createAction, props } from '@ngrx/store';
import { FormTemplate } from '../../models/form.models';

export const loadTemplates = createAction('[Templates] Load');
export const loadTemplatesSuccess = createAction('[Templates] Load Success', props<{ templates: FormTemplate[] }>()); 
export const loadTemplatesFailure = createAction('[Templates] Load Failure');

export const getTemplate = createAction('[Templates] Get', props<{ id: string }>()); 
export const getTemplateSuccess = createAction('[Templates] Get Success', props<{ template: FormTemplate }>()); 
export const getTemplateFailure = createAction('[Templates] Get Failure');

export const createTemplate = createAction('[Templates] Create', props<{ template: FormTemplate }>());
export const createTemplateSuccess = createAction('[Templates] Create Success', props<{ template: FormTemplate }>());

export const updateTemplate = createAction('[Templates] Update', props<{ template: FormTemplate }>());
export const updateTemplateSuccess = createAction('[Templates] Update Success', props<{ template: FormTemplate }>());

export const deleteTemplate = createAction('[Templates] Delete', props<{ id: string }>()); 
export const deleteTemplateSuccess = createAction('[Templates] Delete Success', props<{ id: string }>()); 
export const deleteTemplateFailure = createAction('[Templates] Delete Failure');
