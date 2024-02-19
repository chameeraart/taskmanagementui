import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskService } from '../../Services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  submitted = false;
  loading = false;
  error = '';
  tasks: any[] = [];
  editTasks: any = null;
  searchTerm: string = '';
  sortBy: string = '';
  sortDirection: number = 1;
  pageSize: number = 5; // Number of items per page
  currentPage: number = 1; // Current page number
  // Define task as a FormGroup
  task: FormGroup;

  constructor(private fb: FormBuilder, private api: TaskService, private tostr: ToastrService) { }

  ngOnInit() {
    // Initialize the form group with form controls
    this.initFormgroup();
    this.GetTasks();
  }

  initFormgroup() {
    this.task = this.fb.group({
      Id: [0],
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      DueDate: ['', Validators.required]
    });
  }

  GetTasks() {
    this.loading = true;
    this.api.getsaveTaskAll().subscribe(result => {
      this.tasks = Object.assign([], result);
      this.loading = false;
    });
  }

  LoadData() {
    this.task = this.fb.group({
      Id: [this.editTasks.id],
      Title: [this.editTasks.title],
      Description: [this.editTasks.description],
      DueDate: [this.convertToDate(this.editTasks.dueDate)]
    });
  }

  convertToDate(dateString: string): string {
    // Assuming dateString is in the format "yyyy-MM-ddTHH:mm:ss"
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Convert date to "yyyy-MM-dd" format
  }

  // Save The Task
  submitForm() {
    this.submitted = true;
    // Check if the form is invalid
    if (this.task.invalid) {
      this.tostr.error('Please fill out all fields.');
      return;
    }

    this.loading = true; // Set loading to true before making the API call
    this.api.saveTask(this.task.value).subscribe(
      result => {
        this.tostr.success("Task Details Saved Successfully");
        this.loading = false;
        this.task.reset(); // Reset the form after successful submission
        this.GetTasks();
        this.initFormgroup();
      },
      (error: HttpErrorResponse) => {
        this.tostr.error("An error occurred while saving task details");
        this.loading = false;
        console.error(error);
      }
    );
  }

  // Edit Selected Record
  onEdit(id: number) {
    this.loading = true;
    this.api.getTask(id).subscribe(result => {
      this.editTasks = Object.assign([], result);
      this.LoadData();
      this.loading = false;
    });
  }

  // Delete the Selected Record
  onDelete(id: number) {
    if (confirm('Are You Sure To Delete This Record?')) {
      this.api.deleteask(id).subscribe(
        result => {
          this.tostr.success("Delete Task Successfully");
          this.GetTasks();
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
        }
      );
    }
  }

  // Approve the Selected Record
  onComplete(id: number) {
    if (confirm('Are You Sure To Complete This Record?')) {
      this.api.completetask(id).subscribe(
        result => {
          this.tostr.success("Complete Task Successfully");
          this.GetTasks();
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
        }
      );
    }
  }

  // Reset the form
  clear() {
    this.task.reset(); // Reset the form
  }

  filterTasks() {
    // Filter tasks based on search term and sort
    let filteredTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      task.dueDate.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).sort((a, b) => {
      if (this.sortBy && a[this.sortBy] > b[this.sortBy]) {
        return this.sortDirection;
      } else if (this.sortBy && a[this.sortBy] < b[this.sortBy]) {
        return -this.sortDirection;
      }
      return 0;
    });

    // Pagination logic
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return filteredTasks.slice(startIndex, endIndex);
  }

  // Function to toggle sorting order
  toggleSortOrder() {
    this.sortDirection = -this.sortDirection;
  }

  getTotalPages(): number {
    const totalTasks = this.tasks.length;
    const totalPages = Math.ceil(totalTasks / this.pageSize);
    return totalPages;
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
