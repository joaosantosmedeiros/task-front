import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { first, Observable, retry } from 'rxjs';
import { Task } from '../../../shared/models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl = 'http://localhost:8081/taskback/task';
  private readonly uriListarTasks = this.apiUrl + '';
  private readonly uriRemoverTask = this.apiUrl + '';
  private readonly uriTaskById = this.apiUrl + '';
  private readonly uriEditarTask = this.apiUrl + '';
  private readonly uriInserirTask = this.apiUrl + '';
  private readonly uriTasksCompletas = this.apiUrl + '/completed';
  private readonly uriTasksIncompletas = this.apiUrl + '/incompleted';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.uriListarTasks).pipe(first(), retry(1));
  }

  getTasksByStatus(completed: boolean): Observable<Task[]>{
    if(completed) return this.http.get<Task[]>(this.uriTasksCompletas).pipe(first(), retry(1));

    return this.http.get<Task[]>(this.uriTasksIncompletas).pipe(first(), retry(1));
  }

  remover(id: number): Observable<any> {
    return this.http.delete<any>(this.uriRemoverTask + "/" + id);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(this.uriTaskById + "/" + id)
      .pipe(first(), retry(1));
  }

  atualizar(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(this.uriEditarTask + "/" + id, task);
  }

  salvar(task: Task): Observable<Task> {
    return this.http.post<Task>(this.uriInserirTask, task);
  }
}
