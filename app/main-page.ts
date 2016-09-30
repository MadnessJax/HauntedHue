import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { LivingSceneModel } from './models/main-view-model';
// import { FirstEffectModel } from './models/first-effect-model';

import textFieldModule = require("ui/text-field");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
  page.bindingContext = new LivingSceneModel();
}