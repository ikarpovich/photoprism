import Config from "common/config";
import MockAdapter from "axios-mock-adapter";
import Api from "common/api";

let chai = require('../../../node_modules/chai/chai');
let assert = chai.assert;

describe("common/config", () => {

    const mock = new MockAdapter(Api);

    it("should get all config values",  () => {
        const storage = window.localStorage;
        const values = {siteTitle: "Foo", name: "testConfig", year: "2300"};

        const config = new Config(storage, values);
        const result = config.getValues();
        assert.equal(result.name, "testConfig");
    });

    it("should set multiple config values",  () => {
        const storage = window.localStorage;
        const values = {siteTitle: "Foo", country: "Germany", city: "Hamburg"};
        const newValues = {siteTitle: "Foo", new: "xxx", city: "Berlin"};
        const config = new Config(storage, values);
        assert.equal(config.values.new, undefined);
        assert.equal(config.values.city, "Hamburg");
        config.setValues();
        assert.equal(config.values.new, undefined);
        assert.equal(config.values.city, "Hamburg");
        config.setValues(newValues);
        const result = config.getValues();
        assert.equal(result.city, "Berlin");
        assert.equal(result.new, "xxx");
        assert.equal(result.country, "Germany");
    });

    it("should store values",  () => {
        const storage = window.localStorage;
        const values = {siteTitle: "Foo", country: "Germany", city: "Hamburg"};
        const config = new Config(storage, values);
        assert.equal(config.storage["config"], undefined);
        config.storeValues();
        const expected = '{"siteTitle":"Foo","country":"Germany","city":"Hamburg"}';
        assert.equal(config.storage["config"], expected);
    });

    it("should set and get single config value",  () => {
        const storage = window.localStorage;
        const values = {};

        const config = new Config(storage, values);
        config.set("city", "Berlin");
        const result = config.get("city");
        assert.equal(result, "Berlin");
    });
});
