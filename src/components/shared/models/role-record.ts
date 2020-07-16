import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('RoleRecord')
export class RoleRecord {
  @JsonProperty('caption', String)
  caption?: String = undefined;

  @JsonProperty('id', Number)
  id?: number = undefined;
}
