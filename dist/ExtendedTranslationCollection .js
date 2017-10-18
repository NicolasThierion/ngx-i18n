"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var biesbjerg_ngx_translate_extract_1 = require("./biesbjerg-ngx-translate-extract");
var ExtendedTranslationCollection = /** @class */ (function (_super) {
    __extends(ExtendedTranslationCollection, _super);
    function ExtendedTranslationCollection(values, meta) {
        if (values === void 0) { values = {}; }
        if (meta === void 0) { meta = {}; }
        var _this = _super.call(this, values) || this;
        _this.meta = meta;
        return _this;
    }
    ExtendedTranslationCollection.of = function (collection) {
        if (biesbjerg_ngx_translate_extract_1.TranslationCollection instanceof ExtendedTranslationCollection) {
            return collection;
        }
        return new ExtendedTranslationCollection(collection.values, {});
    };
    ExtendedTranslationCollection.prototype.add = function (key, val, meta) {
        if (val === void 0) { val = ''; }
        if (meta === void 0) { meta = {}; }
        return new ExtendedTranslationCollection(Object.assign({}, this.values, (_a = {}, _a[key] = val, _a)), Object.assign({}, this.meta, (_b = {}, _b[key] = meta, _b)));
        var _a, _b;
    };
    ExtendedTranslationCollection.prototype.addKeys = function (keys) {
        var values = keys.reduce(function (results, key) {
            results[key] = '';
            return results;
        }, {});
        var meta = keys.reduce(function (results, key) {
            results[key] = '';
            return results;
        }, {});
        return new ExtendedTranslationCollection(values, meta);
    };
    ExtendedTranslationCollection.prototype.remove = function (key) {
        return this.filter(function (k) { return key !== k; });
    };
    ExtendedTranslationCollection.prototype.forEach = function (callback) {
        var _this = this;
        Object.keys(this.values)
            .forEach(function (key) { return callback.call(_this, key, _this.values[key], _this.meta[key]); });
        return this;
    };
    ExtendedTranslationCollection.prototype.filter = function (callback) {
        var _this = this;
        var values = {};
        var metas = {};
        this.forEach(function (key, val, meta) {
            if (callback.call(_this, key, val, meta)) {
                values[key] = val;
                metas[key] = meta;
            }
        });
        return new ExtendedTranslationCollection(values, metas);
    };
    ExtendedTranslationCollection.prototype.union = function (collection) {
        return new ExtendedTranslationCollection(Object.assign({}, this.values, collection.values), Object.assign({}, this.meta, collection.meta || {}));
    };
    ExtendedTranslationCollection.prototype.intersect = function (collection) {
        var values = {};
        var metas = {};
        this.filter(function (key) { return collection.has(key); })
            .forEach(function (key, val, meta) {
            values[key] = val;
            metas[key] = meta;
        });
        return new ExtendedTranslationCollection(values, metas);
    };
    ExtendedTranslationCollection.prototype.has = function (key) {
        return this.values.hasOwnProperty(key);
    };
    ExtendedTranslationCollection.prototype.get = function (key) {
        return this.values[key];
    };
    ExtendedTranslationCollection.prototype.keys = function () {
        return Object.keys(this.values);
    };
    ExtendedTranslationCollection.prototype.count = function () {
        return Object.keys(this.values).length;
    };
    ExtendedTranslationCollection.prototype.isEmpty = function () {
        return Object.keys(this.values).length === 0;
    };
    ExtendedTranslationCollection.prototype.sort = function (compareFn) {
        var _this = this;
        var values = {};
        var meta = {};
        this.keys().sort(compareFn).forEach(function (key) {
            values[key] = _this.get(key);
            meta[key] = _this.meta[key];
        });
        return new ExtendedTranslationCollection(values, meta);
    };
    return ExtendedTranslationCollection;
}(biesbjerg_ngx_translate_extract_1.TranslationCollection));
exports.ExtendedTranslationCollection = ExtendedTranslationCollection;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9FeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUZBQTBFO0FBSzFFO0lBQW1ELGlEQUFxQjtJQUl0RSx1Q0FBbUIsTUFBNEIsRUFBRSxJQUFTO1FBQXZDLHVCQUFBLEVBQUEsV0FBNEI7UUFBRSxxQkFBQSxFQUFBLFNBQVM7UUFBMUQsWUFDRSxrQkFBTSxNQUFNLENBQUMsU0FFZDtRQURDLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOztJQUNuQixDQUFDO0lBRU0sZ0NBQUUsR0FBVCxVQUFVLFVBQWlDO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLHVEQUFxQixZQUFZLDZCQUE2QixDQUFDLENBQUMsQ0FBQztZQUNuRSxNQUFNLENBQUMsVUFBMkMsQ0FBQztRQUNyRCxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksNkJBQTZCLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRU0sMkNBQUcsR0FBVixVQUFXLEdBQVcsRUFBRSxHQUFnQixFQUFFLElBQTBCO1FBQTVDLG9CQUFBLEVBQUEsUUFBZ0I7UUFBRSxxQkFBQSxFQUFBLFNBQTBCO1FBQ2xFLE1BQU0sQ0FBQyxJQUFJLDZCQUE2QixDQUN0QyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxZQUFJLEdBQUMsR0FBRyxJQUFHLEdBQUcsTUFBRyxFQUM5QyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxZQUFJLEdBQUMsR0FBRyxJQUFHLElBQUksTUFBRyxDQUM5QyxDQUFDOztJQUNKLENBQUM7SUFFTSwrQ0FBTyxHQUFkLFVBQWUsSUFBYztRQUMzQixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUMsT0FBTyxFQUFFLEdBQUc7WUFDdEMsT0FBTyxDQUFDLEdBQUcs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NEdDLENBNUdrRCx1REFBcUIsR0E0R3ZFO0FBNUdZLHNFQUE2QiIsImZpbGUiOiJFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2xhdGlvbkNvbGxlY3Rpb24gfSBmcm9tICcuL2JpZXNiamVyZy1uZ3gtdHJhbnNsYXRlLWV4dHJhY3QnO1xuaW1wb3J0IHsgVHJhbnNsYXRpb25NZXRhIH0gZnJvbSAnLi9UcmFuc2xhdGlvbk1ldGEnO1xuaW1wb3J0IHsgVHJhbnNsYXRpb25UeXBlIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QnO1xuXG50eXBlIE1ldGFNYXBUeXBlID0ge1trZXk6IHN0cmluZ106IFRyYW5zbGF0aW9uTWV0YX07XG5leHBvcnQgY2xhc3MgRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24gZXh0ZW5kcyBUcmFuc2xhdGlvbkNvbGxlY3Rpb24ge1xuXG4gIHB1YmxpYyBtZXRhOiBNZXRhTWFwVHlwZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IodmFsdWVzOiBUcmFuc2xhdGlvblR5cGUgPSB7fSwgbWV0YSA9IHt9KSB7XG4gICAgc3VwZXIodmFsdWVzKTtcbiAgICB0aGlzLm1ldGEgPSBtZXRhO1xuICB9XG5cbiAgc3RhdGljIG9mKGNvbGxlY3Rpb246IFRyYW5zbGF0aW9uQ29sbGVjdGlvbik6IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uIHtcbiAgICBpZiAoVHJhbnNsYXRpb25Db2xsZWN0aW9uIGluc3RhbmNlb2YgRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBjb2xsZWN0aW9uIGFzIEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uKGNvbGxlY3Rpb24udmFsdWVzLCB7fSk7XG4gIH1cblxuICBwdWJsaWMgYWRkKGtleTogc3RyaW5nLCB2YWw6IHN0cmluZyA9ICcnLCBtZXRhOiBUcmFuc2xhdGlvbk1ldGEgPSB7fSk6IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uIHtcbiAgICByZXR1cm4gbmV3IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uKFxuICAgICAgT2JqZWN0LmFzc2lnbih7fSwgdGhpcy52YWx1ZXMsIHsgW2tleV06IHZhbCB9KSxcbiAgICAgIE9iamVjdC5hc3NpZ24oe30sIHRoaXMubWV0YSwgeyBba2V5XTogbWV0YSB9KVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgYWRkS2V5cyhrZXlzOiBzdHJpbmdbXSk6IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uIHtcbiAgICBjb25zdCB2YWx1ZXMgPSBrZXlzLnJlZHVjZSgocmVzdWx0cywga2V5KSA9PiB7XG4gICAgICByZXN1bHRzW2tleV0gPSAnJztcbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0sIHt9KTtcblxuICAgIGNvbnN0IG1ldGEgPSBrZXlzLnJlZHVjZSgocmVzdWx0cywga2V5KSA9PiB7XG4gICAgICByZXN1bHRzW2tleV0gPSAnJztcbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0sIHt9KTtcblxuXG4gICAgcmV0dXJuIG5ldyBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbih2YWx1ZXMsIG1ldGEpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZyk6IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIoayA9PiBrZXkgIT09IGspO1xuICB9XG5cbiAgcHVibGljIGZvckVhY2goY2FsbGJhY2s6IChrZXk6IHN0cmluZywgdmFsPzogc3RyaW5nLCBtZXRhPzogVHJhbnNsYXRpb25NZXRhKSA9PiB2b2lkKTogRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24ge1xuICAgIE9iamVjdC5rZXlzKHRoaXMudmFsdWVzKVxuICAgICAgLmZvckVhY2goa2V5ID0+IGNhbGxiYWNrLmNhbGwodGhpcywga2V5LCB0aGlzLnZhbHVlc1trZXldLCB0aGlzLm1ldGFba2V5XSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIGZpbHRlcihjYWxsYmFjazogKGtleTogc3RyaW5nLCB2YWw/OiBzdHJpbmcsIG1ldGE/OiBUcmFuc2xhdGlvbk1ldGEpID0+IGJvb2xlYW4pOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB7XG4gICAgbGV0IHZhbHVlczogVHJhbnNsYXRpb25UeXBlID0ge307XG4gICAgbGV0IG1ldGFzOiBNZXRhTWFwVHlwZSA9IHt9O1xuICAgIHRoaXMuZm9yRWFjaCgoa2V5OiBzdHJpbmcsIHZhbDogc3RyaW5nLCBtZXRhOiBUcmFuc2xhdGlvbk1ldGEpID0+IHtcbiAgICAgIGlmIChjYWxsYmFjay5jYWxsKHRoaXMsIGtleSwgdmFsLCBtZXRhKSkge1xuICAgICAgICB2YWx1ZXNba2V5XSA9IHZhbDtcbiAgICAgICAgbWV0YXNba2V5XSA9IG1ldGE7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbih2YWx1ZXMsIG1ldGFzKTtcbiAgfVxuXG4gIHB1YmxpYyB1bmlvbihjb2xsZWN0aW9uOiBUcmFuc2xhdGlvbkNvbGxlY3Rpb24pOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB7XG4gICAgcmV0dXJuIG5ldyBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbihcbiAgICAgIE9iamVjdC5hc3NpZ24oe30sIHRoaXMudmFsdWVzLCBjb2xsZWN0aW9uLnZhbHVlcyksXG4gICAgICBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm1ldGEsIChjb2xsZWN0aW9uIGFzIGFueSkubWV0YSB8fCB7fSkpO1xuICB9XG5cbiAgcHVibGljIGludGVyc2VjdChjb2xsZWN0aW9uOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbik6IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uIHtcbiAgICBsZXQgdmFsdWVzOiBUcmFuc2xhdGlvblR5cGUgPSB7fTtcbiAgICBsZXQgbWV0YXM6IE1ldGFNYXBUeXBlID0ge307XG4gICAgdGhpcy5maWx0ZXIoa2V5ID0+IGNvbGxlY3Rpb24uaGFzKGtleSkpXG4gICAgICAuZm9yRWFjaCgoa2V5OiBzdHJpbmcsIHZhbDogc3RyaW5nLCBtZXRhOiBUcmFuc2xhdGlvbk1ldGEpID0+IHtcbiAgICAgICAgdmFsdWVzW2tleV0gPSB2YWw7XG4gICAgICAgIG1ldGFzW2tleV0gPSBtZXRhO1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uKHZhbHVlcywgbWV0YXMpO1xuICB9XG5cbiAgcHVibGljIGhhcyhrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnZhbHVlcy5oYXNPd25Qcm9wZXJ0eShrZXkpO1xuICB9XG5cbiAgcHVibGljIGdldChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVzW2tleV07XG4gIH1cblxuICBwdWJsaWMga2V5cygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMudmFsdWVzKTtcbiAgfVxuXG4gIHB1YmxpYyBjb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnZhbHVlcykubGVuZ3RoO1xuICB9XG5cbiAgcHVibGljIGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMudmFsdWVzKS5sZW5ndGggPT09IDA7XG4gIH1cblxuICBwdWJsaWMgc29ydChjb21wYXJlRm4/OiAoYTogc3RyaW5nLCBiOiBzdHJpbmcpID0+IG51bWJlcik6IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uIHtcbiAgICBsZXQgdmFsdWVzOiBUcmFuc2xhdGlvblR5cGUgPSB7fTtcbiAgICBsZXQgbWV0YTogTWV0YU1hcFR5cGUgPSB7fTtcbiAgICB0aGlzLmtleXMoKS5zb3J0KGNvbXBhcmVGbikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICB2YWx1ZXNba2V5XSA9IHRoaXMuZ2V0KGtleSk7XG4gICAgICBtZXRhW2tleV0gPSB0aGlzLm1ldGFba2V5XTtcbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24odmFsdWVzLCBtZXRhKTtcbiAgfVxufVxuIl19
