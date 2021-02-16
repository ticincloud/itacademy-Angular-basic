import { TestBed } from '@angular/core/testing';

import { GestApiService } from './gest-api.service';

describe('GestApiService', () => {
  let service: GestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
