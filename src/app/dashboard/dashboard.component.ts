import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import {Tweet} from './tweet';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLoadingResults = {'makeSchool': false, 'newsycombinator': false, 'ycombinator': false};
  tweets = {'makeSchool': null, 'newsycombinator': null, 'ycombinator': null};
  count = 30;
  itemspercolumn = 10;
  sortBy = 'desc';
  screen_names  = ['makeSchool', 'newsycombinator', 'ycombinator'];
  // date_range = {from: null, to: null};
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.screen_names.forEach(name => this.getTweets(this.count, name));
  }
  parseTextToTweet(tweets): void {
    tweets.forEach(tweet => {
      let ele = '';
      // replacing hashtag string from hashtag url
      tweet.entities.hashtags.forEach(tag => {
          if ( tweet.text[tweet.text.indexOf(tag.text) - 1] === '#' ) {
            ele = '<a href="https://twitter.com/hashtag/' + tag.text + '?src=hash">#<b>' + tag.text + '</b></a>';
           tweet.text = tweet.text.replace('#' + tag, ele);
          }
      });
      tweet.entities.user_mentions.forEach(user => {
        if ( tweet.text[tweet.text.indexOf(user.screen_name) - 1] === '@' ) {
          ele = '<a href="https://twitter.com/' + user.text + '">@<b>' + user.screen_name + '</b></a>';
          tweet.text = tweet.text.replace('@' + user.screen_name, ele);
        }
      });
      tweet.entities.urls.forEach(url => {
          ele = '<a href="' + url.url + '"><b>' + url.url + '</b></a>';
          tweet.text = tweet.text.replace(url.url, ele);
      });
    });
    console.log(tweets[0]);
    return tweets;
  }
  getTweets(count, screen): void {
    // this.tweets = {'makeSchool': this.parseTextToTweet(new Tweet().value),
    //  'newsycombinator': this.parseTextToTweet(new Tweet().value),
    //   'ycombinator': this.parseTextToTweet(new Tweet().value)};
    this.isLoadingResults[screen] = true;

      this.dashboardService.getTweets(count, screen)
    .subscribe(tweets => {
      this.tweets[screen] = this.parseTextToTweet(tweets);
      this.isLoadingResults[screen] = false;
    });
  }

  sortChangeEvent(value): void {
    this.sortTweetsByDate(value);
  }
  sortTweetsByDate(order): void {
    console.log( order === 'desc');
    this.screen_names.forEach(name =>
      this.tweets[name].sort((a, b) => (order === 'desc') ? this.sortBasedOnDate(b, a) : this.sortBasedOnDate(a, b))
    );
  }

  sortBasedOnDate(a, b): number {
    const date1 = new Date(a.created_at).getTime();
    const date2 = new Date(b.created_at).getTime();
    return date1 > date2 ? 1 : ((date1 === date2) ? 0 : -1);

  }
  isLoadingFinished(): boolean {
    return this.screen_names.map(t => this.isLoadingResults[t] === true ? true : false).filter(k => k === false).length === 0;
  }
  goToTweet(id): void {
    window.open('https://twitter.com/i/web/status/' + id, '_blank');
  }

}
