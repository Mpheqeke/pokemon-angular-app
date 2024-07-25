import { TestBed } from '@angular/core/testing';

import { PokemonApiConnectorService } from './pokemon-api-connector.service';

describe('PokemonApiConnectorService', () => {
  let service: PokemonApiConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonApiConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
