import { Component, OnInit } from '@angular/core';

interface Task {
  task: string;
  description: string;
  date: Date;
  completed?: boolean;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = {
    task: '',
    description: '',
    date: new Date(),
  };
  searchTerm: string = '';

  constructor() {}

  ngOnInit() {
    // Recupera as tarefas salvas do sessionStorage ao inicializar o componente
    const savedTasks = sessionStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  get filteredTasks(): Task[] {
    if (this.searchTerm.trim() === '') {
      return this.tasks;
    }
    return this.tasks.filter((task) => {
      return (
        task.task.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  submitTask() {
    if (this.newTask.task.trim() === '' || this.newTask.description.trim() === '') {
      return;
    }
    this.newTask.date = new Date();
    this.tasks.push({ ...this.newTask });
    this.newTask.task = '';
    this.newTask.description = '';

    // Salva as tarefas atualizadas no sessionStorage
    sessionStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  editTask(task: Task) {
    const editedTask = prompt('Editar Tarefa', task.task);
    if (editedTask !== null) {
      task.task = editedTask;

      // Salva as tarefas atualizadas no sessionStorage
      sessionStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  deleteTask(task: Task) {
    const confirmDelete = confirm(`Tem certeza que deseja excluir a tarefa "${task.task}"?`);
    if (confirmDelete) {
      const index = this.tasks.indexOf(task);
      if (index !== -1) {
        this.tasks.splice(index, 1);

        // Salva as tarefas atualizadas no sessionStorage
        sessionStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    }
  }

  toggleTaskStatus(task: Task) {
    task.completed = !task.completed;

    // Salva as tarefas atualizadas no sessionStorage
    sessionStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  searchTasks() {
    console.log('Pesquisar tarefas:', this.searchTerm);
  }
}
