import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as S from '../state/submissions/submissions.actions';
import { selectSubmissionsByTemplate } from '../state/submissions/submissions.selectors';
import { Observable } from 'rxjs';
import { Submission } from '../models/form.models';

@Component({
  selector: 'app-submissions',
  imports: [CommonModule],
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {
  templateId!: string;
  submissions$!: Observable<Submission[]>;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.templateId = this.route.snapshot.paramMap.get('id')!;
    this.submissions$ = this.store.select(selectSubmissionsByTemplate(this.templateId));
    this.store.dispatch(S.loadSubmissions({ templateId: this.templateId }));
  }
}
