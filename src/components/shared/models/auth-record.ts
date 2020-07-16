import { JsonObject, JsonProperty } from 'json2typescript';

import { RoleRecord } from './role-record';

@JsonObject('AuthRecord')
export class AuthRecord {
  @JsonProperty('roles', [RoleRecord])
  roles?: RoleRecord[] = [];

  @JsonProperty('user_session_id', String)
  userSessionId?: string = undefined;

  @JsonProperty('name', String)
  name?: string = undefined;
}
