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
  TableMergeEntityOptionalParams as TableUpsertEntityOptionalParams,
  TableSetAccessPolicyOptionalParams
} from "./generated/models";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

/**
 * Contains the next PartitionKey and RowKey for the continuation of pagable results.
 */
export interface TableEntityContinuationToken {
  /**
   * Hash of the next partition key to be returned in a subsequent query against the table.
   */
  nextPartitionKey?: string;
  /**
   * Hash of the next row key to be returned in a subsequent query against the table.
   */
  nextRowKey?: string;
}

/**
 * A single page in pagable listEntities results.
 */
export interface ListEntitiesPageResult<T extends object> {
  /**
   * The list of table entities in the current page.
   */
  readonly value: T[];
  /**
   * Contains the PartitionKey and RowKey of the next page result.
   */
  continuationToken: TableEntityContinuationToken;
}

/**
 * The iterator for the list of entities in listEntities operation.
 */
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
  readonly value: ListEntitiesIterator<T>;
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
 * Upsert entity optional parameters.
 */
export type UpsertEntityOptions = Omit<
  TableUpsertEntityOptionalParams,
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

/**
 * The different modes for Upsert and Update methods.
 */
export enum UpdateMode {
  /**
   * Updates an entity by updating the entity's properties without replacing the existing entity.
   */
  Merge,
  /**
   * Updates an existing entity by replacing the entire entity.
   */
  Replace
}
