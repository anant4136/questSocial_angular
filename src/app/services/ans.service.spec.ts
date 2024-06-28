import { TestBed } from '@angular/core/testing';

import { AnsService } from './ans.service';

describe('AnsService', () => {
  let service: AnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
