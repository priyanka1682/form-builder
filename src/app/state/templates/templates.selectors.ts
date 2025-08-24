import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TemplatesState } from './templates.reducer';

export const selectTemplates = createFeatureSelector<TemplatesState>('templates');
export const selectTemplateList = createSelector(selectTemplates, s => s.list);
export const selectCurrentTemplate = createSelector(selectTemplates, s => s.current);
export const selectTemplatesLoading = createSelector(selectTemplates, s => s.loading);
