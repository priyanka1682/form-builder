import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { loadTemplates, deleteTemplate } from '../state/templates/templates.actions';
import { selectTemplateList } from '../state/templates/templates.selectors';
import { FormTemplate } from '../models/form.models';

@Component({
  selector: 'app-template-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {
  templates$!: Observable<FormTemplate[]>;

  constructor(private store: Store, private router: Router) {
    this.templates$ = this.store.select(selectTemplateList);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTemplates());
  }

  create(): void {
    this.router.navigate(['/templates', 'new', 'edit']);
  }
  edit(id: string): void {
    this.router.navigate(['/templates', id, 'edit']);
  }
  preview(id: string): void {
    this.router.navigate(['/preview', id]);
  }
  fill(id: string): void {
    this.router.navigate(['/fill', id]);
  }
  remove(id: string): void {
    if (confirm('Delete this template?')) {
      this.store.dispatch(deleteTemplate({ id }));
    }
  }
}
