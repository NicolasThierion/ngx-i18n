"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var utils_1 = require("./utils");
var globToRegExp = require("glob-to-regexp");
var ngx_import_1 = require("./ngx-import");
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
    return NgxTranslateMerger;
}());
exports.NgxTranslateMerger = NgxTranslateMerger;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrL05neFRyYW5zbGF0ZU1lcmdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBCQUE0QjtBQUM1QixpQ0FBd0M7QUFDeEMsNkNBQThDO0FBQzlDLDJDQUFvRDtBQUNwRCx1QkFBeUI7QUFDekIsMkJBQTZCO0FBQzdCLHVEQUFxRDtBQUVyRDtJQUlFLDRCQUFZLE9BQThDO1FBQTlDLHdCQUFBLEVBQUEsWUFBOEM7UUFFeEQsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDbEMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ2hCLFFBQVEsRUFBRSxDQUFDLHFCQUFxQixFQUFFLHVCQUF1QixDQUFDO1lBQzFELE1BQU0sRUFBRSxDQUFDLDBCQUEwQixDQUFDO1lBQ3BDLE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9DQUFPLEdBQVA7UUFDRSxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBZSxDQUFDO1FBQy9CLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDdEQsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RFLFlBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxzQ0FBUyxHQUFUO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQzlCLENBQUM7SUFFTywyQ0FBYyxHQUF0QixVQUF1QixLQUFlO1FBQ3BDLElBQU0sT0FBTyxHQUFJLElBQUksQ0FB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QUFHLEtBQUs7cUJBQ3RCLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBSSxRQUFRLENBQUMsU0FBVyxFQUE1QyxDQUE0QyxDQUFDO3FCQUN6RCxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQztxQkFDckMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUNsQyxNQUFNLENBQUMsVUFBQyxHQUEwQixFQUFFLENBQXdCLElBQUssT0FBQSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFaLENBQVksRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2RyxDQUFDO1lBUEQsR0FBRyxDQUFDLENBQW1CLFVBQVMsRUFBVCx1QkFBUyxFQUFULHVCQUFTLEVBQVQsSUFBUztnQkFBM0IsSUFBTSxRQUFRLGtCQUFBO3dCQUFSLFFBQVE7YUFPbEI7U0FDRjtRQUVELE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0F2RkEsQUF1RkMsSUFBQTtBQXZGWSxnREFBa0IiLCJmaWxlIjoid2VicGFjay9OZ3hUcmFuc2xhdGVNZXJnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyByZWFkRGlyLCBzYXZlIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgKiBhcyBnbG9iVG9SZWdFeHAgZnJvbSAnZ2xvYi10by1yZWdleHAnXG5pbXBvcnQgeyBUcmFuc2xhdGlvbkNvbGxlY3Rpb24gfSBmcm9tICcuL25neC1pbXBvcnQnXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ29tcGlsZXJGYWN0b3J5IH0gZnJvbSAnLi9jb21waWxlci5mYWN0b3J5JztcblxuZXhwb3J0IGNsYXNzIE5neFRyYW5zbGF0ZU1lcmdlciB7XG4gIHB1YmxpYyB0cmFuc2xhdGlvbnM6IHsgW3A6IHN0cmluZ106IFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB9O1xuICBwcml2YXRlIF9vcHRpb25zOiBOZ3hUcmFuc2xhdGVNZXJnZXIuTWVyZ2VyT3B0aW9ucztcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBOZ3hUcmFuc2xhdGVNZXJnZXIuTWVyZ2VyT3B0aW9ucyA9IHt9KSB7XG5cbiAgICAvLyBtZXJnZSB3aXRoIGRlZmF1bHQgb3B0aW9uc1xuICAgIHRoaXMuX29wdGlvbnMgPSBfLmRlZmF1bHRzKG9wdGlvbnMsIHtcbiAgICAgIGlucHV0OiBbJy4vc3JjJ10sXG4gICAgICBwYXR0ZXJuczogW2AqKi9pMThuLyouW2xhbmddLnBvYCwgYCoqL2kxOG4vKi5bbGFuZ10uanNvbmBdLFxuICAgICAgb3V0cHV0OiBbJ2Fzc2V0cy9pMThuL1tsYW5nXS5bZXh0XSddLFxuICAgICAgZm9ybWF0OiAnanNvbidcbiAgICB9KTtcbiAgfVxuXG4gIGV4ZWN1dGUoKSB7XG4gICAgY29uc3QgbyA9IHRoaXMuX29wdGlvbnMgYXMgYW55O1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uRmlsZXMgPSB0aGlzLl9maW5kVHJhbnNsYXRpb25GaWxlcygpO1xuICAgIGNvbnN0IGxhbmd1YWdlc01hcCA9IHRoaXMuX2ZpbmRMYW5ndWFnZXModHJhbnNsYXRpb25GaWxlcyk7XG5cbiAgICB0aGlzLnRyYW5zbGF0aW9ucyA9IHRoaXMuX2V4dHJhY3RUcmFuc2xhdGlvbkNvbGxlY3Rpb25zKGxhbmd1YWdlc01hcCk7XG4gICAgc2F2ZSh0aGlzLnRyYW5zbGF0aW9ucywgby5mb3JtYXQsIG8ub3V0cHV0KTtcbiAgfVxuXG4gIGdldEZvcm1hdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucy5mb3JtYXQ7XG4gIH1cblxuICBwcml2YXRlIF9maW5kTGFuZ3VhZ2VzKGZpbGVzOiBzdHJpbmdbXSk6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfSB7XG4gICAgY29uc3QgcmVnZXhlcyA9ICh0aGlzLl9vcHRpb25zIGFzIGFueSkucGF0dGVybnNcbiAgICAgIC5tYXAocyA9PiBzLnJlcGxhY2UoJ1tsYW5nXScsICdfbGFuZ18nKSlcbiAgICAgIC5tYXAoZ2xvYlRvUmVnRXhwKVxuICAgICAgLm1hcChyID0+IHIuc291cmNlKVxuICAgICAgLm1hcChzID0+IHMucmVwbGFjZSgnX2xhbmdfJywgJyguKiknKSk7XG5cbiAgICAvLyBpbmZlciBhdmFpbGFibGUgbGFuZ3VhZ2VzIGZyb20gZm91bmQgdHJhbnNsYXRpb24gZmlsZXNcbiAgICByZXR1cm4gZmlsZXMucmVkdWNlKCh2YWx1ZXMsIGZpbGVuYW1lKSA9PiB7XG4gICAgICByZWdleGVzXG4gICAgICAgIC5tYXAocmUgPT4gZmlsZW5hbWUubWF0Y2gocmUpKVxuICAgICAgICAuZmlsdGVyKG1hdGNoID0+ICEhbWF0Y2gpXG4gICAgICAgIC5mb3JFYWNoKG1hdGNoID0+IHtcbiAgICAgICAgICBjb25zdCBwYXRoID0gbWF0Y2hbMF07XG4gICAgICAgICAgY29uc3QgbGFuZyA9IG1hdGNoWzFdO1xuICAgICAgICAgIGlmICghdmFsdWVzW2xhbmddKSB7XG4gICAgICAgICAgICB2YWx1ZXNbbGFuZ10gPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWVzW2xhbmddLnB1c2gocGF0aCk7XG4gICAgICAgIH0pO1xuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9LCB7fSk7XG4gIH1cblxuICBwcml2YXRlIF9maW5kVHJhbnNsYXRpb25GaWxlcygpIHtcbiAgICBjb25zdCBvID0gdGhpcy5fb3B0aW9ucyBhcyBhbnk7XG4gICAgY29uc3QgZmlsZXM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgcGF0dGVybiA9IG8ucGF0dGVybnMubWFwKHMgPT4gcy5yZXBsYWNlKCdbbGFuZ10nLCAnKicpKTtcblxuICAgIG8uaW5wdXQuZm9yRWFjaChkaXIgPT4ge1xuICAgICAgcmVhZERpcihkaXIsIHBhdHRlcm4pXG4gICAgICAgIC5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgIGZpbGVzLnB1c2gocCk7XG4gICAgICAgIH0pXG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZXh0cmFjdFRyYW5zbGF0aW9uQ29sbGVjdGlvbnModHJhbnNsYXRpb25GaWxlczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmdbXSB9KTogeyBba2V5OiBzdHJpbmddOiBUcmFuc2xhdGlvbkNvbGxlY3Rpb24gfSB7XG4gICAgY29uc3QgY29tcGlsZXJzID0gW1xuICAgICAgQ29tcGlsZXJGYWN0b3J5LmNyZWF0ZSgncG90Jywge30pLFxuICAgICAgQ29tcGlsZXJGYWN0b3J5LmNyZWF0ZSgnanNvbicsIHt9KVxuICAgIF07XG4gICAgY29uc3QgY29sbGVjdGlvbnMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGxhbmcgb2YgT2JqZWN0LmtleXModHJhbnNsYXRpb25GaWxlcykpIHtcbiAgICAgIGNvbnN0IHBhdGhzID0gdHJhbnNsYXRpb25GaWxlc1tsYW5nXTtcbiAgICAgIGNvbGxlY3Rpb25zW2xhbmddID0gbmV3IFRyYW5zbGF0aW9uQ29sbGVjdGlvbigpO1xuICAgICAgZm9yIChjb25zdCBjb21waWxlciBvZiBjb21waWxlcnMpIHtcblxuICAgICAgICBjb2xsZWN0aW9uc1tsYW5nXSA9IHBhdGhzXG4gICAgICAgICAgLmZpbHRlcihwID0+IHBhdGguZXh0bmFtZShwKSA9PT0gYC4ke2NvbXBpbGVyLmV4dGVuc2lvbn1gKVxuICAgICAgICAgIC5tYXAocCA9PiBmcy5yZWFkRmlsZVN5bmMocCwgJ3V0Zi04JykpXG4gICAgICAgICAgLm1hcChjb21waWxlci5wYXJzZS5iaW5kKGNvbXBpbGVyKSlcbiAgICAgICAgICAucmVkdWNlKChhY2M6IFRyYW5zbGF0aW9uQ29sbGVjdGlvbiwgYzogVHJhbnNsYXRpb25Db2xsZWN0aW9uKSA9PiBhY2MudW5pb24oYyksIGNvbGxlY3Rpb25zW2xhbmddKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGVjdGlvbnM7XG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBOZ3hUcmFuc2xhdGVNZXJnZXIge1xuXG4gIGV4cG9ydCBpbnRlcmZhY2UgTWVyZ2VyT3B0aW9ucyB7XG4gICAgaW5wdXQ/OiBzdHJpbmdbXTtcbiAgICBwYXR0ZXJuPzogc3RyaW5nO1xuICAgIG91dHB1dD86IHN0cmluZ1tdO1xuICAgIGZvcm1hdD86ICdqc29uJyB8ICdwbyc7XG4gIH1cbn1cbiJdfQ==
