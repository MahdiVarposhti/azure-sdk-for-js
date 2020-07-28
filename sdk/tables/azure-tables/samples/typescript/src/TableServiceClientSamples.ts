// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableServiceClient, TableClient, UpdateMode, Edm, odata } from "@azure/tables";

import * as dotenv from "dotenv";
dotenv.config();

// ================== Authentication ================== //

const connectionString = process.env.ACCOUNT_CONNECTION_STRING || "";

const accountName = process.env.ACCOUNT_NAME || "";
const accountSas = process.env.ACCOUNT_SAS || "";
const accountUrl = `https://${accountName}.table.core.windows.net${accountSas}`;

const serviceClient = new TableServiceClient(accountUrl);
// const serviceClient = TableServiceClient.fromConnectionString(connectionString);
// const serviceClient = new TableServiceClient(accountUrl, new SharedKeyCredential(accountName, accountKey));

const tableClient = TableClient.fromConnectionString(connectionString, "Samples");
// const tableClient = new TableClient(accountUrl, "Samples");

// ================== Table Operations ================== //

async function createTable() {
  await serviceClient.createTable("NewTable1");
}

async function deleteTable() {
  await serviceClient.deleteTable("NewTable1");
}

async function createTableError() {
  try {
    await serviceClient.createTable("Samples");
  } catch (err) {
    console.log(err.message);
    // {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists."}}}
  }
}

async function deleteTableError() {
  try {
    await serviceClient.deleteTable("TableDoesntExist");
  } catch (err) {
    console.log(err.message);
    // {"odata.error":{"code":"ResourceNotFound","message":{"lang":"en-US","value":"The specified resource does not exist.}}}
  }
}

async function listTables() {
  const tables = await serviceClient.listTables({
    top: 10
  });

  console.log(tables.value);
}

// ================== Entity Operations ================== //

interface MyEntity {
  PartitionKey: string;
  RowKey: string;
  strProp?: string;
  boolProp?: boolean;
  doubleProp?: number;
  int32Prop?: number;
  int64Prop?: Edm<"Int64">;
  dateProp?: Date;
  guidProp?: Edm<"Guid">;
  binProp?: Uint8Array;
}

async function createEntity() {
  const newEntity: MyEntity = {
    PartitionKey: "Part2",
    RowKey: "Row1",
    strProp: "String Value",
    boolProp: true,
    doubleProp: 3.1415,
    int32Prop: 123456,
    int64Prop: { value: "12345678910", type: "Int64" },
    dateProp: new Date(),
    guidProp: { value: "123e4567-e89b-12d3-a456-426614174000", type: "Guid" },
    binProp: Buffer.from([84, 101, 115, 116])
  };
  await tableClient.createEntity(newEntity);
}

async function deleteEntity() {
  await serviceClient.deleteEntity("Samples", "Part1", "Row4", "*");
}

async function updateEntity() {
  const newEntity: MyEntity = {
    PartitionKey: "Part2",
    RowKey: "Row1",
    strProp: "Updated String Value",
    dateProp: new Date()
  };

  await tableClient.updateEntity(newEntity, UpdateMode.Merge);
}

async function upsertEntity() {
  const newEntity: MyEntity = {
    PartitionKey: "Part2",
    RowKey: "Row2",
    strProp: "New Value",
    dateProp: new Date()
  };

  await tableClient.upsertEntity(newEntity, UpdateMode.Replace);
}

async function getEntity() {
  const entity = await tableClient.getEntity<MyEntity>("Part2", "Row1");
  console.log(entity.value);
  // {
  //     PartitionKey: "Part2",
  //     RowKey: "Row1",
  //     strProp: "String Value",
  //     boolProp: true,
  //     doubleProp: 3.1415,
  //     int32Prop: 123456,
  //     int64Prop: { value: "12345678910", type: "Int64" },
  //     dateProp: Date("2020-07-29T18:02:28.356Z"),
  //     guidProp: { value: "123e4567-e89b-12d3-a456-426614174000", type: "Guid" },
  //     binProp: Uint8Array([84, 101, 115, 116])
  // }
}

async function listEntities() {
  const queryString = "String Value";
  const entities = await serviceClient.listEntities<MyEntity>("Samples", {
    select: ["strProp", "int64Prop", "guidProp", "binProp"],
    filter: odata`strProp eq ${queryString}`
  });

  for await (const entity of entities.value) {
    console.log(entity);
  }
}

async function main() {
  // Table Operations
  await createTable();
  await deleteTable();
  await createTableError();
  await deleteTableError();
  await listTables();

  // Entity Operations
  await createEntity();
  await deleteEntity();
  await updateEntity();
  await upsertEntity();
  await getEntity();
  await listEntities();
}

main().catch((err) => {
  console.error("Error running sample: ", err.message);
});
