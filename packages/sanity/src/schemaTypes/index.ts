import { blockSchemaTypes } from "./blocks";
import { documentSchemaTypes } from "./documents";
import { objectSchemaTypes } from "./objects";

export const schemaTypes = [
  ...blockSchemaTypes,
  ...documentSchemaTypes,
  ...objectSchemaTypes,
];
