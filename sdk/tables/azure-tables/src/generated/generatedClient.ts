/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as operations from "./operations";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import { GeneratedClientContext } from "./generatedClientContext";
import { GeneratedClientOptionalParams } from "./models";

class GeneratedClient extends GeneratedClientContext {
  /**
   * Initializes a new instance of the GeneratedClient class.
   * @param url The URL of the service account or table that is the target of the desired operation.
   * @param options The parameter options
   */
  constructor(url: string, options?: GeneratedClientOptionalParams) {
    super(url, options);
    this.table = new operations.Table(this);
    this.service = new operations.Service(this);
  }

  table: operations.Table;
  service: operations.Service;
}

// Operation Specifications

export {
  GeneratedClient,
  GeneratedClientContext,
  Models as GeneratedModels,
  Mappers as GeneratedMappers
};
export * from "./operations";
