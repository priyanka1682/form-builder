import { createAction, props } from '@ngrx/store';
export const setRole = createAction('[Auth] Set Role', props<{ role: 'admin'|'user' }>()); 
export const clearRole = createAction('[Auth] Clear Role');
