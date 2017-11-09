"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var utils_1 = require("./utils");
var globToRegExp = require("glob-to-regexp");
var compiler_factory_1 = require("./compiler.factory");
var ExtendedTranslationCollection_1 = require("./ExtendedTranslationCollection ");
var fs = require("fs");
var path = require("path");
var NgxTranslateMerger = /** @class */ (function () {
    function NgxTranslateMerger(options) {
        if (options === void 0) { options = {}; }
        // merge with default options
        this._options = _.defaults(options, {
            input: ['./src'],
            patterns: ["**/i18n/*.[lang].po", "**/i18n/*.[lang].json"],
            output: ['src/assets/i18n/[lang].[ext]'],
            format: 'json'
        });
    }
    NgxTranslateMerger.prototype.execute = function () {
        var _this = this;
        var o = this._options;
        var translationFiles = this._findTranslationFiles();
        var languagesMap = this._findLanguages(translationFiles);
        this.translations = this._extractTranslationCollections(languagesMap);
        var _loop_1 = function (lang) {
            o.output.forEach(function (ot) {
                utils_1.save(_this.translations[lang], lang, o.format, ot);
            });
        };
        for (var _i = 0, _a = Object.keys(this.translations); _i < _a.length; _i++) {
            var lang = _a[_i];
            _loop_1(lang);
        }
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
            for (var _b = 0, compilers_1 = compilers; _b < compilers_1.length; _b++) {
                var compiler = compilers_1[_b];
                collections[lang] = merge(paths, compiler, collections[lang]);
            }
        }
        return collections;
    };
    return NgxTranslateMerger;
}());
exports.NgxTranslateMerger = NgxTranslateMerger;
function merge(paths, compiler, collection) {
    if (collection === void 0) { collection = new ExtendedTranslationCollection_1.ExtendedTranslationCollection(); }
    return paths
        .filter(function (p) { return path.extname(p) === "." + compiler.extension; })
        .filter(function (p) { return fs.existsSync(p); })
        .map(function (p) { return fs.readFileSync(p, 'utf-8'); })
        .map(function (content) {
        return compiler.parse.bind(compiler)(content);
    })
        .reduce(function (acc, c) {
        return acc.union(c);
    }, collection);
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9OZ3hUcmFuc2xhdGVNZXJnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQkFBNEI7QUFDNUIsaUNBQXdDO0FBQ3hDLDZDQUE4QztBQUM5Qyx1REFBcUQ7QUFDckQsa0ZBQWlGO0FBRWpGLHVCQUF5QjtBQUN6QiwyQkFBNkI7QUFFN0I7SUFJRSw0QkFBWSxPQUE4QztRQUE5Qyx3QkFBQSxFQUFBLFlBQThDO1FBRXhELDZCQUE2QjtRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ2xDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNoQixRQUFRLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSx1QkFBdUIsQ0FBQztZQUMxRCxNQUFNLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztZQUN4QyxNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxvQ0FBTyxHQUFQO1FBQUEsaUJBV0M7UUFWQyxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBZSxDQUFDO1FBQy9CLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDdEQsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFlBQVksQ0FBQyxDQUFDO2dDQUMzRCxJQUFJO1lBQ2IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFO2dCQUNqQixZQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFKRCxHQUFHLENBQUMsQ0FBZSxVQUE4QixFQUE5QixL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QUNoRCxDQUFDLENBQUM7U0FDRCxNQUFNLENBQUMsVUFBQyxHQUFrQyxFQUFFLENBQWdDO1FBQzNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RCLENBQUMsRUFBRSxVQUFVLENBQWtDLENBQUM7QUFDcEQsQ0FBQyIsImZpbGUiOiJOZ3hUcmFuc2xhdGVNZXJnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyByZWFkRGlyLCBzYXZlIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgKiBhcyBnbG9iVG9SZWdFeHAgZnJvbSAnZ2xvYi10by1yZWdleHAnXG5pbXBvcnQgeyBDb21waWxlckZhY3RvcnkgfSBmcm9tICcuL2NvbXBpbGVyLmZhY3RvcnknO1xuaW1wb3J0IHsgRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24gfSBmcm9tICcuL0V4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uICc7XG5pbXBvcnQgeyBDb21waWxlckludGVyZmFjZSB9IGZyb20gJy4vYmllc2JqZXJnLW5neC10cmFuc2xhdGUtZXh0cmFjdCc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgY2xhc3MgTmd4VHJhbnNsYXRlTWVyZ2VyIHtcbiAgcHVibGljIHRyYW5zbGF0aW9uczogeyBbcDogc3RyaW5nXTogRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24gfTtcbiAgcHJpdmF0ZSBfb3B0aW9uczogTmd4VHJhbnNsYXRlTWVyZ2VyLk1lcmdlck9wdGlvbnM7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogTmd4VHJhbnNsYXRlTWVyZ2VyLk1lcmdlck9wdGlvbnMgPSB7fSkge1xuXG4gICAgLy8gbWVyZ2Ugd2l0aCBkZWZhdWx0IG9wdGlvbnNcbiAgICB0aGlzLl9vcHRpb25zID0gXy5kZWZhdWx0cyhvcHRpb25zLCB7XG4gICAgICBpbnB1dDogWycuL3NyYyddLFxuICAgICAgcGF0dGVybnM6IFtgKiovaTE4bi8qLltsYW5nXS5wb2AsIGAqKi9pMThuLyouW2xhbmddLmpzb25gXSxcbiAgICAgIG91dHB1dDogWydzcmMvYXNzZXRzL2kxOG4vW2xhbmddLltleHRdJ10sXG4gICAgICBmb3JtYXQ6ICdqc29uJ1xuICAgIH0pO1xuICB9XG5cbiAgZXhlY3V0ZSgpIHtcbiAgICBjb25zdCBvID0gdGhpcy5fb3B0aW9ucyBhcyBhbnk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25GaWxlcyA9IHRoaXMuX2ZpbmRUcmFuc2xhdGlvbkZpbGVzKCk7XG4gICAgY29uc3QgbGFuZ3VhZ2VzTWFwID0gdGhpcy5fZmluZExhbmd1YWdlcyh0cmFuc2xhdGlvbkZpbGVzKTtcblxuICAgIHRoaXMudHJhbnNsYXRpb25zID0gdGhpcy5fZXh0cmFjdFRyYW5zbGF0aW9uQ29sbGVjdGlvbnMobGFuZ3VhZ2VzTWFwKTtcbiAgICBmb3IgKGNvbnN0IGxhbmcgb2YgT2JqZWN0LmtleXModGhpcy50cmFuc2xhdGlvbnMpKSB7XG4gICAgICBvLm91dHB1dC5mb3JFYWNoKG90ID0+IHtcbiAgICAgICAgc2F2ZSh0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSwgbGFuZywgby5mb3JtYXQsIG90KTtcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZ2V0Rm9ybWF0KCkge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zLmZvcm1hdDtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRMYW5ndWFnZXMoZmlsZXM6IHN0cmluZ1tdKTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmdbXSB9IHtcbiAgICBjb25zdCByZWdleGVzID0gKHRoaXMuX29wdGlvbnMgYXMgYW55KS5wYXR0ZXJuc1xuICAgICAgLm1hcChzID0+IHMucmVwbGFjZSgnW2xhbmddJywgJ19sYW5nXycpKVxuICAgICAgLm1hcChnbG9iVG9SZWdFeHApXG4gICAgICAubWFwKHIgPT4gci5zb3VyY2UpXG4gICAgICAubWFwKHMgPT4gcy5yZXBsYWNlKCdfbGFuZ18nLCAnKC4qKScpKTtcblxuICAgIC8vIGluZmVyIGF2YWlsYWJsZSBsYW5ndWFnZXMgZnJvbSBmb3VuZCB0cmFuc2xhdGlvbiBmaWxlc1xuICAgIHJldHVybiBmaWxlcy5yZWR1Y2UoKHZhbHVlcywgZmlsZW5hbWUpID0+IHtcbiAgICAgIHJlZ2V4ZXNcbiAgICAgICAgLm1hcChyZSA9PiBmaWxlbmFtZS5tYXRjaChyZSkpXG4gICAgICAgIC5maWx0ZXIobWF0Y2ggPT4gISFtYXRjaClcbiAgICAgICAgLmZvckVhY2gobWF0Y2ggPT4ge1xuICAgICAgICAgIGNvbnN0IHBhdGggPSBtYXRjaFswXTtcbiAgICAgICAgICBjb25zdCBsYW5nID0gbWF0Y2hbMV07XG4gICAgICAgICAgaWYgKCF2YWx1ZXNbbGFuZ10pIHtcbiAgICAgICAgICAgIHZhbHVlc1tsYW5nXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZXNbbGFuZ10ucHVzaChwYXRoKTtcbiAgICAgICAgfSk7XG4gICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRUcmFuc2xhdGlvbkZpbGVzKCkge1xuICAgIGNvbnN0IG8gPSB0aGlzLl9vcHRpb25zIGFzIGFueTtcbiAgICBjb25zdCBmaWxlczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCBwYXR0ZXJuID0gby5wYXR0ZXJucy5tYXAocyA9PiBzLnJlcGxhY2UoJ1tsYW5nXScsICcqJykpO1xuXG4gICAgby5pbnB1dC5mb3JFYWNoKGRpciA9PiB7XG4gICAgICByZWFkRGlyKGRpciwgcGF0dGVybilcbiAgICAgICAgLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgZmlsZXMucHVzaChwKTtcbiAgICAgICAgfSlcbiAgICB9KTtcbiAgICByZXR1cm4gZmlsZXM7XG4gIH1cblxuICBwcml2YXRlIF9leHRyYWN0VHJhbnNsYXRpb25Db2xsZWN0aW9ucyh0cmFuc2xhdGlvbkZpbGVzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZ1tdIH0pOiB7IFtrZXk6IHN0cmluZ106IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uIH0ge1xuICAgIGNvbnN0IGNvbXBpbGVycyA9IFtcbiAgICAgIENvbXBpbGVyRmFjdG9yeS5jcmVhdGUoJ3BvdCcsIHt9KSxcbiAgICAgIENvbXBpbGVyRmFjdG9yeS5jcmVhdGUoJ2pzb24nLCB7fSlcbiAgICBdO1xuICAgIGNvbnN0IGNvbGxlY3Rpb25zID0ge307XG4gICAgZm9yIChjb25zdCBsYW5nIG9mIE9iamVjdC5rZXlzKHRyYW5zbGF0aW9uRmlsZXMpKSB7XG4gICAgICBjb25zdCBwYXRocyA9IHRyYW5zbGF0aW9uRmlsZXNbbGFuZ107XG5cbiAgICAgIGZvciAoY29uc3QgY29tcGlsZXIgb2YgY29tcGlsZXJzKSB7XG4gICAgICAgIGNvbGxlY3Rpb25zW2xhbmddID0gbWVyZ2UocGF0aHMsIGNvbXBpbGVyLCBjb2xsZWN0aW9uc1tsYW5nXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxlY3Rpb25zO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1lcmdlKHBhdGhzOiBzdHJpbmdbXSwgY29tcGlsZXI6IENvbXBpbGVySW50ZXJmYWNlLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24gPSBuZXcgRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24oKSk6IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uIHtcbiAgcmV0dXJuIHBhdGhzXG4gICAgLmZpbHRlcihwID0+IHBhdGguZXh0bmFtZShwKSA9PT0gYC4ke2NvbXBpbGVyLmV4dGVuc2lvbn1gKVxuICAgIC5maWx0ZXIocCA9PiBmcy5leGlzdHNTeW5jKHApKVxuICAgIC5tYXAocCA9PiBmcy5yZWFkRmlsZVN5bmMocCwgJ3V0Zi04JykpXG4gICAgLm1hcChjb250ZW50ID0+IHtcbiAgICAgIHJldHVybiBjb21waWxlci5wYXJzZS5iaW5kKGNvbXBpbGVyKShjb250ZW50KTtcbiAgICB9KVxuICAgIC5yZWR1Y2UoKGFjYzogRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24sIGM6IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uKSA9PiB7XG4gICAgICByZXR1cm4gYWNjLnVuaW9uKGMpO1xuICAgIH0sIGNvbGxlY3Rpb24pIGFzIEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIE5neFRyYW5zbGF0ZU1lcmdlciB7XG5cbiAgZXhwb3J0IGludGVyZmFjZSBNZXJnZXJPcHRpb25zIHtcbiAgICBpbnB1dD86IHN0cmluZ1tdO1xuICAgIHBhdHRlcm4/OiBzdHJpbmc7XG4gICAgb3V0cHV0Pzogc3RyaW5nW107XG4gICAgZm9ybWF0PzogJ2pzb24nIHwgJ3BvJztcbiAgfVxufVxuIl19
