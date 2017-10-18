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
            output: ['assets/i18n/[lang].[ext]'],
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
            o.output.forEach(function (ot) { return utils_1.save(_this.translations[lang], lang, o.format, ot); });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9OZ3hUcmFuc2xhdGVNZXJnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQkFBNEI7QUFDNUIsaUNBQXdDO0FBQ3hDLDZDQUE4QztBQUM5Qyx1REFBcUQ7QUFDckQsa0ZBQWlGO0FBRWpGLHVCQUF5QjtBQUN6QiwyQkFBNkI7QUFFN0I7SUFJRSw0QkFBWSxPQUE4QztRQUE5Qyx3QkFBQSxFQUFBLFlBQThDO1FBRXhELDZCQUE2QjtRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ2xDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNoQixRQUFRLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSx1QkFBdUIsQ0FBQztZQUMxRCxNQUFNLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztZQUNwQyxNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxvQ0FBTyxHQUFQO1FBQUEsaUJBU0M7UUFSQyxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBZSxDQUFDO1FBQy9CLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDdEQsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFlBQVksQ0FBQyxDQUFDO2dDQUMzRCxJQUFJO1lBQ2IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxZQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBakQsQ0FBaUQsQ0FBQyxDQUFBO1FBQzNFLENBQUM7UUFGRCxHQUFHLENBQUMsQ0FBZSxVQUE4QixFQUE5QixL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QUNoRCxDQUFDLENBQUM7U0FDRCxNQUFNLENBQUMsVUFBQyxHQUFrQyxFQUFFLENBQWdDO1FBQzNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RCLENBQUMsRUFBRSxVQUFVLENBQWtDLENBQUM7QUFDcEQsQ0FBQyIsImZpbGUiOiJOZ3hUcmFuc2xhdGVNZXJnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyByZWFkRGlyLCBzYXZlIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgKiBhcyBnbG9iVG9SZWdFeHAgZnJvbSAnZ2xvYi10by1yZWdleHAnXG5pbXBvcnQgeyBDb21waWxlckZhY3RvcnkgfSBmcm9tICcuL2NvbXBpbGVyLmZhY3RvcnknO1xuaW1wb3J0IHsgRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24gfSBmcm9tICcuL0V4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uICc7XG5pbXBvcnQgeyBDb21waWxlckludGVyZmFjZSB9IGZyb20gJy4vYmllc2JqZXJnLW5neC10cmFuc2xhdGUtZXh0cmFjdCc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgY2xhc3MgTmd4VHJhbnNsYXRlTWVyZ2VyIHtcbiAgcHVibGljIHRyYW5zbGF0aW9uczogeyBbcDogc3RyaW5nXTogRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24gfTtcbiAgcHJpdmF0ZSBfb3B0aW9uczogTmd4VHJhbnNsYXRlTWVyZ2VyLk1lcmdlck9wdGlvbnM7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogTmd4VHJhbnNsYXRlTWVyZ2VyLk1lcmdlck9wdGlvbnMgPSB7fSkge1xuXG4gICAgLy8gbWVyZ2Ugd2l0aCBkZWZhdWx0IG9wdGlvbnNcbiAgICB0aGlzLl9vcHRpb25zID0gXy5kZWZhdWx0cyhvcHRpb25zLCB7XG4gICAgICBpbnB1dDogWycuL3NyYyddLFxuICAgICAgcGF0dGVybnM6IFtgKiovaTE4bi8qLltsYW5nXS5wb2AsIGAqKi9pMThuLyouW2xhbmddLmpzb25gXSxcbiAgICAgIG91dHB1dDogWydhc3NldHMvaTE4bi9bbGFuZ10uW2V4dF0nXSxcbiAgICAgIGZvcm1hdDogJ2pzb24nXG4gICAgfSk7XG4gIH1cblxuICBleGVjdXRlKCkge1xuICAgIGNvbnN0IG8gPSB0aGlzLl9vcHRpb25zIGFzIGFueTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbkZpbGVzID0gdGhpcy5fZmluZFRyYW5zbGF0aW9uRmlsZXMoKTtcbiAgICBjb25zdCBsYW5ndWFnZXNNYXAgPSB0aGlzLl9maW5kTGFuZ3VhZ2VzKHRyYW5zbGF0aW9uRmlsZXMpO1xuXG4gICAgdGhpcy50cmFuc2xhdGlvbnMgPSB0aGlzLl9leHRyYWN0VHJhbnNsYXRpb25Db2xsZWN0aW9ucyhsYW5ndWFnZXNNYXApO1xuICAgIGZvciAoY29uc3QgbGFuZyBvZiBPYmplY3Qua2V5cyh0aGlzLnRyYW5zbGF0aW9ucykpIHtcbiAgICAgIG8ub3V0cHV0LmZvckVhY2gob3QgPT4gc2F2ZSh0aGlzLnRyYW5zbGF0aW9uc1tsYW5nXSwgbGFuZywgby5mb3JtYXQsIG90KSlcbiAgICB9XG4gIH1cblxuICBnZXRGb3JtYXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnMuZm9ybWF0O1xuICB9XG5cbiAgcHJpdmF0ZSBfZmluZExhbmd1YWdlcyhmaWxlczogc3RyaW5nW10pOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZ1tdIH0ge1xuICAgIGNvbnN0IHJlZ2V4ZXMgPSAodGhpcy5fb3B0aW9ucyBhcyBhbnkpLnBhdHRlcm5zXG4gICAgICAubWFwKHMgPT4gcy5yZXBsYWNlKCdbbGFuZ10nLCAnX2xhbmdfJykpXG4gICAgICAubWFwKGdsb2JUb1JlZ0V4cClcbiAgICAgIC5tYXAociA9PiByLnNvdXJjZSlcbiAgICAgIC5tYXAocyA9PiBzLnJlcGxhY2UoJ19sYW5nXycsICcoLiopJykpO1xuXG4gICAgLy8gaW5mZXIgYXZhaWxhYmxlIGxhbmd1YWdlcyBmcm9tIGZvdW5kIHRyYW5zbGF0aW9uIGZpbGVzXG4gICAgcmV0dXJuIGZpbGVzLnJlZHVjZSgodmFsdWVzLCBmaWxlbmFtZSkgPT4ge1xuICAgICAgcmVnZXhlc1xuICAgICAgICAubWFwKHJlID0+IGZpbGVuYW1lLm1hdGNoKHJlKSlcbiAgICAgICAgLmZpbHRlcihtYXRjaCA9PiAhIW1hdGNoKVxuICAgICAgICAuZm9yRWFjaChtYXRjaCA9PiB7XG4gICAgICAgICAgY29uc3QgcGF0aCA9IG1hdGNoWzBdO1xuICAgICAgICAgIGNvbnN0IGxhbmcgPSBtYXRjaFsxXTtcbiAgICAgICAgICBpZiAoIXZhbHVlc1tsYW5nXSkge1xuICAgICAgICAgICAgdmFsdWVzW2xhbmddID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlc1tsYW5nXS5wdXNoKHBhdGgpO1xuICAgICAgICB9KTtcbiAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfSwge30pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmluZFRyYW5zbGF0aW9uRmlsZXMoKSB7XG4gICAgY29uc3QgbyA9IHRoaXMuX29wdGlvbnMgYXMgYW55O1xuICAgIGNvbnN0IGZpbGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHBhdHRlcm4gPSBvLnBhdHRlcm5zLm1hcChzID0+IHMucmVwbGFjZSgnW2xhbmddJywgJyonKSk7XG5cbiAgICBvLmlucHV0LmZvckVhY2goZGlyID0+IHtcbiAgICAgIHJlYWREaXIoZGlyLCBwYXR0ZXJuKVxuICAgICAgICAuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICBmaWxlcy5wdXNoKHApO1xuICAgICAgICB9KVxuICAgIH0pO1xuICAgIHJldHVybiBmaWxlcztcbiAgfVxuXG4gIHByaXZhdGUgX2V4dHJhY3RUcmFuc2xhdGlvbkNvbGxlY3Rpb25zKHRyYW5zbGF0aW9uRmlsZXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfSk6IHsgW2tleTogc3RyaW5nXTogRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24gfSB7XG4gICAgY29uc3QgY29tcGlsZXJzID0gW1xuICAgICAgQ29tcGlsZXJGYWN0b3J5LmNyZWF0ZSgncG90Jywge30pLFxuICAgICAgQ29tcGlsZXJGYWN0b3J5LmNyZWF0ZSgnanNvbicsIHt9KVxuICAgIF07XG4gICAgY29uc3QgY29sbGVjdGlvbnMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGxhbmcgb2YgT2JqZWN0LmtleXModHJhbnNsYXRpb25GaWxlcykpIHtcbiAgICAgIGNvbnN0IHBhdGhzID0gdHJhbnNsYXRpb25GaWxlc1tsYW5nXTtcblxuICAgICAgZm9yIChjb25zdCBjb21waWxlciBvZiBjb21waWxlcnMpIHtcbiAgICAgICAgY29sbGVjdGlvbnNbbGFuZ10gPSBtZXJnZShwYXRocywgY29tcGlsZXIsIGNvbGxlY3Rpb25zW2xhbmddKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGVjdGlvbnM7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWVyZ2UocGF0aHM6IHN0cmluZ1tdLCBjb21waWxlcjogQ29tcGlsZXJJbnRlcmZhY2UsXG4gICAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbiA9IG5ldyBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbigpKTogRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24ge1xuICByZXR1cm4gcGF0aHNcbiAgICAuZmlsdGVyKHAgPT4gcGF0aC5leHRuYW1lKHApID09PSBgLiR7Y29tcGlsZXIuZXh0ZW5zaW9ufWApXG4gICAgLmZpbHRlcihwID0+IGZzLmV4aXN0c1N5bmMocCkpXG4gICAgLm1hcChwID0+IGZzLnJlYWRGaWxlU3luYyhwLCAndXRmLTgnKSlcbiAgICAubWFwKGNvbnRlbnQgPT4ge1xuICAgICAgcmV0dXJuIGNvbXBpbGVyLnBhcnNlLmJpbmQoY29tcGlsZXIpKGNvbnRlbnQpO1xuICAgIH0pXG4gICAgLnJlZHVjZSgoYWNjOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiwgYzogRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24pID0+IHtcbiAgICAgIHJldHVybiBhY2MudW5pb24oYyk7XG4gICAgfSwgY29sbGVjdGlvbikgYXMgRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb247XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgTmd4VHJhbnNsYXRlTWVyZ2VyIHtcblxuICBleHBvcnQgaW50ZXJmYWNlIE1lcmdlck9wdGlvbnMge1xuICAgIGlucHV0Pzogc3RyaW5nW107XG4gICAgcGF0dGVybj86IHN0cmluZztcbiAgICBvdXRwdXQ/OiBzdHJpbmdbXTtcbiAgICBmb3JtYXQ/OiAnanNvbicgfCAncG8nO1xuICB9XG59XG4iXX0=
