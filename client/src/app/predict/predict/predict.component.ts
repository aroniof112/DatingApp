import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InputData } from 'src/app/_models/inputData';
import { OutputData } from 'src/app/_models/outputData';
import { PredictService } from 'src/app/_services/predict.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})
export class PredictComponent implements OnInit{

  inputData: InputData = {
    heartDisease: 'string',
    bmi: 33.65,
    smoking: true,
    alcoholDrinking: 'Yes',
    stroke: true,
    physicalHealth: 0,
    mentalHealth: 0,
    diffWalking: true,
    sex: 'Male',
    ageCategory: 65,
    race: 'White',
    diabetic: 'Yes',
    physicalActivity: false,
    genHealth: 'Good',
    sleepTime: 4,
    asthma: true,
    kidneyDisease: true
  }

  predictedValue!: OutputData["prediction"];

  constructor (private predictService: PredictService, private router: Router) {}

  ngOnInit(): void {
   
  }

  predictHeart() {
    this.predictService.predictHeart(this.inputData).subscribe((result: OutputData) => {
      this.predictedValue = result.prediction;
      this.showMessage();
    })
  }

  showMessage() {
    if (this.predictedValue === 'Yes') {
      // Get the modal
      var modal = document.getElementById("myModal");
  
      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];
  
      // When the user clicks the button, open the modal 
      modal!.style.display = "block";
  
      span.addEventListener('click', function() {
        modal!.style.display = "none";
      });
  
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal!.style.display = "none";
        }
      }
    } else {
      var modal2 = document.getElementById("myModal2");

      var span = document.getElementsByClassName("close")[1];
  
      modal2!.style.display = "block";
  
      span.addEventListener('click', function() {
        modal2!.style.display = "none";
      });

      window.onclick = function(event) {
        if (event.target == modal2) {
          modal2!.style.display = "none";
        }
      }
    }
  }

  onMakeAppointment(){
    this.router.navigate(['appointments/make-appointment']);
  }
}
