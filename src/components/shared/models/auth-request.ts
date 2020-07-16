import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('AuthRequest')
export class AuthRequest {
  @JsonProperty('username', String)
  username?: string = undefined;

  @JsonProperty('password', String)
  password?: string = undefined;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
