import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';



@NgModule({
  declarations: [ToastComponent],
  imports: [
    CommonModule
  ],
  exports:[ToastComponent],
  providers: [
    ToastComponent
  ]
})
export class SharedModule { }
