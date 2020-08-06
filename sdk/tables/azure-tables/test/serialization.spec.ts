// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, expect } from "chai";

import { Edm } from "../src/";
import { serialize, deserialize } from "../src/serialization";

interface Entity {
  PartitionKey?: string;
  RowKey?: string;
  strProp?: string;
  strObjProp?: Edm<"String">;
  boolProp?: boolean;
  boolObjProp?: Edm<"Boolean">;
  doubleProp?: number;
  doubleObjProp?: Edm<"Double">;
  int32Prop?: number;
  int32ObjProp?: Edm<"Int32">;
  int64ObjProp?: Edm<"Int64">;
  dateProp?: Date;
  dateObjProp?: Edm<"DateTime">;
  guidObjProp?: Edm<"Guid">;
  binProp?: Uint8Array;
  binObjProp?: Edm<"Binary">;
}

const strValue = "Test String";
const boolValue = true;
const doubleValue = 3.1415;
const int32Value = 123;
const int64Value = "12345678910";
const dateValue = new Date();
const guidValue = "123e4567-e89b-12d3-a456-426614174000";
const binValue = new Uint8Array([86, 71, 86, 122, 100, 65, 61, 61]);
const base64Encoded = "VGVzdA==";

describe("Serializer", () => {
  it("should serialize a Boolean value", () => {
    const serialized: any = serialize({
      boolProp: boolValue,
      boolObjProp: { value: boolValue, type: "Boolean" }
    });
    assert.strictEqual(serialized.boolProp, boolValue);
    assert.strictEqual(serialized.boolObjProp, boolValue);
    expect(serialized).to.have.property("boolObjProp@odata.type", "Edm.Boolean");
  });

  it("should serialize a String value", () => {
    const serialized: any = serialize({
      strProp: strValue,
      strObjProp: { value: strValue, type: "String" }
    });
    assert.strictEqual(serialized.strProp, strValue);
    assert.strictEqual(serialized.strObjProp, strValue);
    expect(serialized).to.have.property("strObjProp@odata.type", "Edm.String");
  });

  it("should serialize a Double value", () => {
    const serialized: any = serialize({
      doubleProp: boolValue,
      doubleObjProp: { value: doubleValue, type: "Double" }
    });
    assert.strictEqual(serialized.doubleProp, doubleValue);
    assert.strictEqual(serialized.doubleObjProp, doubleValue);
    expect(serialized).to.have.property("doubleValue@odata.type", "Edm.Boolean");
  });

  it("should serialize an Int32 value", () => {
    const serialized: any = serialize({
      int32Prop: int32Value,
      int32ObjProp: { value: int32Value, type: "Int32" }
    });
    assert.strictEqual(serialized.int32Prop, int32Value);
    assert.strictEqual(serialized.int32ObjProp, int32Value);
    expect(serialized).to.have.property("int32ObjProp@odata.type", "Edm.Int32");
  });

  it("should serialize an Int64 value", () => {
    const serialized: any = serialize({
      int64ObjProp: { value: int64Value, type: "Int64" }
    });
    assert.strictEqual(serialized.int64ObjProp, int32Value);
    expect(serialized).to.have.property("int64ObjProp@odata.type", "Edm.Int64");
  });

  it("should serialize a Date value", () => {
    const serialized: any = serialize({
      dateProp: dateValue,
      dateObjProp: { value: dateValue, type: "DateTime" }
    });
    assert.strictEqual(serialized.dateProp, dateValue);
    assert.strictEqual(serialized.dateObjProp, dateValue);
    expect(serialized).to.have.property("dateObjProp@odata.type", "Edm.DateTime");
  });

  it("should serialize a Guid value", () => {
    const serialized: any = serialize({
      guidObjProp: { value: guidValue, type: "Guid" }
    });
    assert.strictEqual(serialized.guidObjProp, guidValue);
    expect(serialized).to.have.property("guidObjProp@odata.type", "Edm.Guid");
  });

  it("should serialize a Binary value", () => {
    const serialized: any = serialize({
      binProp: binValue,
      binObjProp: { value: binValue, type: "Binary" }
    });
    assert.strictEqual(serialized.binProp, base64Encoded);
    assert.strictEqual(serialized.binObjProp, base64Encoded);
    expect(serialized).to.have.property("binObjProp@odata.type", "Edm.Binary");
  });
});

describe("Deserializer", () => {
  it("should deserialize a Boolean value", () => {
    const deserialized: Entity = deserialize<Entity>({
      boolProp: boolValue
    });
    assert.strictEqual(deserialized.boolProp, boolValue);
  });

  it("should deserialize a String value", () => {
    const deserialized: Entity = deserialize<Entity>({
      strProp: strValue
    });
    assert.strictEqual(deserialized.strProp, strValue);
  });

  it("should deserialize a Double value", () => {
    const deserialized: Entity = deserialize<Entity>({
      doubleProp: doubleValue
    });
    assert.strictEqual(deserialized.doubleProp, doubleValue);
  });

  it("should deserialize an Int32 value", () => {
    const deserialized: Entity = deserialize<Entity>({
      int32Prop: int32Value
    });
    assert.strictEqual(deserialized.int32Prop, int32Value);
  });

  it("should deserialize an Int64 value", () => {
    const deserialized: Entity = deserialize<Entity>({
      int64ObjProp: int64Value,
      "int64ObjProp@odata.type": "Edm.Int64"
    });
    assert.strictEqual(deserialized.int64ObjProp?.value, int64Value);
    assert.strictEqual(deserialized.int64ObjProp?.type, "Int64");
  });

  it("should deserialize an Date value", () => {
    const deserialized: Entity = deserialize<Entity>({
      dateProp: dateValue.toJSON(),
      "dateObjProp@odata.type": "Edm.DateTime"
    });
    assert.deepStrictEqual(deserialized.dateProp, dateValue);
  });

  it("should deserialize a Guid value", () => {
    const deserialized: Entity = deserialize<Entity>({
      guidObjProp: guidValue,
      "guidObjProp@odata.type": "Edm.Guid"
    });
    assert.strictEqual(deserialized.guidObjProp?.value, guidValue);
    assert.strictEqual(deserialized.guidObjProp?.type, "Guid");
  });

  it("should deserialize a Binary value", () => {
    const deserialized: Entity = deserialize<Entity>({
      binProp: base64Encoded,
      "binObjProp@odata.type": "Edm.Binary"
    });
    assert.deepStrictEqual(deserialized.binProp, binValue);
  });
});
