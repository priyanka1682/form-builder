import { createReducer, on } from '@ngrx/store';
import { setRole, clearRole } from './auth.actions';

export interface AuthState { role: 'admin'|'user'|null; }
export const initialAuthState: AuthState = { role: null };

export const authReducer = createReducer(
  initialAuthState,
  on(setRole, (s, { role }) => ({ ...s, role })),
  on(clearRole, () => ({ role: null }))
);
