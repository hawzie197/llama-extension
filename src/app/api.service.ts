import {EventEmitter, Injectable} from '@angular/core';
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  onAnalysisChanged$: Subject<any> = new Subject<any>();
  analysisLoading$: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  fetchAnalysis(url): void {
    const getUrl = `https://join-llama.herokuapp.com/api/analyze/?url=${url}`;
    this.http.get(getUrl)
      .subscribe((payload: any) => {
        alert(payload[0].privacy_policy_link);
        this.onAnalysisChanged$.next(payload);
      });
  }
}
