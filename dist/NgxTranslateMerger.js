"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var utils_1 = require("./utils");
var globToRegExp = require("glob-to-regexp");
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
        for (var _i = 0, _a = Object.keys(this.translations); _i < _a.length; _i++) {
            var lang = _a[_i];
            utils_1.save(this.translations[lang], lang, o.format, o.output);
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
                collections[lang] = utils_1.merge(paths, compiler);
            }
        }
        return collections;
    };
    return NgxTranslateMerger;
}());
exports.NgxTranslateMerger = NgxTranslateMerger;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9OZ3hUcmFuc2xhdGVNZXJnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQkFBNEI7QUFDNUIsaUNBQStDO0FBQy9DLDZDQUE4QztBQUk5Qyx1REFBcUQ7QUFFckQ7SUFJRSw0QkFBWSxPQUE4QztRQUE5Qyx3QkFBQSxFQUFBLFlBQThDO1FBRXhELDZCQUE2QjtRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ2xDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNoQixRQUFRLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSx1QkFBdUIsQ0FBQztZQUMxRCxNQUFNLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztZQUNwQyxNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxvQ0FBTyxHQUFQO1FBQ0UsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQWUsQ0FBQztRQUMvQixJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3RELElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0RSxHQUFHLENBQUMsQ0FBZSxVQUE4QixFQUE5QixLQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUE5QixjQUE4QixFQUE5QixJQUE4QjtZQUE1QyxJQUFNLElBQUksU0FBQTtZQUNiLFlBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6RDtJQUNILENBQUM7SUFFRCxzQ0FBUyxHQUFUO1FBQ0UsTUFB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SSxDQUFDLENBQUM7WUFFckMsR0FBRyxDQUFDLENBQW1CLFVBQVMsRUFBVCx1QkFBUyxFQUFULHVCQUFTLEVBQVQsSUFBUztnQkFBM0IsSUFBTSxRQUFRLGtCQUFBO2dCQUNqQixXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsYUFBSyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTthQUMzQztTQUNGO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQXBGQSxBQW9GQyxJQUFBO0FBcEZZLGdEQUFrQiIsImZpbGUiOiJOZ3hUcmFuc2xhdGVNZXJnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBtZXJnZSwgcmVhZERpciwgc2F2ZSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0ICogYXMgZ2xvYlRvUmVnRXhwIGZyb20gJ2dsb2ItdG8tcmVnZXhwJ1xuaW1wb3J0IHsgVHJhbnNsYXRpb25Db2xsZWN0aW9uIH0gZnJvbSAnLi9iaWVzYmplcmctbmd4LXRyYW5zbGF0ZS1leHRyYWN0J1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IENvbXBpbGVyRmFjdG9yeSB9IGZyb20gJy4vY29tcGlsZXIuZmFjdG9yeSc7XG5cbmV4cG9ydCBjbGFzcyBOZ3hUcmFuc2xhdGVNZXJnZXIge1xuICBwdWJsaWMgdHJhbnNsYXRpb25zOiB7IFtwOiBzdHJpbmddOiBUcmFuc2xhdGlvbkNvbGxlY3Rpb24gfTtcbiAgcHJpdmF0ZSBfb3B0aW9uczogTmd4VHJhbnNsYXRlTWVyZ2VyLk1lcmdlck9wdGlvbnM7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogTmd4VHJhbnNsYXRlTWVyZ2VyLk1lcmdlck9wdGlvbnMgPSB7fSkge1xuXG4gICAgLy8gbWVyZ2Ugd2l0aCBkZWZhdWx0IG9wdGlvbnNcbiAgICB0aGlzLl9vcHRpb25zID0gXy5kZWZhdWx0cyhvcHRpb25zLCB7XG4gICAgICBpbnB1dDogWycuL3NyYyddLFxuICAgICAgcGF0dGVybnM6IFtgKiovaTE4bi8qLltsYW5nXS5wb2AsIGAqKi9pMThuLyouW2xhbmddLmpzb25gXSxcbiAgICAgIG91dHB1dDogWydhc3NldHMvaTE4bi9bbGFuZ10uW2V4dF0nXSxcbiAgICAgIGZvcm1hdDogJ2pzb24nXG4gICAgfSk7XG4gIH1cblxuICBleGVjdXRlKCkge1xuICAgIGNvbnN0IG8gPSB0aGlzLl9vcHRpb25zIGFzIGFueTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbkZpbGVzID0gdGhpcy5fZmluZFRyYW5zbGF0aW9uRmlsZXMoKTtcbiAgICBjb25zdCBsYW5ndWFnZXNNYXAgPSB0aGlzLl9maW5kTGFuZ3VhZ2VzKHRyYW5zbGF0aW9uRmlsZXMpO1xuXG4gICAgdGhpcy50cmFuc2xhdGlvbnMgPSB0aGlzLl9leHRyYWN0VHJhbnNsYXRpb25Db2xsZWN0aW9ucyhsYW5ndWFnZXNNYXApO1xuICAgIGZvciAoY29uc3QgbGFuZyBvZiBPYmplY3Qua2V5cyh0aGlzLnRyYW5zbGF0aW9ucykpIHtcbiAgICAgIHNhdmUodGhpcy50cmFuc2xhdGlvbnNbbGFuZ10sIGxhbmcsIG8uZm9ybWF0LCBvLm91dHB1dCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Rm9ybWF0KCkge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zLmZvcm1hdDtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRMYW5ndWFnZXMoZmlsZXM6IHN0cmluZ1tdKTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmdbXSB9IHtcbiAgICBjb25zdCByZWdleGVzID0gKHRoaXMuX29wdGlvbnMgYXMgYW55KS5wYXR0ZXJuc1xuICAgICAgLm1hcChzID0+IHMucmVwbGFjZSgnW2xhbmddJywgJ19sYW5nXycpKVxuICAgICAgLm1hcChnbG9iVG9SZWdFeHApXG4gICAgICAubWFwKHIgPT4gci5zb3VyY2UpXG4gICAgICAubWFwKHMgPT4gcy5yZXBsYWNlKCdfbGFuZ18nLCAnKC4qKScpKTtcblxuICAgIC8vIGluZmVyIGF2YWlsYWJsZSBsYW5ndWFnZXMgZnJvbSBmb3VuZCB0cmFuc2xhdGlvbiBmaWxlc1xuICAgIHJldHVybiBmaWxlcy5yZWR1Y2UoKHZhbHVlcywgZmlsZW5hbWUpID0+IHtcbiAgICAgIHJlZ2V4ZXNcbiAgICAgICAgLm1hcChyZSA9PiBmaWxlbmFtZS5tYXRjaChyZSkpXG4gICAgICAgIC5maWx0ZXIobWF0Y2ggPT4gISFtYXRjaClcbiAgICAgICAgLmZvckVhY2gobWF0Y2ggPT4ge1xuICAgICAgICAgIGNvbnN0IHBhdGggPSBtYXRjaFswXTtcbiAgICAgICAgICBjb25zdCBsYW5nID0gbWF0Y2hbMV07XG4gICAgICAgICAgaWYgKCF2YWx1ZXNbbGFuZ10pIHtcbiAgICAgICAgICAgIHZhbHVlc1tsYW5nXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZXNbbGFuZ10ucHVzaChwYXRoKTtcbiAgICAgICAgfSk7XG4gICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRUcmFuc2xhdGlvbkZpbGVzKCkge1xuICAgIGNvbnN0IG8gPSB0aGlzLl9vcHRpb25zIGFzIGFueTtcbiAgICBjb25zdCBmaWxlczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCBwYXR0ZXJuID0gby5wYXR0ZXJucy5tYXAocyA9PiBzLnJlcGxhY2UoJ1tsYW5nXScsICcqJykpO1xuXG4gICAgby5pbnB1dC5mb3JFYWNoKGRpciA9PiB7XG4gICAgICByZWFkRGlyKGRpciwgcGF0dGVybilcbiAgICAgICAgLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgZmlsZXMucHVzaChwKTtcbiAgICAgICAgfSlcbiAgICB9KTtcbiAgICByZXR1cm4gZmlsZXM7XG4gIH1cblxuICBwcml2YXRlIF9leHRyYWN0VHJhbnNsYXRpb25Db2xsZWN0aW9ucyh0cmFuc2xhdGlvbkZpbGVzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZ1tdIH0pOiB7IFtrZXk6IHN0cmluZ106IFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB9IHtcbiAgICBjb25zdCBjb21waWxlcnMgPSBbXG4gICAgICBDb21waWxlckZhY3RvcnkuY3JlYXRlKCdwb3QnLCB7fSksXG4gICAgICBDb21waWxlckZhY3RvcnkuY3JlYXRlKCdqc29uJywge30pXG4gICAgXTtcbiAgICBjb25zdCBjb2xsZWN0aW9ucyA9IHt9O1xuICAgIGZvciAoY29uc3QgbGFuZyBvZiBPYmplY3Qua2V5cyh0cmFuc2xhdGlvbkZpbGVzKSkge1xuICAgICAgY29uc3QgcGF0aHMgPSB0cmFuc2xhdGlvbkZpbGVzW2xhbmddO1xuXG4gICAgICBmb3IgKGNvbnN0IGNvbXBpbGVyIG9mIGNvbXBpbGVycykge1xuICAgICAgICBjb2xsZWN0aW9uc1tsYW5nXSA9IG1lcmdlKHBhdGhzLCBjb21waWxlcilcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGVjdGlvbnM7XG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBOZ3hUcmFuc2xhdGVNZXJnZXIge1xuXG4gIGV4cG9ydCBpbnRlcmZhY2UgTWVyZ2VyT3B0aW9ucyB7XG4gICAgaW5wdXQ/OiBzdHJpbmdbXTtcbiAgICBwYXR0ZXJuPzogc3RyaW5nO1xuICAgIG91dHB1dD86IHN0cmluZ1tdO1xuICAgIGZvcm1hdD86ICdqc29uJyB8ICdwbyc7XG4gIH1cbn1cbiJdfQ==
