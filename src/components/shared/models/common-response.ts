import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('CommonResponse')
export class CommonResponse {
  @JsonProperty('status', String)
  status?: string = undefined;

  @JsonProperty('reason', String)
  reason?: string = undefined;
}
