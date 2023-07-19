import { Component, TemplateRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Todos } from 'src/app/models/todos.model';

const TODOS: Todos[] = [
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

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {
  modalService = inject(NgbModal);
  formService = inject(FormBuilder);

  page = 1;
  pageSize = 4;
  todos: Todos[] = [];
  collectionSize = TODOS.length;

  constructor() {
    this.collectionSize = TODOS.length;
    this.refreshTodos();
  }

  refreshTodos() {
    this.todos = TODOS.map((todo, i) => ({
      id: i + 1,
      ...todo,
    })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

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

  onSubmit() {
    if (this.todosForm.valid) {
      const newTodo: Todos = {
        task: this.todosForm.value.task!,
        done: this.todosForm.value.done || false,
        date: Date.now(),
      };

      TODOS.push(newTodo);
      this.todosForm.reset();

      this.collectionSize = TODOS.length;

      this.refreshTodos();
    }
  }
}
