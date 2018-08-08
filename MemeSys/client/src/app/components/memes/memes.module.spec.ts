import { MemesModule } from './memes.module';

describe('MemesModule', () => {
  let memesModule: MemesModule;

  beforeEach(() => {
    memesModule = new MemesModule();
  });

  it('should create an instance', () => {
    expect(memesModule).toBeTruthy();
  });
});
