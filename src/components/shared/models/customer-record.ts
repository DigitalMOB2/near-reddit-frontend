import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('CustomerRecord')
export class CustomerRecord {
  @JsonProperty('name', String)
  name?: string = undefined;

  @JsonProperty('type', String)
  type?: string = undefined;

  @JsonProperty('id', Number)
  id?: number = undefined;
}
