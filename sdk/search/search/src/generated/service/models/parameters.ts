/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const allowIndexDowntime: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "allowIndexDowntime"
  ],
  mapper: {
    serializedName: "allowIndexDowntime",
    type: {
      name: "Boolean"
    }
  }
};
export const apiVersion: coreHttp.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    required: true,
    serializedName: "api-version",
    type: {
      name: "String"
    }
  }
};
export const clientRequestId: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "requestOptions",
    "clientRequestId"
  ],
  mapper: {
    serializedName: "client-request-id",
    type: {
      name: "Uuid"
    }
  }
};
export const dataSourceName: coreHttp.OperationURLParameter = {
  parameterPath: "dataSourceName",
  mapper: {
    required: true,
    serializedName: "dataSourceName",
    type: {
      name: "String"
    }
  }
};
export const ifMatch: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "accessCondition",
    "ifMatch"
  ],
  mapper: {
    serializedName: "If-Match",
    type: {
      name: "String"
    }
  }
};
export const ifNoneMatch: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "accessCondition",
    "ifNoneMatch"
  ],
  mapper: {
    serializedName: "If-None-Match",
    type: {
      name: "String"
    }
  }
};
export const indexerName: coreHttp.OperationURLParameter = {
  parameterPath: "indexerName",
  mapper: {
    required: true,
    serializedName: "indexerName",
    type: {
      name: "String"
    }
  }
};
export const indexName: coreHttp.OperationURLParameter = {
  parameterPath: "indexName",
  mapper: {
    required: true,
    serializedName: "indexName",
    type: {
      name: "String"
    }
  }
};
export const prefer: coreHttp.OperationParameter = {
  parameterPath: "prefer",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "Prefer",
    defaultValue: 'return=representation',
    type: {
      name: "String"
    }
  }
};
export const searchDnsSuffix: coreHttp.OperationURLParameter = {
  parameterPath: "searchDnsSuffix",
  mapper: {
    required: true,
    serializedName: "searchDnsSuffix",
    defaultValue: 'search.windows.net',
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const searchServiceName: coreHttp.OperationURLParameter = {
  parameterPath: "searchServiceName",
  mapper: {
    required: true,
    serializedName: "searchServiceName",
    defaultValue: '',
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const select: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "select"
  ],
  mapper: {
    serializedName: "$select",
    type: {
      name: "String"
    }
  }
};
export const skillsetName: coreHttp.OperationURLParameter = {
  parameterPath: "skillsetName",
  mapper: {
    required: true,
    serializedName: "skillsetName",
    type: {
      name: "String"
    }
  }
};
export const synonymMapName: coreHttp.OperationURLParameter = {
  parameterPath: "synonymMapName",
  mapper: {
    required: true,
    serializedName: "synonymMapName",
    type: {
      name: "String"
    }
  }
};