import { MemesRoutingModule } from './memes-routing.module';

describe('MemesRoutingModule', () => {
  let memesRoutingModule: MemesRoutingModule;

  beforeEach(() => {
    memesRoutingModule = new MemesRoutingModule();
  });

  it('should create an instance', () => {
    expect(memesRoutingModule).toBeTruthy();
  });
});
