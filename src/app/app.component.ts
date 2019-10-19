import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
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
  actions = [];

  constructor(private api: ApiService, private changeDetectorRef: ChangeDetectorRef) {

    // On Load, bind url
    // this.parseUrl();
    //
    //   this.actions = [
    //     {
    //       type: 'Access',
    //       quote: 'some quote 1',
    //       confidence: 10,
    //       classification: '0'
    //     },
    //     {
    //       type: 'Store',
    //       quote: 'some quote 2',
    //       confidence: 50,
    //       classification: '1'
    //     },
    //     {
    //       type: 'Sell',
    //       quote: 'some quote 3',
    //       confidence: 70,
    //       classification: '1'
    //     },
    //     {
    //       type: 'Disclose',
    //       quote: 'some quote 3',
    //       confidence: 70,
    //       classification: '1'
    //     },
    //     {
    //       type: 'Delete',
    //       quote: 'some quote 3',
    //       confidence: 70,
    //       classification: '0'
    //     }
    //   ]

  }

  ngOnInit(): void {

    this.parseUrl();

    this.analysisSubscription =
      this.api.onAnalysisChanged$
        .subscribe((analysis: any) => {
          this.api.analysisLoading$.emit(false);
          this.analysis = analysis;
          this.policyLink = analysis.privacy_policy_link;
         this.detectChanges();
        });

    this.analysisLoadingSubscription =
      this.api.analysisLoading$
        .subscribe((loading: boolean) => {
          this.analysisLoading = loading;
          this.detectChanges();
        });

    this.detectChanges();
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

      that.api.analysisLoading$.emit(true);
      that.api.fetchAnalysis(url);

    });
  }

  openPolicy(): void {
    window.open(this.policyLink, '_blank');
  }

  detectChanges(): void {
    this.changeDetectorRef.detectChanges();
  }

}
