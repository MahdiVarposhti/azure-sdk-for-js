// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GeneratedClient } from "./generated/generatedClient";
import { Service } from "./generated/operations";
import { Table } from "./generated/operations";
import {
  Entity,
  QueryOptions,
  ListTablesOptions,
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
  GetStatisticsOptions,
  GetStatisticsResponse,
  GetPropertiesOptions,
  GetPropertiesResponse,
  SetPropertiesOptions,
  ServiceProperties,
  SetPropertiesResponse,
  CreateTableOptions,
  CreateTableResponse,
  DeleteTableOptions,
  DeleteTableResponse,
  GeneratedQueryOptions,
  ListTablesResponse,
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
import { serialize, deserialize, deserializeObjectsArray } from "./serialization";

/**
 * A TableServiceClient represents a Client to the Azure Tables service allowing you
 * to perform operations on the tables and the entities.
 */
export class TableServiceClient {
  private table: Table;
  private service: Service;

  /**
   * Initializes a new instance of the TableServiceClient class.
   * @param url The URL of the service account that is the target of the desired operation.
   * @param options The parameter options.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  constructor(url: string, options?: TableServiceClientOptions) {
    const client = new GeneratedClient(url, options);
    this.table = client.table;
    this.service = client.service;

    // TODO: Add the required policies and credential pipelines #9909
  }

  /**
   * Retrieves statistics related to replication for the Table service. It is only available on the
   * secondary location endpoint when read-access geo-redundant replication is enabled for the account.
   * @param options The options parameters.
   */
  public getStatistics(options?: GetStatisticsOptions): Promise<GetStatisticsResponse> {
    return this.service.getStatistics(options);
  }

  /**
   * Gets the properties of an account's Table service, including properties for Analytics and CORS
   * (Cross-Origin Resource Sharing) rules.
   * @param options The options parameters.
   */
  public getProperties(options?: GetPropertiesOptions): Promise<GetPropertiesResponse> {
    return this.service.getProperties(options);
  }

  /**
   * Sets properties for an account's Table service endpoint, including properties for Analytics and CORS
   * (Cross-Origin Resource Sharing) rules.
   * @param properties The Table Service properties.
   * @param options The options parameters.
   */
  public setProperties(
    properties: ServiceProperties,
    options?: SetPropertiesOptions
  ): Promise<SetPropertiesResponse> {
    return this.service.setProperties(properties, options);
  }

  /**
   * Creates a new table under the given account.
   * @param tableName The name of the table.
   * @param options The options parameters.
   */
  public createTable(
    tableName: string,
    options?: CreateTableOptions
  ): Promise<CreateTableResponse> {
    return this.table.create({ tableName }, { ...options, responsePreference: "return-content" });
  }

  /**
   * Operation permanently deletes the specified table.
   * @param tableName The name of the table.
   * @param options The options parameters.
   */
  public deleteTable(
    tableName: string,
    options?: DeleteTableOptions
  ): Promise<DeleteTableResponse> {
    return this.table.delete(tableName, options);
  }

  /**
   * Queries tables under the given account.
   * @param query The OData query parameters.
   * @param options The options parameters.
   */
  public listTables(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    query?: QueryOptions,
    options?: ListTablesOptions
  ): Promise<ListTablesResponse> {
    return this.table.query({ queryOptions: this.convertQueryOptions(query), ...options });
  }

  /**
   * Returns a single entity in a table.
   * @param tableName The name of the table.
   * @param partitionKey The partition key of the entity.
   * @param rowKey The row key of the entity.
   * @param options The options parameters.
   */
  public async getEntity<T extends object>(
    tableName: string,
    partitionKey: string,
    rowKey: string,
    options?: GetEntityOptions
  ): Promise<GetEntityResponse<T>> {
    const response = (await this.table.queryEntitiesWithPartitionAndRowKey(
      tableName,
      partitionKey,
      rowKey,
      options
    )) as GetEntityResponse<T>;
    response.value = deserialize<T>(response._response.parsedBody);
    return response;
  }

  /**
   * Queries entities in a table.
   * @param tableName The name of the table.
   * @param query The OData query parameters.
   * @param options The options parameters.
   */
  public async listEntities<T extends object>(
    tableName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    query?: QueryOptions,
    options?: ListEntitiesOptions
  ): Promise<ListEntitiesResponse<T>> {
    const response = (await this.table.queryEntities(tableName, {
      queryOptions: this.convertQueryOptions(query),
      ...options
    })) as ListEntitiesResponse<T>;
    response.value = deserializeObjectsArray<T>(response.value);
    return response;
  }

  /**
   * Insert entity in a table.
   * @param tableName The name of the table.
   * @param entity The properties for the table entity.
   * @param options The options parameters.
   */
  public createEntity<T>(
    tableName: string,
    entity: Entity<T>,
    options?: CreateEntityOptions
  ): Promise<CreateEntityResponse> {
    return this.table.insertEntity(tableName, {
      tableEntityProperties: serialize(entity),
      ...options
    });
  }

  /**
   * Deletes the specified entity in a table.
   * @param tableName The name of the table.
   * @param partitionKey The partition key of the entity.
   * @param rowKey The row key of the entity.
   * @param ifMatch Match condition for an entity to be deleted. If specified and a matching entity is
   *                not found, an error will be raised. To force an unconditional delete, set to the wildcard character
   *                (*).
   * @param options The options parameters.
   */
  public deleteEntity(
    tableName: string,
    partitionKey: string,
    rowKey: string,
    ifMatch: string,
    options?: DeleteEntityOptions
  ): Promise<DeleteEntityResponse> {
    return this.table.deleteEntity(tableName, partitionKey, rowKey, ifMatch, options);
  }

  /**
   * Update entity in a table.
   * @param tableName The name of the table.
   * @param entity The properties of the updated entity.
   * @param ifMatch Match condition for an entity to be updated. If specified and a matching entity is not found, an error will be raised. To force an unconditional update, set to the wildcard character (*). If not specified, an insert will be performed when no existing entity is found to update and a replace will be performed if an existing entity is found.
   * @param options The options parameters.
   */
  public updateEntity<T>(
    tableName: string,
    entity: Entity<T>,
    ifMatch?: string,
    options?: UpdateEntityOptions
  ): Promise<UpdateEntityResponse> {
    return this.table.updateEntity(tableName, entity.PartitionKey, entity.RowKey, {
      tableEntityProperties: serialize(entity),
      ifMatch,
      ...options
    });
  }

  /**
   * Merge entity in a table.
   * @param tableName The name of the table.
   * @param entity The properties for the table entity.
   * @param ifMatch Match condition for an entity to be updated. If specified and a matching entity is not found, an error will be raised. To force an unconditional update, set to the wildcard character (*). If not specified, an insert will be performed when no existing entity is found to update and a merge will be performed if an existing entity is found.
   * @param options The options parameters.
   */
  public mergeEntity<T>(
    tableName: string,
    entity: Entity<T>,
    ifMatch?: string,
    options?: MergeEntityOptions
  ): Promise<MergeEntityResponse> {
    return this.table.mergeEntity(tableName, entity.PartitionKey, entity.RowKey, {
      tableEntityProperties: serialize(entity),
      ifMatch,
      ...options
    });
  }

  /**
   * Retrieves details about any stored access policies specified on the table that may be used with
   * Shared Access Signatures.
   * @param tableName The name of the table.
   * @param options The options parameters.
   */
  public getAccessPolicy(
    tableName: string,
    options?: GetAccessPolicyOptions
  ): Promise<GetAccessPolicyResponse> {
    return this.table.getAccessPolicy(tableName, options);
  }

  /**
   * Sets stored access policies for the table that may be used with Shared Access Signatures.
   * @param tableName The name of the table.
   * @param acl The Access Control List for the table.
   * @param options The options parameters.
   */
  public setAccessPolicy(
    tableName: string,
    acl?: SignedIdentifier[],
    options?: SetAccessPolicyOptions
  ): Promise<SetAccessPolicyResponse> {
    return this.table.setAccessPolicy(tableName, { tableAcl: acl, ...options });
  }

  private convertQueryOptions(query: QueryOptions = {}): GeneratedQueryOptions {
    const mappedQuery: any = { ...query };
    if (mappedQuery.select) {
      mappedQuery.select = mappedQuery.select.join(",");
    }
    return mappedQuery;
  }
}
