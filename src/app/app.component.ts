import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from './services/app.service';
import { auditTime, Observable, Subscription } from 'rxjs';
import { SocketDataInterface } from './types/socket-data.interface';
import { ColorDirective } from './directives/color.directive';
import { NgForOf, NgIf } from '@angular/common';
import { WorkerDataInterface } from './types/worker-data.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, ColorDirective, NgForOf, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly appService = inject(AppService);
  private worker = new Worker(new URL('./workers/app.worker', import.meta.url));
  private subscription: Subscription = new Subscription();

  public resultArray: SocketDataInterface[] = [];
  public controlForm = this.formBuilder.group({
    timer: new FormControl(3000, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0)]),
    size: new FormControl(100, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]),
    additionalIds: new FormControl('')
  })

  ngOnInit() {
    const timer = this.controlForm.controls.timer.value;
    const size = this.controlForm.controls.size.value;
    const additionalIds = this.controlForm.controls.additionalIds.value;

    this.worker.onmessage = (({ data })  => {
      // when worker returns last 10 elements from initial array - place them to a table
      this.resultArray = data;
    })

    // subscribe to data, based on default timer and array size values
    this.subscription = this.subscribeSocketData(timer as number, size as number).subscribe((result) => {
      const initData: WorkerDataInterface = {
        initArray: result,
        additionalIds: additionalIds as string,
      };
      // when we get generated array - send it and additionalIds to web worker
      this.worker.postMessage(initData);
    });
    this.controlForm.valueChanges.pipe(auditTime(1000)).subscribe((values) => {
      // when something changed with controlForm values, validate them and send new data based on new values the same way it was before
      if (this.controlForm.valid) {
        this.subscription.unsubscribe(); // should unsubscribe from old observable as we don't need it any more and prevent memory leaks
        this.subscription = this.subscribeSocketData(values.timer as number, values.size as number).subscribe((result) => {
          const initData: WorkerDataInterface = {
            initArray: result,
            additionalIds: values.additionalIds as string,
          };
          this.worker.postMessage(initData);
        });
      }
    })
  }

  private subscribeSocketData(timer: number, size: number): Observable<SocketDataInterface[]> {
    return this.appService.getSocketData(timer, size);
  }
}
