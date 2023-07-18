import { Component, TemplateRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Todos } from 'src/app/models/todos.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {
  modalService = inject(NgbModal);
  formService = inject(FormBuilder);

  todos: Todos[] = [
    {
      task: 'asd',
      done: false,
      date: Date.now(),
    },
    {
      task: 'asd',
      done: false,
      date: Date.now(),
    },
    {
      task: 'asd',
      done: false,
      date: Date.now(),
    },
  ];

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

  todosForm = this.formService.group({
    task: ['', Validators.required],
    done: [false],
    date: [Date.now()],
  });

  get task() {
    return this.todosForm.get('task');
  }

  onSubmit() {}
}
