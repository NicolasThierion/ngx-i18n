"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var utils_1 = require("./utils");
var globToRegExp = require("glob-to-regexp");
var biesbjerg_ngx_translate_extract_1 = require("./biesbjerg-ngx-translate-extract");
var fs = require("fs");
var path = require("path");
var compiler_factory_1 = require("./compiler.factory");
var NgxTranslateMerger = /** @class */ (function () {
    function NgxTranslateMerger(options) {
        if (options === void 0) { options = {}; }
        // merge with default options
        this._options = _.defaults(options, {
            input: ['./src'],
            patterns: ["**/i18n/*.[lang].po", "**/i18n/*.[lang].json"],
            output: ['assets/i18n/[lang].[ext]'],
            format: 'json'
        });
    }
    NgxTranslateMerger.prototype.execute = function () {
        var o = this._options;
        var translationFiles = this._findTranslationFiles();
        var languagesMap = this._findLanguages(translationFiles);
        this.translations = this._extractTranslationCollections(languagesMap);
        utils_1.save(this.translations, o.format, o.output);
    };
    NgxTranslateMerger.prototype.getFormat = function () {
        return this._options.format;
    };
    NgxTranslateMerger.prototype._findLanguages = function (files) {
        var regexes = this._options.patterns
            .map(function (s) { return s.replace('[lang]', '_lang_'); })
            .map(globToRegExp)
            .map(function (r) { return r.source; })
            .map(function (s) { return s.replace('_lang_', '(.*)'); });
        // infer available languages from found translation files
        return files.reduce(function (values, filename) {
            regexes
                .map(function (re) { return filename.match(re); })
                .filter(function (match) { return !!match; })
                .forEach(function (match) {
                var path = match[0];
                var lang = match[1];
                if (!values[lang]) {
                    values[lang] = [];
                }
                values[lang].push(path);
            });
            return values;
        }, {});
    };
    NgxTranslateMerger.prototype._findTranslationFiles = function () {
        var o = this._options;
        var files = [];
        var pattern = o.patterns.map(function (s) { return s.replace('[lang]', '*'); });
        o.input.forEach(function (dir) {
            utils_1.readDir(dir, pattern)
                .forEach(function (p) {
                files.push(p);
            });
        });
        return files;
    };
    NgxTranslateMerger.prototype._extractTranslationCollections = function (translationFiles) {
        var compilers = [
            compiler_factory_1.CompilerFactory.create('pot', {}),
            compiler_factory_1.CompilerFactory.create('json', {})
        ];
        var collections = {};
        for (var _i = 0, _a = Object.keys(translationFiles); _i < _a.length; _i++) {
            var lang = _a[_i];
            var paths = translationFiles[lang];
            collections[lang] = new biesbjerg_ngx_translate_extract_1.TranslationCollection();
            var _loop_1 = function (compiler) {
                collections[lang] = paths
                    .filter(function (p) { return path.extname(p) === "." + compiler.extension; })
                    .map(function (p) { return fs.readFileSync(p, 'utf-8'); })
                    .map(compiler.parse.bind(compiler))
                    .reduce(function (acc, c) { return acc.union(c); }, collections[lang]);
            };
            for (var _b = 0, compilers_1 = compilers; _b < compilers_1.length; _b++) {
                var compiler = compilers_1[_b];
                _loop_1(compiler);
            }
        }
        return collections;
    };
    return NgxTranslateMerger;
}());
exports.NgxTranslateMerger = NgxTranslateMerger;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9OZ3hUcmFuc2xhdGVNZXJnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQkFBNEI7QUFDNUIsaUNBQXdDO0FBQ3hDLDZDQUE4QztBQUM5QyxxRkFBeUU7QUFDekUsdUJBQXlCO0FBQ3pCLDJCQUE2QjtBQUM3Qix1REFBcUQ7QUFFckQ7SUFJRSw0QkFBWSxPQUE4QztRQUE5Qyx3QkFBQSxFQUFBLFlBQThDO1FBRXhELDZCQUE2QjtRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ2xDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNoQixRQUFRLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSx1QkFBdUIsQ0FBQztZQUMxRCxNQUFNLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztZQUNwQyxNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxvQ0FBTyxHQUFQO1FBQ0UsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQWUsQ0FBQztRQUMvQixJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3RELElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0RSxZQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsc0NBQVMsR0FBVDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUM5QixDQUFDO0lBRU8sMkNBQWMsR0FBdEIsVUFBdUIsS0FBZTtRQUNwQyxJQUFNLE9BQU8sR0FBSSxJQUFJLENBQUMsUUFBZ0Is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O3FCQUN0QixNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQUksUUFBUSxDQUFDLFNBQVcsRUFBNUMsQ0FBNEMsQ0FBQztxQkFDekQsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQTNCLENBQTJCLENBQUM7cUJBQ3JDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDbEMsTUFBTSxDQUFDLFVBQUMsR0FBMEIsRUFBRSxDQUF3QixJQUFLLE9BQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBWixDQUFZLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkcsQ0FBQztZQVBELEdBQUcsQ0FBQyxDQUFtQixVQUFTLEVBQVQsdUJBQVMsRUFBVCx1QkFBUyxFQUFULElBQVM7Z0JBQTNCLElBQU0sUUFBUSxrQkFBQTt3QkFBUixRQUFRO2FBT2xCO1NBQ0Y7UUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFDSCx5QkFBQztBQUFELENBdkZBLEFBdUZDLElBQUE7QUF2RlksZ0RBQWtCIiwiZmlsZSI6Ik5neFRyYW5zbGF0ZU1lcmdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHJlYWREaXIsIHNhdmUgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCAqIGFzIGdsb2JUb1JlZ0V4cCBmcm9tICdnbG9iLXRvLXJlZ2V4cCdcbmltcG9ydCB7IFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB9IGZyb20gJy4vYmllc2JqZXJnLW5neC10cmFuc2xhdGUtZXh0cmFjdCdcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDb21waWxlckZhY3RvcnkgfSBmcm9tICcuL2NvbXBpbGVyLmZhY3RvcnknO1xuXG5leHBvcnQgY2xhc3MgTmd4VHJhbnNsYXRlTWVyZ2VyIHtcbiAgcHVibGljIHRyYW5zbGF0aW9uczogeyBbcDogc3RyaW5nXTogVHJhbnNsYXRpb25Db2xsZWN0aW9uIH07XG4gIHByaXZhdGUgX29wdGlvbnM6IE5neFRyYW5zbGF0ZU1lcmdlci5NZXJnZXJPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE5neFRyYW5zbGF0ZU1lcmdlci5NZXJnZXJPcHRpb25zID0ge30pIHtcblxuICAgIC8vIG1lcmdlIHdpdGggZGVmYXVsdCBvcHRpb25zXG4gICAgdGhpcy5fb3B0aW9ucyA9IF8uZGVmYXVsdHMob3B0aW9ucywge1xuICAgICAgaW5wdXQ6IFsnLi9zcmMnXSxcbiAgICAgIHBhdHRlcm5zOiBbYCoqL2kxOG4vKi5bbGFuZ10ucG9gLCBgKiovaTE4bi8qLltsYW5nXS5qc29uYF0sXG4gICAgICBvdXRwdXQ6IFsnYXNzZXRzL2kxOG4vW2xhbmddLltleHRdJ10sXG4gICAgICBmb3JtYXQ6ICdqc29uJ1xuICAgIH0pO1xuICB9XG5cbiAgZXhlY3V0ZSgpIHtcbiAgICBjb25zdCBvID0gdGhpcy5fb3B0aW9ucyBhcyBhbnk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25GaWxlcyA9IHRoaXMuX2ZpbmRUcmFuc2xhdGlvbkZpbGVzKCk7XG4gICAgY29uc3QgbGFuZ3VhZ2VzTWFwID0gdGhpcy5fZmluZExhbmd1YWdlcyh0cmFuc2xhdGlvbkZpbGVzKTtcblxuICAgIHRoaXMudHJhbnNsYXRpb25zID0gdGhpcy5fZXh0cmFjdFRyYW5zbGF0aW9uQ29sbGVjdGlvbnMobGFuZ3VhZ2VzTWFwKTtcbiAgICBzYXZlKHRoaXMudHJhbnNsYXRpb25zLCBvLmZvcm1hdCwgby5vdXRwdXQpO1xuICB9XG5cbiAgZ2V0Rm9ybWF0KCkge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zLmZvcm1hdDtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRMYW5ndWFnZXMoZmlsZXM6IHN0cmluZ1tdKTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmdbXSB9IHtcbiAgICBjb25zdCByZWdleGVzID0gKHRoaXMuX29wdGlvbnMgYXMgYW55KS5wYXR0ZXJuc1xuICAgICAgLm1hcChzID0+IHMucmVwbGFjZSgnW2xhbmddJywgJ19sYW5nXycpKVxuICAgICAgLm1hcChnbG9iVG9SZWdFeHApXG4gICAgICAubWFwKHIgPT4gci5zb3VyY2UpXG4gICAgICAubWFwKHMgPT4gcy5yZXBsYWNlKCdfbGFuZ18nLCAnKC4qKScpKTtcblxuICAgIC8vIGluZmVyIGF2YWlsYWJsZSBsYW5ndWFnZXMgZnJvbSBmb3VuZCB0cmFuc2xhdGlvbiBmaWxlc1xuICAgIHJldHVybiBmaWxlcy5yZWR1Y2UoKHZhbHVlcywgZmlsZW5hbWUpID0+IHtcbiAgICAgIHJlZ2V4ZXNcbiAgICAgICAgLm1hcChyZSA9PiBmaWxlbmFtZS5tYXRjaChyZSkpXG4gICAgICAgIC5maWx0ZXIobWF0Y2ggPT4gISFtYXRjaClcbiAgICAgICAgLmZvckVhY2gobWF0Y2ggPT4ge1xuICAgICAgICAgIGNvbnN0IHBhdGggPSBtYXRjaFswXTtcbiAgICAgICAgICBjb25zdCBsYW5nID0gbWF0Y2hbMV07XG4gICAgICAgICAgaWYgKCF2YWx1ZXNbbGFuZ10pIHtcbiAgICAgICAgICAgIHZhbHVlc1tsYW5nXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZXNbbGFuZ10ucHVzaChwYXRoKTtcbiAgICAgICAgfSk7XG4gICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRUcmFuc2xhdGlvbkZpbGVzKCkge1xuICAgIGNvbnN0IG8gPSB0aGlzLl9vcHRpb25zIGFzIGFueTtcbiAgICBjb25zdCBmaWxlczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCBwYXR0ZXJuID0gby5wYXR0ZXJucy5tYXAocyA9PiBzLnJlcGxhY2UoJ1tsYW5nXScsICcqJykpO1xuXG4gICAgby5pbnB1dC5mb3JFYWNoKGRpciA9PiB7XG4gICAgICByZWFkRGlyKGRpciwgcGF0dGVybilcbiAgICAgICAgLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgZmlsZXMucHVzaChwKTtcbiAgICAgICAgfSlcbiAgICB9KTtcbiAgICByZXR1cm4gZmlsZXM7XG4gIH1cblxuICBwcml2YXRlIF9leHRyYWN0VHJhbnNsYXRpb25Db2xsZWN0aW9ucyh0cmFuc2xhdGlvbkZpbGVzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZ1tdIH0pOiB7IFtrZXk6IHN0cmluZ106IFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB9IHtcbiAgICBjb25zdCBjb21waWxlcnMgPSBbXG4gICAgICBDb21waWxlckZhY3RvcnkuY3JlYXRlKCdwb3QnLCB7fSksXG4gICAgICBDb21waWxlckZhY3RvcnkuY3JlYXRlKCdqc29uJywge30pXG4gICAgXTtcbiAgICBjb25zdCBjb2xsZWN0aW9ucyA9IHt9O1xuICAgIGZvciAoY29uc3QgbGFuZyBvZiBPYmplY3Qua2V5cyh0cmFuc2xhdGlvbkZpbGVzKSkge1xuICAgICAgY29uc3QgcGF0aHMgPSB0cmFuc2xhdGlvbkZpbGVzW2xhbmddO1xuICAgICAgY29sbGVjdGlvbnNbbGFuZ10gPSBuZXcgVHJhbnNsYXRpb25Db2xsZWN0aW9uKCk7XG4gICAgICBmb3IgKGNvbnN0IGNvbXBpbGVyIG9mIGNvbXBpbGVycykge1xuXG4gICAgICAgIGNvbGxlY3Rpb25zW2xhbmddID0gcGF0aHNcbiAgICAgICAgICAuZmlsdGVyKHAgPT4gcGF0aC5leHRuYW1lKHApID09PSBgLiR7Y29tcGlsZXIuZXh0ZW5zaW9ufWApXG4gICAgICAgICAgLm1hcChwID0+IGZzLnJlYWRGaWxlU3luYyhwLCAndXRmLTgnKSlcbiAgICAgICAgICAubWFwKGNvbXBpbGVyLnBhcnNlLmJpbmQoY29tcGlsZXIpKVxuICAgICAgICAgIC5yZWR1Y2UoKGFjYzogVHJhbnNsYXRpb25Db2xsZWN0aW9uLCBjOiBUcmFuc2xhdGlvbkNvbGxlY3Rpb24pID0+IGFjYy51bmlvbihjKSwgY29sbGVjdGlvbnNbbGFuZ10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb2xsZWN0aW9ucztcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIE5neFRyYW5zbGF0ZU1lcmdlciB7XG5cbiAgZXhwb3J0IGludGVyZmFjZSBNZXJnZXJPcHRpb25zIHtcbiAgICBpbnB1dD86IHN0cmluZ1tdO1xuICAgIHBhdHRlcm4/OiBzdHJpbmc7XG4gICAgb3V0cHV0Pzogc3RyaW5nW107XG4gICAgZm9ybWF0PzogJ2pzb24nIHwgJ3BvJztcbiAgfVxufVxuIl19
