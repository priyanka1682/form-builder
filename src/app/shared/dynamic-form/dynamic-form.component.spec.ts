import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormTemplate } from '../../models/form.models';

describe('DynamicFormComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  it('applies required and minlength validators', () => {
    const fixture = TestBed.createComponent(DynamicFormComponent);
    const comp = fixture.componentInstance;

    const t: FormTemplate = {
      id: 't1', name: 'Test', createdAt: '', updatedAt: '',
      fields: [
        { id: 'f1', type: 'text', label: 'Name', validation: { required: true, minLength: 3 } }
      ]
    };
    comp.template = t;
    fixture.detectChanges();

    const control = comp.form.get('f1')!;
    expect(control.valid).toBeFalse();

    control.setValue('Al'); // 2 chars
    expect(control.valid).toBeFalse();

    control.setValue('Alex');
    expect(control.valid).toBeTrue();
  });
});
