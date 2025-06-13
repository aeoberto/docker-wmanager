import { TestBed } from '@angular/core/testing';

import { HTTPClientService } from './http-client.service';

describe('HTTPClientService', () => {
  let service: HTTPClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HTTPClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
