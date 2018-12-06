import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { State } from './state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  state = new State();
  constructor(private dashboardService: DashboardService) {
    const lstate = dashboardService.getState();
        lstate ? (this.state = JSON.parse(lstate)) : dashboardService.setState(JSON.stringify(this.state));
  }
  ngOnInit() {
    this.state.screen_names.forEach(name => this.getTweets(name));
  }

  getTweets(screen): void {
    this.state.isLoadingResults[screen] = true;
      this.dashboardService.getTweets(screen)
    .subscribe(tweets => {
      this.state.tweets[screen] = this.dashboardService.parseTextToTweet(tweets);
      this.state.isLoadingResults[screen] = false;
      this.sortChangeEvent(this.state.filters['sortBy']);
    });
  }

  sortChangeEvent(value): void {
    this.sortTweetsByDate(value);
    this.saveState();
  }
  sortTweetsByDate(order): void {
    this.state.screen_names.forEach(name =>
      this.state.tweets[name].sort((a, b) => (order === 'desc')
      ? this.dashboardService.sortBasedOnDate(b, a) : this.dashboardService.sortBasedOnDate(a, b))
    );
  }
  saveState(): void {
    this.dashboardService.setState(JSON.stringify(this.state));
  }

  isLoadingFinished(): boolean {
    return this.state.screen_names.map(t => this.state.isLoadingResults[t] === true ? true : false).filter(k => k === false).length === 0;
  }
  goToTweet(id): void {
    window.open('https://twitter.com/i/web/status/' + id, '_blank');
  }
}
