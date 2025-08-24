import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormTemplate, Submission } from '../models/form.models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'api';
  constructor(private http: HttpClient) {}

  listTemplates(): Observable<FormTemplate[]> {
    return this.http.get<FormTemplate[]>(`${this.base}/templates`);
  }
  getTemplate(id: string): Observable<FormTemplate> {
    return this.http.get<FormTemplate>(`${this.base}/templates/${id}`);
  }
  createTemplate(t: FormTemplate): Observable<FormTemplate> {
    console.log('[API] POST /templates', t); 
    return this.http.post<FormTemplate>(`${this.base}/templates`, t);
  }
  updateTemplate(t: FormTemplate): Observable<FormTemplate> {
    return this.http.put<FormTemplate>(`${this.base}/templates/${t.id}`, t);
  }
  deleteTemplate(id: string): Observable<unknown> {
    return this.http.delete(`${this.base}/templates/${id}`);
  }

  createSubmission(s: Submission): Observable<Submission> {
    return this.http.post<Submission>(`${this.base}/submissions`, s);
  }
  listSubmissionsByTemplate(templateId: string): Observable<Submission[]> {
    return this.http.get<Submission[]>(`${this.base}/submissions?templateId=${templateId}`);
  }
}
