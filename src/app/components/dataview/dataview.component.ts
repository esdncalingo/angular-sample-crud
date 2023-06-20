import { Component } from '@angular/core';
import { getUsers } from 'src/app/services/api/user_api';

@Component({
  selector: 'dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.scss']
})
export class DataViewComponent {
  users: any[] = [];

  constructor() {}

  async ngOnInit() {
    try {
      this.users = await getUsers();
    } catch (error) {
      console.log(error)
    }
  }
}
