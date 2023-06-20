import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { getUsers, createUsers, deleteUsers, updateUsers } from 'src/app/services/api/user_api';

@Component({
  selector: 'dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.scss']
})
export class DataViewComponent {
  users: any[] = [];
  myForm: FormGroup;
  editingID!: number;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.myForm = formBuilder.group({
      name: '',
      email: '',
      phone: '',
      address: ''
    })
  }

  async ngOnInit() {
    try {
      this.users = await getUsers();
    } catch (error) {
      console.log(error)
    }
  }

  async addUser() {
    console.log('User Added', this.myForm.value)
    try {
      const data = await createUsers(this.myForm.value)
      console.log(data)
      this.users.push(this.myForm.value)
      this.myForm.patchValue({
        name: '',
        email: '',
        phone: '',
        address: ''
      })
    } catch (error) {
      console.log(error)
    }
  }

  async deleteUsers(id: number) {
    console.log('User Deleted', id)
    try {
      const data = await deleteUsers(id)
      this.users = this.users.filter(user => user.id !== id)
    } catch (error) {
      console.log(error)
    }
  }

  editUser(id: number) {
    console.log('Editing User', id)
    const user_info = this.users.find(user => user.id == id)
    this.myForm.patchValue(user_info)
    this.editingID = id
    console.log(user_info)
  }

  async updateUser() {
    if (this.editingID !== 0) {
      console.log('User Updated', this.editingID)
      const data = await updateUsers(this.editingID, this.myForm.value)
      const updatedUserIndex = this.users.findIndex(user => user.id === this.editingID);
        if (updatedUserIndex !== -1) {
          this.users[updatedUserIndex] = { ...this.users[updatedUserIndex], ...this.myForm.value };
        }
      this.myForm.patchValue({
        name: '',
        email: '',
        phone: '',
        address: ''
      })
      this.editingID = 0
    } else {
      console.log('No Selected User')
    }
  }
}
