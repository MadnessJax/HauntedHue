import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { mainViewModel } from './models/main-view-model';
import { listRender } from "./config";
import { listEvents } from "./config";

// Event handler for Page "pageLoaded" event attached in main-page.xml
export function pageLoaded(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
  page.bindingContext = new mainViewModel(page);
    listRender(args);
}

exports.onTap = listEvents;
