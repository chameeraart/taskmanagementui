import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TaskService } from '../../Services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css'
})


export class TasklistComponent {
  tasks: any[] = [];
  searchTerm: string = '';
  sortBy: string = '';
  sortDirection: number = 1;
  pageSize: number = 5; // Number of items per page
  currentPage: number = 1; // Current page number
  imageUrl: string | ArrayBuffer | null = null;
  // Define task as a FormGroup
  constructor(private fb: FormBuilder, private api: TaskService, private tostr: ToastrService) { }
  imagesrc = "C:\Users\madus\Pictures\\Screenshots\a";
  

  ngOnInit() {
    this.GetTasks();
    this.imageUrl=this.imagesrc;
  }

  GetTasks(){
    this.api.getTaskAll().subscribe(result=>{
      this.tasks = Object.assign([],result);  
    })
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

  onFileSelected(event: any) {

        this.imageUrl = this.imagesrc;

  }




}
