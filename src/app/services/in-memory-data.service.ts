import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { FormTemplate, Submission } from '../models/form.models';

@Injectable({ providedIn: 'root' })
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const templates: FormTemplate[] = [
      {
        id: 't-1',
        name: 'Sample Template',
        fields: [
          { id: 'f-1', type: 'text', label: 'Name', validation: { required: true } },
          { id: 'f-2', type: 'date', label: 'DOB' }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    const submissions: Submission[] = [];
    return { templates, submissions };
  }
}
