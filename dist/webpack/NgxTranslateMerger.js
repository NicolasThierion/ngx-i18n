"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var utils_1 = require("./utils");
var globToRegExp = require("glob-to-regexp");
var log_1 = require("./log");
var ngx_import_1 = require("./ngx-import");
var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");
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
        var translationFiles = this._findTranslationFiles();
        var languagesMap = this._findLanguages(translationFiles);
        log_1.Log.debug("Found languages : " + Object.keys(languagesMap));
        this.translations = this._extractTranslationCollections(languagesMap);
        this._save(this.translations);
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
            collections[lang] = new ngx_import_1.TranslationCollection();
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
    NgxTranslateMerger.prototype._save = function (collections) {
        var o = this._options;
        var compiler = compiler_factory_1.CompilerFactory.create(o.format, {});
        o.output.forEach(function (output) {
            for (var _i = 0, _a = Object.keys(collections); _i < _a.length; _i++) {
                var lang = _a[_i];
                var notmalizedOutput = path.resolve(output
                    .replace('[lang]', lang)
                    .replace('[ext]', compiler.extension));
                var dir = notmalizedOutput;
                var filename = lang + "." + compiler.extension;
                if (!fs.existsSync(notmalizedOutput) || !fs.statSync(notmalizedOutput).isDirectory()) {
                    dir = path.dirname(notmalizedOutput);
                    filename = path.basename(notmalizedOutput);
                }
                var outputPath = path.join(dir, filename);
                var processedCollection = collections[lang];
                log_1.Log.debug("\nSaving: " + outputPath);
                processedCollection = processedCollection.sort();
                if (!fs.existsSync(dir)) {
                    mkdirp.sync(dir);
                }
                fs.writeFileSync(outputPath, compiler.compile(processedCollection));
            }
            log_1.Log.debug('Done!');
        });
    };
    return NgxTranslateMerger;
}());
exports.NgxTranslateMerger = NgxTranslateMerger;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrL05neFRyYW5zbGF0ZU1lcmdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBCQUE0QjtBQUM1QixpQ0FBa0M7QUFDbEMsNkNBQThDO0FBQzlDLDZCQUE0QjtBQUM1QiwyQ0FBb0Q7QUFDcEQsdUJBQXlCO0FBQ3pCLDJCQUE2QjtBQUU3QiwrQkFBaUM7QUFDakMsdURBQXFEO0FBRXJEO0lBSUUsNEJBQVksT0FBOEM7UUFBOUMsd0JBQUEsRUFBQSxZQUE4QztRQUV4RCw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUNsQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDaEIsUUFBUSxFQUFFLENBQUMscUJBQXFCLEVBQUUsdUJBQXVCLENBQUM7WUFDMUQsTUFBTSxFQUFFLENBQUMsMEJBQTBCLENBQUM7WUFDcEMsTUFBTSxFQUFFLE1BQU07U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsb0NBQU8sR0FBUDtRQUNFLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDdEQsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzNELFNBQUcsQ0FBQyxLQUFLLENBQUMsdUJBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFHLENBQUMsQ0FBQztRQUU1RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsc0NBQVMsR0FBVDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUM5QixDQUFDO0lBRU8sMkNBQWMsR0FBdEIsVUFBdUIsS0FBZTtR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Q0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCx5QkFBQztBQUFELENBdkhBLEFBdUhDLElBQUE7QUF2SFksZ0RBQWtCIiwiZmlsZSI6IndlYnBhY2svTmd4VHJhbnNsYXRlTWVyZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgcmVhZERpciB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0ICogYXMgZ2xvYlRvUmVnRXhwIGZyb20gJ2dsb2ItdG8tcmVnZXhwJ1xuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9sb2cnO1xuaW1wb3J0IHsgVHJhbnNsYXRpb25Db2xsZWN0aW9uIH0gZnJvbSAnLi9uZ3gtaW1wb3J0J1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IENvbXBpbGVySW50ZXJmYWNlIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QnO1xuaW1wb3J0ICogYXMgbWtkaXJwIGZyb20gJ21rZGlycCc7XG5pbXBvcnQgeyBDb21waWxlckZhY3RvcnkgfSBmcm9tICcuL2NvbXBpbGVyLmZhY3RvcnknO1xuXG5leHBvcnQgY2xhc3MgTmd4VHJhbnNsYXRlTWVyZ2VyIHtcbiAgcHVibGljIHRyYW5zbGF0aW9uczogeyBbcDogc3RyaW5nXTogVHJhbnNsYXRpb25Db2xsZWN0aW9uIH07XG4gIHByaXZhdGUgX29wdGlvbnM6IE5neFRyYW5zbGF0ZU1lcmdlci5NZXJnZXJPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE5neFRyYW5zbGF0ZU1lcmdlci5NZXJnZXJPcHRpb25zID0ge30pIHtcblxuICAgIC8vIG1lcmdlIHdpdGggZGVmYXVsdCBvcHRpb25zXG4gICAgdGhpcy5fb3B0aW9ucyA9IF8uZGVmYXVsdHMob3B0aW9ucywge1xuICAgICAgaW5wdXQ6IFsnLi9zcmMnXSxcbiAgICAgIHBhdHRlcm5zOiBbYCoqL2kxOG4vKi5bbGFuZ10ucG9gLCBgKiovaTE4bi8qLltsYW5nXS5qc29uYF0sXG4gICAgICBvdXRwdXQ6IFsnYXNzZXRzL2kxOG4vW2xhbmddLltleHRdJ10sXG4gICAgICBmb3JtYXQ6ICdqc29uJ1xuICAgIH0pO1xuICB9XG5cbiAgZXhlY3V0ZSgpIHtcbiAgICBjb25zdCB0cmFuc2xhdGlvbkZpbGVzID0gdGhpcy5fZmluZFRyYW5zbGF0aW9uRmlsZXMoKTtcbiAgICBjb25zdCBsYW5ndWFnZXNNYXAgPSB0aGlzLl9maW5kTGFuZ3VhZ2VzKHRyYW5zbGF0aW9uRmlsZXMpO1xuICAgIExvZy5kZWJ1ZyhgRm91bmQgbGFuZ3VhZ2VzIDogJHtPYmplY3Qua2V5cyhsYW5ndWFnZXNNYXApfWApO1xuXG4gICAgdGhpcy50cmFuc2xhdGlvbnMgPSB0aGlzLl9leHRyYWN0VHJhbnNsYXRpb25Db2xsZWN0aW9ucyhsYW5ndWFnZXNNYXApO1xuICAgIHRoaXMuX3NhdmUodGhpcy50cmFuc2xhdGlvbnMpO1xuICB9XG5cbiAgZ2V0Rm9ybWF0KCkge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zLmZvcm1hdDtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRMYW5ndWFnZXMoZmlsZXM6IHN0cmluZ1tdKTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmdbXSB9IHtcbiAgICBjb25zdCByZWdleGVzID0gKHRoaXMuX29wdGlvbnMgYXMgYW55KS5wYXR0ZXJuc1xuICAgICAgLm1hcChzID0+IHMucmVwbGFjZSgnW2xhbmddJywgJ19sYW5nXycpKVxuICAgICAgLm1hcChnbG9iVG9SZWdFeHApXG4gICAgICAubWFwKHIgPT4gci5zb3VyY2UpXG4gICAgICAubWFwKHMgPT4gcy5yZXBsYWNlKCdfbGFuZ18nLCAnKC4qKScpKTtcblxuICAgIC8vIGluZmVyIGF2YWlsYWJsZSBsYW5ndWFnZXMgZnJvbSBmb3VuZCB0cmFuc2xhdGlvbiBmaWxlc1xuICAgIHJldHVybiBmaWxlcy5yZWR1Y2UoKHZhbHVlcywgZmlsZW5hbWUpID0+IHtcbiAgICAgIHJlZ2V4ZXNcbiAgICAgICAgLm1hcChyZSA9PiBmaWxlbmFtZS5tYXRjaChyZSkpXG4gICAgICAgIC5maWx0ZXIobWF0Y2ggPT4gISFtYXRjaClcbiAgICAgICAgLmZvckVhY2gobWF0Y2ggPT4ge1xuICAgICAgICAgIGNvbnN0IHBhdGggPSBtYXRjaFswXTtcbiAgICAgICAgICBjb25zdCBsYW5nID0gbWF0Y2hbMV07XG4gICAgICAgICAgaWYgKCF2YWx1ZXNbbGFuZ10pIHtcbiAgICAgICAgICAgIHZhbHVlc1tsYW5nXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZXNbbGFuZ10ucHVzaChwYXRoKTtcbiAgICAgICAgfSk7XG4gICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRUcmFuc2xhdGlvbkZpbGVzKCkge1xuICAgIGNvbnN0IG8gPSB0aGlzLl9vcHRpb25zIGFzIGFueTtcbiAgICBjb25zdCBmaWxlczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCBwYXR0ZXJuID0gby5wYXR0ZXJucy5tYXAocyA9PiBzLnJlcGxhY2UoJ1tsYW5nXScsICcqJykpO1xuXG4gICAgby5pbnB1dC5mb3JFYWNoKGRpciA9PiB7XG4gICAgICByZWFkRGlyKGRpciwgcGF0dGVybilcbiAgICAgICAgLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgZmlsZXMucHVzaChwKTtcbiAgICAgICAgfSlcbiAgICB9KTtcbiAgICByZXR1cm4gZmlsZXM7XG4gIH1cblxuICBwcml2YXRlIF9leHRyYWN0VHJhbnNsYXRpb25Db2xsZWN0aW9ucyh0cmFuc2xhdGlvbkZpbGVzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZ1tdIH0pOiB7IFtrZXk6IHN0cmluZ106IFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB9IHtcbiAgICBjb25zdCBjb21waWxlcnMgPSBbXG4gICAgICBDb21waWxlckZhY3RvcnkuY3JlYXRlKCdwb3QnLCB7fSksXG4gICAgICBDb21waWxlckZhY3RvcnkuY3JlYXRlKCdqc29uJywge30pXG4gICAgXTtcbiAgICBjb25zdCBjb2xsZWN0aW9ucyA9IHt9O1xuICAgIGZvciAoY29uc3QgbGFuZyBvZiBPYmplY3Qua2V5cyh0cmFuc2xhdGlvbkZpbGVzKSkge1xuICAgICAgY29uc3QgcGF0aHMgPSB0cmFuc2xhdGlvbkZpbGVzW2xhbmddO1xuICAgICAgY29sbGVjdGlvbnNbbGFuZ10gPSBuZXcgVHJhbnNsYXRpb25Db2xsZWN0aW9uKCk7XG4gICAgICBmb3IgKGNvbnN0IGNvbXBpbGVyIG9mIGNvbXBpbGVycykge1xuXG4gICAgICAgIGNvbGxlY3Rpb25zW2xhbmddID0gcGF0aHNcbiAgICAgICAgICAuZmlsdGVyKHAgPT4gcGF0aC5leHRuYW1lKHApID09PSBgLiR7Y29tcGlsZXIuZXh0ZW5zaW9ufWApXG4gICAgICAgICAgLm1hcChwID0+IGZzLnJlYWRGaWxlU3luYyhwLCAndXRmLTgnKSlcbiAgICAgICAgICAubWFwKGNvbXBpbGVyLnBhcnNlLmJpbmQoY29tcGlsZXIpKVxuICAgICAgICAgIC5yZWR1Y2UoKGFjYzogVHJhbnNsYXRpb25Db2xsZWN0aW9uLCBjOiBUcmFuc2xhdGlvbkNvbGxlY3Rpb24pID0+IGFjYy51bmlvbihjKSwgY29sbGVjdGlvbnNbbGFuZ10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb2xsZWN0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgX3NhdmUoY29sbGVjdGlvbnM6IHsgW3A6IHN0cmluZ106IFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB9KSB7XG4gICAgY29uc3QgbyA9IHRoaXMuX29wdGlvbnMgYXMgYW55O1xuICAgIGNvbnN0IGNvbXBpbGVyOiBDb21waWxlckludGVyZmFjZSA9IENvbXBpbGVyRmFjdG9yeS5jcmVhdGUoby5mb3JtYXQsIHt9KTtcblxuICAgIG8ub3V0cHV0LmZvckVhY2gob3V0cHV0ID0+IHtcbiAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBPYmplY3Qua2V5cyhjb2xsZWN0aW9ucykpIHtcbiAgICAgICAgY29uc3Qgbm90bWFsaXplZE91dHB1dCA9IHBhdGgucmVzb2x2ZShvdXRwdXRcbiAgICAgICAgICAucmVwbGFjZSgnW2xhbmddJywgbGFuZylcbiAgICAgICAgICAucmVwbGFjZSgnW2V4dF0nLCBjb21waWxlci5leHRlbnNpb24pKTtcbiAgICAgICAgbGV0IGRpcjogc3RyaW5nID0gbm90bWFsaXplZE91dHB1dDtcbiAgICAgICAgbGV0IGZpbGVuYW1lOiBzdHJpbmcgPSBgJHtsYW5nfS4ke2NvbXBpbGVyLmV4dGVuc2lvbn1gO1xuICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMobm90bWFsaXplZE91dHB1dCkgfHwgIWZzLnN0YXRTeW5jKG5vdG1hbGl6ZWRPdXRwdXQpLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICBkaXIgPSBwYXRoLmRpcm5hbWUobm90bWFsaXplZE91dHB1dCk7XG4gICAgICAgICAgZmlsZW5hbWUgPSBwYXRoLmJhc2VuYW1lKG5vdG1hbGl6ZWRPdXRwdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3V0cHV0UGF0aDogc3RyaW5nID0gcGF0aC5qb2luKGRpciwgZmlsZW5hbWUpO1xuXG5cbiAgICAgICAgbGV0IHByb2Nlc3NlZENvbGxlY3Rpb246IFRyYW5zbGF0aW9uQ29sbGVjdGlvbiA9IGNvbGxlY3Rpb25zW2xhbmddO1xuICAgICAgICBMb2cuZGVidWcoYFxcblNhdmluZzogJHtvdXRwdXRQYXRofWApO1xuICAgICAgICBwcm9jZXNzZWRDb2xsZWN0aW9uID0gcHJvY2Vzc2VkQ29sbGVjdGlvbi5zb3J0KCk7XG5cbiAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpcikpIHtcbiAgICAgICAgICBta2RpcnAuc3luYyhkaXIpO1xuICAgICAgICB9XG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMob3V0cHV0UGF0aCwgY29tcGlsZXIuY29tcGlsZShwcm9jZXNzZWRDb2xsZWN0aW9uKSk7XG4gICAgICB9XG4gICAgICBMb2cuZGVidWcoJ0RvbmUhJyk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBOZ3hUcmFuc2xhdGVNZXJnZXIge1xuXG4gIGV4cG9ydCBpbnRlcmZhY2UgTWVyZ2VyT3B0aW9ucyB7XG4gICAgaW5wdXQ/OiBzdHJpbmdbXTtcbiAgICBwYXR0ZXJuPzogc3RyaW5nO1xuICAgIG91dHB1dD86IHN0cmluZ1tdO1xuICAgIGZvcm1hdD86ICdqc29uJyB8ICdwbyc7XG4gIH1cbn1cbiJdfQ==
