import { AuthRoutingModule } from './auth-routing.module';

describe('AuthenticationRoutingModule', () => {
  let authenticationRoutingModule: AuthRoutingModule;

  beforeEach(() => {
    authenticationRoutingModule = new AuthRoutingModule();
  });

  it('should create an instance', () => {
    expect(authenticationRoutingModule).toBeTruthy();
  });
});
