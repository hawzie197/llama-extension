import {Component, OnInit} from '@angular/core';
import {ApiService} from "./api.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-llama';
  email = 'mhawes24@gmail.com';
  policyLink = 'https://www.google.com';
  renderNotSignupPageWarning = false;

  analysisLoading = false;

  analysis: any;
  analysisSubscription: Subscription;
  analysisLoadingSubscription: Subscription;

  constructor(private api: ApiService) {

    // On Load, bind url
    // this.parseUrl();

    // this.analysis = {
    //   actions: [
    //     {
    //       type: 'Access',
    //       quote: 'some quote 1',
    //       confidence: 10
    //     },
    //     {
    //       type: 'Store',
    //       quote: 'some quote 2',
    //       confidence: 50
    //     },
    //     {
    //       type: 'Sell',
    //       quote: 'some quote 3',
    //       confidence: 70
    //     },
    //     {
    //       type: 'Disclose',
    //       quote: 'some quote 3',
    //       confidence: 70
    //     },
    //     {
    //       type: 'Delete',
    //       quote: 'some quote 3',
    //       confidence: 70
    //     }
    //   ]
    // }

  }

  ngOnInit(): void {
    this.parseUrl();

    this.analysisSubscription =
      this.api.onAnalysisChanged$
        .subscribe((analysis: any) => {
          this.analysis = analysis;
          this.policyLink = analysis.privacy_policy_link;
          this.api.analysisLoading$.emit(false);
        });

    this.analysisLoadingSubscription =
      this.api.analysisLoading$
        .subscribe((loading: boolean) => {
          this.analysisLoading = loading;
        })
  }

  closePopup(): void {
    window.close();
  }

  parseUrl(): void {
    const that = this;
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      const url = tabs[0].url;

      if (!url) {
        alert('bad url');
        return;
      }

      const keywords = ['signup', 'sign-up', 'register', 'create-account', 'registration'];
      for (let k of keywords) {
        if (url.includes(k)) {
          that.api.analysisLoading$.emit(true);
          that.api.fetchAnalysis(url);
          break;
        }
      }

    });
  }

}
