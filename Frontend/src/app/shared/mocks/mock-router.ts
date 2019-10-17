import { of as observableOf } from 'rxjs';

/**
 * Mock for [[RouterService]]
 */
export class MockRouter {
  public events = observableOf({});
  public routerState = {
    snapshot: {
      url: '',
      root: {
        queryParamMap: null
      }
    }
  };

  // noinspection TypeScriptUnresolvedFunction
  navigate = jasmine.createSpy('navigate');
  navigateByUrl = jasmine.createSpy('navigateByUrl');

  setRoute(route) {
    this.routerState.snapshot.url = route;
  }

  setParams(paramsMap) {
    this.routerState.snapshot.root.queryParamMap = paramsMap;
  }

  createUrlTree(commands, navExtras = {}) {
    return {};
  }
}
