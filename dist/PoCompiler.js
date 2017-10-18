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
var ExtendedTranslationCollection_1 = require("./ExtendedTranslationCollection ");
var gettext = require("gettext-parser");
var _ = require("lodash");
/**
 * Extends original PoCompiler to add metadata
 */
var PoCompiler = /** @class */ (function (_super) {
    __extends(PoCompiler, _super);
    function PoCompiler(options) {
        return _super.call(this, options) || this;
    }
    PoCompiler.prototype.compile = function (collection) {
        collection.meta = collection.meta || _.noop;
        var data = {
            charset: 'utf-8',
            headers: {
                'mime-version': '1.0',
                'content-type': 'text/plain; charset=utf-8',
                'content-transfer-encoding': '8bit'
            },
            translations: (_a = {},
                _a[this.domain] = Object.keys(collection.values)
                    .reduce(function (translations, key) {
                    var meta = collection.meta[key] || {};
                    translations[key] = {
                        msgid: key,
                        msgstr: collection.get(key),
                        msgctxt: meta.meaning,
                        comments: {
                            reference: meta.location,
                            extracted: meta.description
                        }
                    };
                    return translations;
                }, {}),
                _a)
        };
        return gettext.po.compile(data);
        var _a;
    };
    PoCompiler.prototype.parse = function (contents) {
        var collection = new ExtendedTranslationCollection_1.ExtendedTranslationCollection();
        var domain = this.domain;
        var po = gettext.po.parse(contents, 'utf-8');
        var translations = Object.keys(po.translations)
            .reduce(function (translations, domain) {
            return Object.assign(translations, po.translations[domain]);
        }, {});
        if (!Object.keys(translations).length) {
            return collection;
        }
        var values = {};
        var meta = {};
        Object.keys(translations)
            .filter(function (key) { return key.length > 0; })
            .forEach(function (key) {
            values[key] = translations[key].msgstr.pop();
            meta[key] = {
                location: translations[key].reference,
                meaning: translations[key].msgctxt,
                description: translations[key].extracted
            };
        }, {});
        return new ExtendedTranslationCollection_1.ExtendedTranslationCollection(values, meta);
    };
    return PoCompiler;
}(biesbjerg_ngx_translate_extract_1.PoCompiler));
exports.PoCompiler = PoCompiler;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUc7Z0JBQ1YsUUFBUSxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTO2dCQUNyQyxPQUFPLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU87Z0JBQ2xDLFdBQVcsRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUzthQUN6QyxDQUFDO1FBQ0osQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRVQsTUFBTSxDQUFDLElBQUksNkRBQTZCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFSCxpQkFBQztBQUFELENBbEVBLEFBa0VDLENBbEUrQiw0Q0FBYSxHQWtFNUM7QUFsRVksZ0NBQVUiLCJmaWxlIjoiUG9Db21waWxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvQ29tcGlsZXIgYXMgTmd4UG9Db21waWxlciB9IGZyb20gJy4vYmllc2JqZXJnLW5neC10cmFuc2xhdGUtZXh0cmFjdCc7XG5pbXBvcnQgeyBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB9IGZyb20gJy4vRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24gJztcbmltcG9ydCB7IFRyYW5zbGF0aW9uTWV0YSB9IGZyb20gJy4vVHJhbnNsYXRpb25NZXRhJztcbmltcG9ydCAqIGFzIGdldHRleHQgZnJvbSAnZ2V0dGV4dC1wYXJzZXInO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEV4dGVuZHMgb3JpZ2luYWwgUG9Db21waWxlciB0byBhZGQgbWV0YWRhdGFcbiAqL1xuZXhwb3J0IGNsYXNzIFBvQ29tcGlsZXIgZXh0ZW5kcyBOZ3hQb0NvbXBpbGVyIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gIH1cblxuICBjb21waWxlKGNvbGxlY3Rpb246IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uKTogc3RyaW5nIHtcbiAgICBjb2xsZWN0aW9uLm1ldGEgPSBjb2xsZWN0aW9uLm1ldGEgfHwgXy5ub29wO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGNoYXJzZXQ6ICd1dGYtOCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdtaW1lLXZlcnNpb24nOiAnMS4wJyxcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICd0ZXh0L3BsYWluOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgJ2NvbnRlbnQtdHJhbnNmZXItZW5jb2RpbmcnOiAnOGJpdCdcbiAgICAgIH0sXG4gICAgICB0cmFuc2xhdGlvbnM6IHtcbiAgICAgICAgW3RoaXMuZG9tYWluXTogT2JqZWN0LmtleXMoY29sbGVjdGlvbi52YWx1ZXMpXG4gICAgICAgICAgLnJlZHVjZSgodHJhbnNsYXRpb25zLCBrZXkpID0+IHtcbiAgICAgICAgICBjb25zdCBtZXRhID0gY29sbGVjdGlvbi5tZXRhW2tleV0gfHwge30gYXMgVHJhbnNsYXRpb25NZXRhO1xuICAgICAgICAgIHRyYW5zbGF0aW9uc1trZXldID0ge1xuICAgICAgICAgICAgbXNnaWQ6IGtleSxcbiAgICAgICAgICAgIG1zZ3N0cjogY29sbGVjdGlvbi5nZXQoa2V5KSxcbiAgICAgICAgICAgIG1zZ2N0eHQ6IG1ldGEubWVhbmluZyxcbiAgICAgICAgICAgIGNvbW1lbnRzOiB7XG4gICAgICAgICAgICAgIHJlZmVyZW5jZTogbWV0YS5sb2NhdGlvbixcbiAgICAgICAgICAgICAgZXh0cmFjdGVkOiBtZXRhLmRlc2NyaXB0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gdHJhbnNsYXRpb25zO1xuICAgICAgICB9LCA8YW55PiB7fSlcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGdldHRleHQucG8uY29tcGlsZShkYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZShjb250ZW50czogc3RyaW5nKTogRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24ge1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBuZXcgRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24gKCk7XG4gICAgY29uc3QgZG9tYWluID0gdGhpcy5kb21haW47XG4gICAgY29uc3QgcG8gPSBnZXR0ZXh0LnBvLnBhcnNlKGNvbnRlbnRzLCAndXRmLTgnKTtcblxuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IE9iamVjdC5rZXlzKHBvLnRyYW5zbGF0aW9ucylcbiAgICAgIC5yZWR1Y2UoKHRyYW5zbGF0aW9ucywgZG9tYWluKSA9PiB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRyYW5zbGF0aW9ucywgcG8udHJhbnNsYXRpb25zW2RvbWFpbl0pO1xuICAgICAgfSwge30pO1xuXG4gICAgaWYgKCFPYmplY3Qua2V5cyh0cmFuc2xhdGlvbnMpLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWVzID0ge307XG4gICAgY29uc3QgbWV0YToge1trZXk6IHN0cmluZ106IFRyYW5zbGF0aW9uTWV0YX0gPSB7fTtcbiAgICBPYmplY3Qua2V5cyh0cmFuc2xhdGlvbnMpXG4gICAgICAuZmlsdGVyKGtleSA9PiBrZXkubGVuZ3RoID4gMClcbiAgICAgIC5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgdmFsdWVzW2tleV0gPSB0cmFuc2xhdGlvbnNba2V5XS5tc2dzdHIucG9wKCk7XG4gICAgICAgIG1ldGFba2V5XSA9IHtcbiAgICAgICAgICBsb2NhdGlvbjogdHJhbnNsYXRpb25zW2tleV0ucmVmZXJlbmNlLFxuICAgICAgICAgIG1lYW5pbmc6IHRyYW5zbGF0aW9uc1trZXldLm1zZ2N0eHQsXG4gICAgICAgICAgZGVzY3JpcHRpb246IHRyYW5zbGF0aW9uc1trZXldLmV4dHJhY3RlZFxuICAgICAgICB9O1xuICAgICAgfSwge30pO1xuXG4gICAgcmV0dXJuIG5ldyBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbih2YWx1ZXMsIG1ldGEpO1xuICB9XG5cbn1cbiJdfQ==
