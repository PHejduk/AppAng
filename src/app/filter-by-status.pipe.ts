import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './model/Task';
import { TaskStatus } from './task-status.enum';

@Pipe({ name: 'filterByStatus' })
export class FilterByStatusPipe implements PipeTransform {
  transform(tasks: Task[], status: TaskStatus): Task[] {
    return tasks.filter(task => task.status === status);
  }
}
