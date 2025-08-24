import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../shared/dynamic-form/dynamic-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as T from '../state/templates/templates.actions';
import * as S from '../state/submissions/submissions.actions';
import { selectCurrentTemplate } from '../state/templates/templates.selectors';
import { Submission } from '../models/form.models';
import { Observable } from 'rxjs';
import { FormTemplate } from '../models/form.models';

@Component({
  selector: 'app-fill-form',
   imports: [CommonModule, DynamicFormComponent],
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {
  templateId!: string;
  template$!: Observable<FormTemplate | null>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {
    this.template$ = this.store.select(selectCurrentTemplate);
  }

  ngOnInit(): void {
    this.templateId = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(T.getTemplate({ id: this.templateId }));
  }

  onSubmit(values: Record<string, any>): void {
    const submission: Submission = {
      id: `s-${Date.now()}`,
      templateId: this.templateId,
      values,
      createdAt: new Date().toISOString()
    };
    this.store.dispatch(S.submitForm({ submission }));
    this.router.navigate(['/submissions', this.templateId]);
  }
}
