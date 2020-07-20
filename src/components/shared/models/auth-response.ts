import { JsonObject, JsonProperty } from 'json2typescript';

import { CommonResponse } from './common-response';
import { AuthRecord } from './auth-record';
import { CustomerRecord } from './customer-record';

@JsonObject('AuthResponse')
export class AuthResponse {
  @JsonProperty('request', CommonResponse)
  request?: CommonResponse = undefined;

  @JsonProperty('customer', CustomerRecord)
  customer?: CustomerRecord = undefined;
}
