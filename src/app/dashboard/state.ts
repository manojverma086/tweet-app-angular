export class State {
    isLoadingResults: Object;
    tweets: Object;
    filters: Object;
    screen_names: Array<string>;

    constructor() {
        this.screen_names = ['makeSchool', 'newsycombinator', 'ycombinator'];
        this.isLoadingResults = this.screen_names.reduce((obj, screen) => {
            obj[screen] = false; return obj;
        },  {});
        this.tweets = this.screen_names.reduce((obj, screen) => {
            obj[screen] = null; return obj;
        },  {});
        this.filters = { itemspercolumn : 10, sortBy : 'desc' };
    }
}
