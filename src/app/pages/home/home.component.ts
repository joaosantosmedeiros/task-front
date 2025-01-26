import { Component, OnInit } from '@angular/core';
import { TaskService } from './service/task.service';
import { Task } from '../../shared/models/Task';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  tasks: Task[] = [];
  isLoadingTasks: boolean = true;

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
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
}
