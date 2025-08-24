import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as T from '../state/templates/templates.actions';
import { selectCurrentTemplate } from '../state/templates/templates.selectors';
import { FormField, FormTemplate, FieldType } from '../models/form.models';

@Component({
  selector: 'app-template-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.scss']
})
export class TemplateEditComponent implements OnInit, OnDestroy {
  templateId: string | null = null;
  templateName = 'Untitled form';

  palette: Partial<FormField>[] = [
    { type: 'text',     label: 'Text' },
    { type: 'textarea', label: 'Textarea' },
    { type: 'select',   label: 'Select',  options: ['Option 1', 'Option 2'] },
    { type: 'checkbox', label: 'Checkbox group', options: ['A', 'B'] },
    { type: 'radio',    label: 'Radio group',    options: ['Yes', 'No'] },
    { type: 'date',     label: 'Date' },
  ] as any[];

  fields: FormField[] = [];
  selectedIndex: number | null = null;
  optionsBuffer = '';

  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.templateId = id;
      this.store.dispatch(T.getTemplate({ id }));

      this.sub = this.store.select(selectCurrentTemplate).subscribe(t => {
        if (!t) return;
        this.templateName = t.name;
        this.fields = JSON.parse(JSON.stringify(t.fields || []));
        this.ensureValidationForAllFields();
        this.selectedIndex = null;
        this.syncOptionsBuffer();
      });
    }
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  onDrop(e: CdkDragDrop<FormField[]>): void {
    if (e.previousContainer === e.container) {
      moveItemInArray(this.fields, e.previousIndex, e.currentIndex);
      return;
    }
    const src = (e.previousContainer.data as any[])[e.previousIndex];
    const cloned: FormField = {
      id: this.createId('f'),
      type: src.type,
      label: src.label || '',
      helpText: src.helpText || '',
      options: src.options ? [...src.options] : undefined,
      validation: { required: false, ...(src.validation || {}) }
    };
    this.fields.splice(e.currentIndex, 0, cloned);
    this.ensureValidationForAllFields();
    this.selectedIndex = e.currentIndex;
    this.syncOptionsBuffer();
  }

  add(type: FieldType): void {
    const base: FormField = {
      id: this.createId('f'),
      type,
      label: '',
      helpText: '',
      options: (type === 'select' || type === 'checkbox' || type === 'radio') ? [] : undefined,
      validation: { required: false }
    };
    this.fields.push(base);
    this.ensureValidationForAllFields();
    this.selectedIndex = this.fields.length - 1;
    this.syncOptionsBuffer();
  }

  select(i: number): void {
    this.selectedIndex = i;
    this.ensureValidationForAllFields();
    this.syncOptionsBuffer();
  }

  remove(i: number): void {
    this.fields.splice(i, 1);
    this.selectedIndex = null;
    this.optionsBuffer = '';
  }

  hasOptions(t: FieldType): boolean {
    return t === 'select' || t === 'checkbox' || t === 'radio';
  }

  get selected(): FormField | null {
    return this.selectedIndex === null ? null : this.fields[this.selectedIndex];
  }

  applyOptions(): void {
    if (!this.selected || !this.hasOptions(this.selected.type)) return;
    this.selected.options = this.optionsBuffer
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }

  save(): void {
    const now = new Date().toISOString();
    if (this.templateId) {
      const template: FormTemplate = {
        id: this.templateId!,
        name: this.templateName || 'Untitled form',
        fields: this.fields,
        createdAt: now, 
        updatedAt: now
      };
      this.store.dispatch(T.updateTemplate({ template }));
    } else {
       const template: FormTemplate = {
        id: this.createId('t'),  
        name: this.templateName || 'Untitled form',
        fields: this.fields,
        createdAt: now,
        updatedAt: now
      };
      this.store.dispatch(T.createTemplate({ template }));
    }

    this.router.navigate(['/templates']);
  }


  delete(): void {
    if (!this.templateId) return;
    if (confirm('Delete this template?')) {
      this.store.dispatch(T.deleteTemplate({ id: this.templateId }));
      this.router.navigate(['/templates']);
    }
  }

  private createId(prefix: string): string {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  private syncOptionsBuffer(): void {
    if (!this.selected) { this.optionsBuffer = ''; return; }
    this.optionsBuffer = (this.selected.options ?? []).join(', ');
  }

  private ensureValidationForAllFields(): void {
    this.fields.forEach(f => {
      f.validation = f.validation ?? {};
    });
  }
}
