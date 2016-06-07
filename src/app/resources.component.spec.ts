import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { ResourcesAppComponent } from '../app/resources.component';

beforeEachProviders(() => [ResourcesAppComponent]);

describe('App: Resources', () => {
  it('should create the app',
      inject([ResourcesAppComponent], (app: ResourcesAppComponent) => {
    expect(app).toBeTruthy();
  }));

});
