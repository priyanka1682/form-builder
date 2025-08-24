import { createReducer, on } from '@ngrx/store';
import { FormTemplate } from '../../models/form.models';
import * as A from './templates.actions';

export interface TemplatesState {
  list: FormTemplate[];
  current: FormTemplate | null;
  loading: boolean;
}
export const initialTemplatesState: TemplatesState = { list: [], current: null, loading: false };

export const templatesReducer = createReducer(
  initialTemplatesState,
  on(A.loadTemplates, s => ({ ...s, loading: true })),
  on(A.getTemplateSuccess, (s, { template }) => ({ ...s, current: template })),
  on(A.updateTemplateSuccess, (state, { template }) => {
    if (!template || !template.id) return state; 
    const list = (state.list ?? []).filter((x): x is FormTemplate => !!x && !!(x as any).id);
    const idx  = list.findIndex(t => t.id === template.id);

    const next = idx === -1
    ? [...list, template]
    : [...list.slice(0, idx), template, ...list.slice(idx + 1)];

    return { ...state, list: next, current: template };
  }),

  on(A.createTemplateSuccess, (state, { template }) => {
    if (!template || !template.id) return state;
    const list = (state.list ?? []).filter((x): x is FormTemplate => !!x && !!(x as any).id);
    return { ...state, list: [...list, template], current: template };
  }),

  on(A.loadTemplatesSuccess, (state, { templates }) => {
    const list = (templates ?? []).filter((t): t is FormTemplate => !!t && !!(t as any).id);
    return { ...state, list };
  }),

  on(A.deleteTemplateSuccess, (s, { id }) => ({ ...s, list: s.list.filter(t => t.id !== id), current: null }))
);
