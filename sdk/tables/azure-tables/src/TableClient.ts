// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableServiceClient } from "./TableServiceClient";
import {
  Entity,
  QueryOptions,
  ListEntitiesOptions,
  GetEntityResponse,
  ListEntitiesResponse,
  CreateEntityOptions,
  UpdateEntityOptions,
  MergeEntityOptions,
  SetAccessPolicyOptions
} from "./models";
import {
  TableServiceClientOptions,
  GetEntityOptions,
  CreateEntityResponse,
  DeleteEntityOptions,
  DeleteEntityResponse,
  UpdateEntityResponse,
  MergeEntityResponse,
  GetAccessPolicyOptions,
  GetAccessPolicyResponse,
  SignedIdentifier,
  SetAccessPolicyResponse
} from "./generatedModels";

/**
 * A TableClient represents a Client to the Azure Tables service allowing you
 * to perform operations on a single table.
 */
export class TableClient {
  private client: TableServiceClient;
  /**
   * Name of the table to perform operations on.
   */
  public readonly tableName: string;

  /**
   * Initializes a new instance of the TableClient class.
   * @param url The URL of the service account that is the target of the desired operation.
   * @param tableName The name of the table
   * @param options The parameter options.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  constructor(url: string, tableName: string, options?: TableServiceClientOptions) {
    this.client = new TableServiceClient(url, options);
    this.tableName = tableName;
  }

  /**
   * Returns a single entity in the table.
   * @param partitionKey The partition key of the entity.
   * @param rowKey The row key of the entity.
   * @param options The options parameters.
   */
  public getEntity<T extends object>(
    partitionKey: string,
    rowKey: string,
    options?: GetEntityOptions
  ): Promise<GetEntityResponse<T>> {
    return this.client.getEntity<T>(this.tableName, partitionKey, rowKey, options);
  }

  /**
   * Queries entities in the table.
   * @param query The OData query parameters.
   * @param options The options parameters.
   */
  public listEntities<T extends object>(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    query?: QueryOptions,
    options?: ListEntitiesOptions
  ): Promise<ListEntitiesResponse<T>> {
    return this.client.listEntities<T>(this.tableName, query, options);
  }

  /**
   * Insert entity in the table.
   * @param entity The properties for the table entity.
   * @param options The options parameters.
   */
  public createEntity<T>(
    entity: Entity<T>,
    options?: CreateEntityOptions
  ): Promise<CreateEntityResponse> {
    return this.client.createEntity<T>(this.tableName, entity, options);
  }

  /**
   * Deletes the specified entity in the table.
   * @param partitionKey The partition key of the entity.
   * @param rowKey The row key of the entity.
   * @param ifMatch Match condition for an entity to be deleted. If specified and a matching entity is
   *                not found, an error will be raised. To force an unconditional delete, set to the wildcard character
   *                (*).
   * @param options The options parameters.
   */
  public deleteEntity(
    partitionKey: string,
    rowKey: string,
    ifMatch: string,
    options?: DeleteEntityOptions
  ): Promise<DeleteEntityResponse> {
    return this.client.deleteEntity(this.tableName, partitionKey, rowKey, ifMatch, options);
  }

  /**
   * Update entity in the table.
   * @param entity The properties of the updated entity.
   * @param ifMatch Match condition for an entity to be updated. If specified and a matching entity is not found, an error will be raised. To force an unconditional update, set to the wildcard character (*). If not specified, an insert will be performed when no existing entity is found to update and a replace will be performed if an existing entity is found.
   * @param options The options parameters.
   */
  public updateEntity<T>(
    entity: Entity<T>,
    ifMatch?: string,
    options?: UpdateEntityOptions
  ): Promise<UpdateEntityResponse> {
    return this.client.updateEntity<T>(this.tableName, entity, ifMatch, options);
  }

  /**
   * Merge entity in the table.
   * @param entity The properties of the merged entity
   * @param ifMatch Match condition for an entity to be updated. If specified and a matching entity is not found, an error will be raised. To force an unconditional update, set to the wildcard character (*). If not specified, an insert will be performed when no existing entity is found to update and a merge will be performed if an existing entity is found.
   * @param options The options parameters.
   */
  public mergeEntity<T>(
    entity: Entity<T>,
    ifMatch?: string,
    options?: MergeEntityOptions
  ): Promise<MergeEntityResponse> {
    return this.client.mergeEntity<T>(this.tableName, entity, ifMatch, options);
  }

  /**
   * Retrieves details about any stored access policies specified on the table that may be used with
   * Shared Access Signatures.
   * @param options The options parameters.
   */
  public getAccessPolicy(options?: GetAccessPolicyOptions): Promise<GetAccessPolicyResponse> {
    return this.client.getAccessPolicy(this.tableName, options);
  }

  /**
   * Sets stored access policies for the table that may be used with Shared Access Signatures.
   * @param acl The Access Control List for the table.
   * @param options The options parameters.
   */
  public setAccessPolicy(
    acl?: SignedIdentifier[],
    options?: SetAccessPolicyOptions
  ): Promise<SetAccessPolicyResponse> {
    return this.client.setAccessPolicy(this.tableName, acl, options);
  }
}
