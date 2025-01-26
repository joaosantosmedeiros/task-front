import { Component, OnInit } from '@angular/core';
import { TaskService } from './service/task.service';
import { Task } from '../../shared/models/Task';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  constructor(private taskService: TaskService) {}

  tasks: Task[] = [];
  isLoadingTasks: boolean = true;

  submitted = false;

  form!: FormGroup;


  ngOnInit(): void {
    this.createForm();
    this.getTasks();
  }

  createForm(): void {
    this.form = new FormGroup({
      descricao: new FormControl({value: '', disabled: false}, [Validators.required, Validators.maxLength(30)]),
    })
  }

  submit() {
    this.submitted = true;

    if(this.form.invalid) return;

    const { descricao } = this.form.getRawValue();

    const task: Task = {
      description: descricao,
      completed: false,
    }

    this.taskService.salvar(task).subscribe({
      next: (task: Task) => {
        this.getTasks();
      }
    })
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks.sort((a, b) => a.id! - b.id!);
        this.isLoadingTasks = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoadingTasks = false;
      },
    });
  }

  updateStatus(id: number) {
    this.taskService.getTask(id).subscribe({
      next: (task: Task) => {
        task.completed = !task.completed;
        this.taskService.atualizar(id, task).subscribe({
          next: () => {
            this.getTasks();
          },
          error: (err) => {}
        });
      }
    })

  }

  deleteTask(id: number) {
    this.taskService.remover(id).subscribe({
      next: () => {
        this.getTasks();
      },
      error: () => {}
    });
  }

  get descricao() {
    return this.form.get('descricao')!;
  }
}
