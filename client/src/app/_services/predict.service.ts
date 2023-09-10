import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InputData } from '../_models/inputData';
import { Observable } from 'rxjs';
import { OutputData } from '../_models/outputData';

@Injectable({
  providedIn: 'root'
})
export class PredictService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  predictHeart(inputData: InputData): Observable<OutputData> {
    return this.http.post<OutputData>(this.baseUrl + 'predict/prediction', inputData);
  }
}
