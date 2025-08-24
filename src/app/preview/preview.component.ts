import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../shared/dynamic-form/dynamic-form.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as A from '../state/templates/templates.actions';
import { selectCurrentTemplate } from '../state/templates/templates.selectors';
import { Observable } from 'rxjs';
import { FormTemplate } from '../models/form.models';

@Component({
  selector: 'app-preview',
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  template$!: Observable<FormTemplate | null>;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.template$ = this.store.select(selectCurrentTemplate);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(A.getTemplate({ id }));
  }
}
