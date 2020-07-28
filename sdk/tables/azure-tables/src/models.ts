// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  QueryOptions as GeneratedQueryOptions,
  TableQueryOptionalParams,
  TableQueryEntitiesOptionalParams,
  TableQueryEntitiesWithPartitionAndRowKeyResponse,
  TableQueryEntitiesResponse,
  TableInsertEntityOptionalParams,
  TableUpdateEntityOptionalParams,
  TableMergeEntityOptionalParams,
  TableSetAccessPolicyOptionalParams,
  TableQueryEntitiesResponse,
  TableQueryEntitiesWithPartitionAndRowKeyResponse
} from "./generated/models";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

export interface TableEntityContinuationToken {
  nextPartitionKey?: string;
  nextRowKey?: string;
}

export interface ListEntitiesResult<T extends object> {
  readonly value: ListEntitiesIterator<T>;
}

export interface ListEntitiesPageResult<T extends object> {
  readonly value: T[];
  continuationToken: TableEntityContinuationToken;
}

export type ListEntitiesIterator<T extends object> = PagedAsyncIterableIterator<
  T,
  ListEntitiesPageResult<T>,
  {}
>;

/**
 * Contains response data for the getEntity operation.
 */
export type ListEntitiesResponse<T extends object> = Omit<TableQueryEntitiesResponse, "value"> & {
  /**
   * List of table entities.
   */
  value?: T[];
};

/**
 * Contains response data for the listEntities operation.
 */
export type GetEntityResponse<
  T extends object
> = TableQueryEntitiesWithPartitionAndRowKeyResponse & {
  /**
   * The table entity object.
   */
  value?: T;
};

/**
 * Contains response data for the getEntity operation.
 */
export type ListEntitiesResponse<T> = Omit<TableQueryEntitiesResponse, "value"> & {
  /**
   * List of table entities.
   */
  value?: T[];
};

/**
 * OData query parameters.
 */
export type GetEntityResponse<T> = TableQueryEntitiesWithPartitionAndRowKeyResponse & {
  /**
   * The table entity object.
   */
  value?: T;
};

/**
 * List tables optional parameters.
 */
export type ListTablesOptions = Omit<TableQueryOptionalParams, "queryOptions">;

/**
 * List entities optional parameters.
 */
export type ListEntitiesOptions = Omit<TableQueryEntitiesOptionalParams, "queryOptions">;

/**
 * Create entity optional parameters.
 */
export type CreateEntityOptions = Omit<TableInsertEntityOptionalParams, "tableEntityProperties">;

/**
 * Update entity optional parameters.
 */
export type UpdateEntityOptions = Omit<
  TableUpdateEntityOptionalParams,
  "tableEntityProperties" | "ifMatch"
>;

/**
 * Merge entity optional parameters.
 */
export type MergeEntityOptions = Omit<
  TableMergeEntityOptionalParams,
  "tableEntityProperties" | "ifMatch"
>;

/**
 * Set table access policy optional parameters.
 */
export type SetAccessPolicyOptions = Omit<TableSetAccessPolicyOptionalParams, "tableAcl">;

/**
 * Set table access policy optional parameters.
 */
export interface QueryOptions extends Omit<GeneratedQueryOptions, "select"> {
  /**
   * Select expression using OData notation. Limits the columns on each record to just those requested.
   */
  select?: string[];
}

/**
 * A set of key-value pairs representing the table entity.
 */
export type Entity<T> = T & {
  /**
   * The PartitionKey property of the entity.
   */
  PartitionKey: string;
  /**
   * The RowKey property of the entity.
   */
  RowKey: string;
};
