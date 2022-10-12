/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MotusService } from './motus.service';

describe('Service: Motus', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MotusService]
    });
  });

  it('should ...', inject([MotusService], (service: MotusService) => {
    expect(service).toBeTruthy();
  }));
});
