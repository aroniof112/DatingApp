import { Component, OnInit, Output } from '@angular/core';
import { InputData } from 'src/app/_models/inputData';
import { OutputData } from 'src/app/_models/outputData';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-prediction-management',
  templateUrl: './prediction-management.component.html',
  styleUrls: ['./prediction-management.component.css']
})
export class PredictionManagementComponent implements OnInit{

  inputData: InputData = {
    date: '2012-01-01',
    precipitation: 0,
    temp_max: 30,
    temp_min: 25,
    wind: 0,
    weather: ''
  };

  predictedValue!: OutputData["prediction"];

  constructor (private adminService: AdminService) {}

  ngOnInit(): void {
   
  }

  predictWeather() {
    this.adminService.predictWeather(this.inputData).subscribe((result: OutputData) => {
      this.predictedValue = result.prediction;
    })
  }

}
