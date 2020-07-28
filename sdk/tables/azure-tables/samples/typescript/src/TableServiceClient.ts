// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableServiceClient, EdmInt64, EdmGuid, odata } from "../../../";

import * as dotenv from "dotenv";
dotenv.config();

const account = process.env.ACCOUNT_NAME || "";
const accountSas = process.env.ACCOUNT_SAS || "";
const accountUrl = `https://${account}.table.core.windows.net${accountSas}`;

interface MyEntity {
  PartitionKey: string;
  RowKey: string;
  strProp: string;
  boolProp: boolean;
  doubleProp: number;
  int32Prop: number;
  int64Prop: EdmInt64;
  dateProp: Date;
  guidProp: EdmGuid;
  binProp: Uint8Array;
}

// ================== Table Operations ================== //

async function createTable() {
  const serviceClient = new TableServiceClient(accountUrl);
  await serviceClient.createTable("NewTable1");
}

async function deleteTable() {
  const serviceClient = new TableServiceClient(accountUrl);
  await serviceClient.deleteTable("NewTable1");
}

async function createTableError() {
  const serviceClient = new TableServiceClient(accountUrl);
  await serviceClient.createTable("Samples");
}

async function deleteTableError() {
  const serviceClient = new TableServiceClient(accountUrl);
  await serviceClient.deleteTable("DoesntExist");
}

async function listTables() {
  const serviceClient = new TableServiceClient(accountUrl);

  const queryName = "Samples";
  const tables = await serviceClient.listTables({
    //filter: odata`TableName eq ${queryName}`
  });

  console.log(tables.value);
}

// ================== Entity Operations ================== //

async function createEntity() {
  const serviceClient = new TableServiceClient(accountUrl);

  const newEntity: MyEntity = {
    PartitionKey: "Part2",
    RowKey: "Row1",
    strProp: "String Value",
    boolProp: true,
    doubleProp: 3.1415,
    int32Prop: 123456,
    int64Prop: new EdmInt64("12345678910"),
    dateProp: new Date(),
    guidProp: new EdmGuid("123e4567-e89b-12d3-a456-426614174000"),
    binProp: Buffer.from([84, 101, 115, 116])
  };

  await serviceClient.createEntity("Samples", newEntity);
}

async function deleteEntity() {
  const serviceClient = new TableServiceClient(accountUrl);
  await serviceClient.deleteEntity("Samples", "Part1", "Row4", "*");
}

async function updateEntity() {
  const serviceClient = new TableServiceClient(accountUrl);

  const queryName = "Mahdi";
  // const entities = await serviceClient.updateEntity("Samples");

  //console.log(entities);
}

async function getEntity() {
  const serviceClient = new TableServiceClient(accountUrl);
  const entity = await serviceClient.getEntity<MyEntity>("Samples", "Part2", "Row1");

  console.log(entity.value);
}

async function listEntities() {
  const serviceClient = new TableServiceClient(accountUrl);

  const queryString = "String Value";
  const entities = await serviceClient.listEntities<MyEntity>("Samples", {
    select: ["strProp", "int64Prop", "guidProp", "binProp"],
    filter: odata`strProp eq ${queryString}`
  });

  console.log(entities.value);
}

async function main() {
  // const ents = await tableServiceClient.listEntities<Data>(
  //   "Samples",
  //   {
  //     filter: "RowKey eq 'Row5'"
  //   },
  //   {
  //     requestOptions: {
  //       customHeaders: { accept: "application/json" }
  //     }
  //   }
  // );

  // console.log(ents);

  // let name = "Mahdi";

  // let res = await tableServiceClient.listEntities<Person>(
  //   "Samples",
  //   {
  //     select: ["name", "Age"],
  //     filter: odata`name eq ${name}`
  //   },
  //   {
  //     requestOptions: {
  //       customHeaders: { accept: "application/json" }
  //     }
  //   }
  // );

  // console.log(res.value);

  await listTables();
  await createTable();
  await deleteTable();
  // await createEntity();
  await getEntity();
  await listEntities();
}

main().catch((err) => {
  console.error("Error running sample: ", err.message);
});
