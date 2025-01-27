import { Component, OnInit } from '@angular/core';
import { Task } from '../../shared/models/Task';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../home/service/task.service';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  tasks: Task[] = [];
  isLoadingTasks: boolean = true;

  showOnlyCompletedTasks = true;

  ngOnInit(): void {
    this.getTasks(true);
  }

  getTasks(completed: boolean) {
    this.taskService.getTasksByStatus(completed).subscribe({
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

  changeStatus() {
    this.getTasks(this.showOnlyCompletedTasks);
  }

  updateStatus(id: number) {
    this.taskService.getTask(id).subscribe({
      next: (task: Task) => {
        task.completed = !task.completed;
        this.taskService.atualizar(id, task).subscribe({
          next: () => {
            this.getTasks(this.showOnlyCompletedTasks);
          },
          error: (err) => {},
        });
      },
    });
  }

  deleteTask(id: number) {
    this.taskService.remover(id).subscribe({
      next: () => {
        this.getTasks(true);
      },
      error: () => {},
    });
  }
}
