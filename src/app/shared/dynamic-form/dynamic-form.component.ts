import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormTemplate, FormField } from '../../models/form.models';

@Component({
  selector: 'app-dynamic-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnChanges {
  @Input() template: FormTemplate | null = null;
  @Input() readOnly = false;
  @Output() submitted = new EventEmitter<Record<string, any>>();

  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    if (!this.template) return;
    const group: Record<string, FormControl> = {};
    for (const f of this.template.fields) {
      const v = [];
      if (f.validation?.required) v.push(Validators.required);
      if (f.validation?.minLength) v.push(Validators.minLength(f.validation.minLength));
      if (f.validation?.maxLength) v.push(Validators.maxLength(f.validation.maxLength));
      if (f.validation?.pattern) v.push(Validators.pattern(f.validation.pattern));

      const initial = f.type === 'checkbox' ? [] : '';
      group[f.id] = new FormControl({ value: initial, disabled: this.readOnly }, v);
    }

    this.form = this.fb.group(group);
    if (this.readOnly) this.form.disable({ emitEvent: false });
  }

  onCheckboxToggle(fieldId: string, option: string, checked?: boolean) {
    const ctrl = this.form.get(fieldId);
    const current: any[] = Array.isArray(ctrl?.value) ? (ctrl!.value as any[]) : [];
    const next = checked ? Array.from(new Set([...current, option]))
                       : current.filter(x => x !== option);
    ctrl?.setValue(next);
    ctrl?.markAsDirty();
    ctrl?.markAsTouched();
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.getRawValue());
    } else {
      this.form.markAllAsTouched();
    }
  }

  hasOptions(f: FormField) { return f.type==='select' || f.type==='checkbox' || f.type==='radio'; }
}
