import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuth = createFeatureSelector<AuthState>('auth');
export const selectRole = createSelector(selectAuth, s => s.role);
export const selectIsAdmin = createSelector(selectRole, r => r === 'admin');
