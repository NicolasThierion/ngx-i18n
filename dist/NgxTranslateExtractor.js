"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var biesbjerg_ngx_translate_extract_1 = require("./biesbjerg-ngx-translate-extract");
var _ = require("lodash");
var path = require("path");
var utils_1 = require("./utils");
var fs = require("fs");
var compiler_factory_1 = require("./compiler.factory");
/**
 * Wrapper for ExtractTask without going through the provided cli.
 */
var NgxTranslateExtractor = /** @class */ (function () {
    function NgxTranslateExtractor(options) {
        if (options === void 0) { options = {}; }
        this.options = _.defaults(options, {
            clean: true,
            replace: false,
            sort: false,
            patterns: ['/**/*.html', '/**/*.ts'],
            input: ['./src'],
            output: ['./i18n'],
            relative: true,
            languages: ['en'],
            format: 'po' // gettext format
        });
        Object.seal(this.options);
        if (this.options.format !== 'po' && this.options.format !== 'json') {
            throw new TypeError("invalid format : " + options.format + ". Valid format are json, po");
        }
        this._parsers = [
            new biesbjerg_ngx_translate_extract_1.PipeParser(),
            new biesbjerg_ngx_translate_extract_1.DirectiveParser(),
            new biesbjerg_ngx_translate_extract_1.ServiceParser(),
        ];
        this._compiler = compiler_factory_1.CompilerFactory.create(this.options.format, {});
    }
    NgxTranslateExtractor.prototype.execute = function (filenames) {
        var _this = this;
        var o = this.options;
        var input = filenames ? filenames
            .map(function (f) { return fs.statSync(f).isFile() ? path.dirname(f) : f; })
            : o.input;
        // if output specified, run ExtractTask as normal
        if (!this.options.relativeOutput) {
            // ngx-translate-extract --input  `input` --output `output` --clean --sort --format namespaced-json
            var collections = this._extract(input, o);
            this._save(collections, o.output.map(function (ot) { return path.join(ot, "[lang].[ext]"); }));
        }
        else {
            // list all files found that matches template
            var dirs_1 = new Set();
            input.map(function (dir) {
                return utils_1.readDir(dir, o.patterns)
                    .map(path.dirname)
                    .reduce(function (dirs, dir) {
                    return dirs.add(dir);
                }, dirs_1);
            });
            // run one extractTask per folder where template is found
            dirs_1.forEach(function (dir) {
                var collections = _this._extract([dir], {
                    patterns: o.patterns.map(function (p) { return "/" + path.basename(p); })
                });
                _this._save(collections, o.output.map(function (ot) { return path.join(dir, ot, path.basename(dir) + ".[lang].[ext]"); }));
            });
        }
    };
    /**
     * Extract strings from input dirs using configured parsers
     */
    NgxTranslateExtractor.prototype._extract = function (input, options) {
        var _this = this;
        var collection = new biesbjerg_ngx_translate_extract_1.TranslationCollection();
        input.forEach(function (dir) {
            utils_1.readDir(dir, options.patterns || []).forEach(function (path) {
                var contents = fs.readFileSync(path, 'utf-8');
                _this._parsers.forEach(function (parser) {
                    collection = collection.union(parser.extract(contents, path));
                });
            });
        });
        var collections = {};
        this.options.languages.forEach(function (l) {
            collections[l] = collection;
        });
        return collections;
    };
    NgxTranslateExtractor.prototype._save = function (collections, outputs) {
        var _this = this;
        var _loop_1 = function (lang) {
            var normalizedOutputs = outputs.map(function (p) { return utils_1.normalizePath(p, _this._compiler.extension, lang); });
            collections[lang] = utils_1.merge(normalizedOutputs, this_1._compiler, collections[lang]);
            utils_1.save(collections[lang], lang, this_1.options.format, normalizedOutputs);
        };
        var this_1 = this;
        for (var _i = 0, _a = Object.keys(collections); _i < _a.length; _i++) {
            var lang = _a[_i];
            _loop_1(lang);
        }
    };
    return NgxTranslateExtractor;
}());
exports.NgxTranslateExtractor = NgxTranslateExtractor;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9OZ3hUcmFuc2xhdGVFeHRyYWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxRkFLMEM7QUFDMUMsMEJBQTRCO0FBQzVCLDJCQUE2QjtBQUM3QixpQ0FBOEQ7QUFDOUQsdUJBQXlCO0FBR3pCLHVEQUFxRDtBQVVyRDs7R0FFRztBQUNIO0lBS0UsK0JBQVksT0FBd0I7UUFBeEIsd0JBQUEsRUFBQSxZQUF3QjtRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ2pDLEtBQUssRUFBRSxJQUFJO1lBQ1gsT0FBTyxFQUFFLEtBQUs7WUFDZCxJQUFJLEVBQUUsS0FBSztZQUNYLFFBQVEsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUM7WUFDcEMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ2hCLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNsQixRQUFRLEVBQUUsSUFBSTtZQUNkLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQztZQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFnQixpQkFBaUI7U0FDOUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzQkFBb0IsT0FBTyxDQUFDLE1BQU0sZ0NBQTZCLENBQUMsQ0FBQztRQUN2RixDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNkLElBQUksNENBQVUsRUFBRTtZQUNoQixJQUFJLGlEQUFlLEVBQUU7WUFDckIsSUFBSSwrQ0FBYSxFQUFFO1NBRXBCLENBQUM7UUFFRixJQUFJLENBQUMsU0FBUyxH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QUF4QixjQUF3QixFQUF4QixJQUF3QjtZQUF0QyxJQUFNLElBQUksU0FBQTtvQkFBSixJQUFJO1NBSWQ7SUFDSCxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQWpHQSxBQWlHQyxJQUFBO0FBakdZLHNEQUFxQiIsImZpbGUiOiJOZ3hUcmFuc2xhdGVFeHRyYWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBUcmFuc2xhdGlvbkNvbGxlY3Rpb24sXG4gIERpcmVjdGl2ZVBhcnNlciwgRXh0cmFjdFRhc2tPcHRpb25zSW50ZXJmYWNlLFxuICBQYXJzZXJJbnRlcmZhY2UsIFBpcGVQYXJzZXIsXG4gIFNlcnZpY2VQYXJzZXJcbn0gZnJvbSAnLi9iaWVzYmplcmctbmd4LXRyYW5zbGF0ZS1leHRyYWN0J1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IG1lcmdlLCBub3JtYWxpemVQYXRoLCByZWFkRGlyLCBzYXZlIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBJMThuUGFyc2VyIH0gZnJvbSAnLi9wYXJzZXJzL0kxOG5QYXJzZXInO1xuaW1wb3J0IHsgQ29tcGlsZXJJbnRlcmZhY2UgfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdCc7XG5pbXBvcnQgeyBDb21waWxlckZhY3RvcnkgfSBmcm9tICcuL2NvbXBpbGVyLmZhY3RvcnknO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5neE9wdGlvbnMgZXh0ZW5kcyBFeHRyYWN0VGFza09wdGlvbnNJbnRlcmZhY2Uge1xuICBpbnB1dD86IHN0cmluZ1tdO1xuICBvdXRwdXQ/OiBzdHJpbmdbXTtcbiAgcmVsYXRpdmVPdXRwdXQ/OiBib29sZWFuO1xuICBmb3JtYXQ/OiAncG8nIHwgJ2pzb24nLFxuICBsYW5ndWFnZXM/OiBbJ2VuJ11cbn1cblxuLyoqXG4gKiBXcmFwcGVyIGZvciBFeHRyYWN0VGFzayB3aXRob3V0IGdvaW5nIHRocm91Z2ggdGhlIHByb3ZpZGVkIGNsaS5cbiAqL1xuZXhwb3J0IGNsYXNzIE5neFRyYW5zbGF0ZUV4dHJhY3RvciB7XG4gIF9wYXJzZXJzOiBQYXJzZXJJbnRlcmZhY2VbXTtcbiAgX2NvbXBpbGVyOiBDb21waWxlckludGVyZmFjZTtcbiAgb3B0aW9uczogTmd4T3B0aW9ucztcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBOZ3hPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBfLmRlZmF1bHRzKG9wdGlvbnMsIHtcbiAgICAgIGNsZWFuOiB0cnVlLCAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIG9ic29sZXRlIHN0cmluZ3Mgd2hlbiBtZXJnaW5nXG4gICAgICByZXBsYWNlOiBmYWxzZSwgICAgICAgICAgICAgIC8vIFJlcGxhY2UgdGhlIGNvbnRlbnRzIG9mIG91dHB1dCBmaWxlIGlmIGl0IGV4aXN0c1xuICAgICAgc29ydDogZmFsc2UsICAgICAgICAgICAgICAgICAvLyBTb3J0IHN0cmluZ3MgaW4gYWxwaGFiZXRpY2FsIG9yZGVyIHdoZW4gc2F2aW5nXG4gICAgICBwYXR0ZXJuczogWycvKiovKi5odG1sJywgJy8qKi8qLnRzJ10sICAgIC8vIEV4dHJhY3Qgc3RyaW5ncyBmcm9tIHRoZSBmb2xsb3dpbmcgZmlsZSBwYXR0ZXJuc1xuICAgICAgaW5wdXQ6IFsnLi9zcmMnXSxcbiAgICAgIG91dHB1dDogWycuL2kxOG4nXSxcbiAgICAgIHJlbGF0aXZlOiB0cnVlLFxuICAgICAgbGFuZ3VhZ2VzOiBbJ2VuJ10sXG4gICAgICBmb3JtYXQ6ICdwbycgICAgICAgICAgICAgICAgLy8gZ2V0dGV4dCBmb3JtYXRcbiAgICB9KTtcbiAgICBPYmplY3Quc2VhbCh0aGlzLm9wdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5mb3JtYXQgIT09ICdwbycgJiYgdGhpcy5vcHRpb25zLmZvcm1hdCAhPT0gJ2pzb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBpbnZhbGlkIGZvcm1hdCA6ICR7b3B0aW9ucy5mb3JtYXR9LiBWYWxpZCBmb3JtYXQgYXJlIGpzb24sIHBvYCk7XG4gICAgfVxuXG4gICAgdGhpcy5fcGFyc2VycyA9IFtcbiAgICAgIG5ldyBQaXBlUGFyc2VyKCksXG4gICAgICBuZXcgRGlyZWN0aXZlUGFyc2VyKCksXG4gICAgICBuZXcgU2VydmljZVBhcnNlcigpLFxuICAgICAgLy8gbmV3IEkxOG5QYXJzZXIoKVxuICAgIF07XG5cbiAgICB0aGlzLl9jb21waWxlciA9IENvbXBpbGVyRmFjdG9yeS5jcmVhdGUodGhpcy5vcHRpb25zLmZvcm1hdCwge30pXG4gIH1cblxuICBwdWJsaWMgZXhlY3V0ZShmaWxlbmFtZXM/OiBzdHJpbmdbXSkge1xuXG4gICAgY29uc3QgbyA9IHRoaXMub3B0aW9ucyBhcyBhbnk7XG4gICAgY29uc3QgaW5wdXQgPSBmaWxlbmFtZXMgPyBmaWxlbmFtZXNcbiAgICAgICAgLm1hcChmID0+IGZzLnN0YXRTeW5jKGYpLmlzRmlsZSgpID8gcGF0aC5kaXJuYW1lKGYpIDogZilcbiAgICAgIDogby5pbnB1dDtcblxuICAgIC8vIGlmIG91dHB1dCBzcGVjaWZpZWQsIHJ1biBFeHRyYWN0VGFzayBhcyBub3JtYWxcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5yZWxhdGl2ZU91dHB1dCkge1xuICAgICAgLy8gbmd4LXRyYW5zbGF0ZS1leHRyYWN0IC0taW5wdXQgIGBpbnB1dGAgLS1vdXRwdXQgYG91dHB1dGAgLS1jbGVhbiAtLXNvcnQgLS1mb3JtYXQgbmFtZXNwYWNlZC1qc29uXG4gICAgICBsZXQgY29sbGVjdGlvbnMgPSB0aGlzLl9leHRyYWN0KGlucHV0LCBvKTtcbiAgICAgIHRoaXMuX3NhdmUoY29sbGVjdGlvbnMsIG8ub3V0cHV0Lm1hcChvdCA9PiBwYXRoLmpvaW4ob3QsIGBbbGFuZ10uW2V4dF1gKSkpO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIGxpc3QgYWxsIGZpbGVzIGZvdW5kIHRoYXQgbWF0Y2hlcyB0ZW1wbGF0ZVxuICAgICAgY29uc3QgZGlycyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgICAgaW5wdXQubWFwKGRpciA9PiB7XG4gICAgICAgIHJldHVybiByZWFkRGlyKGRpciwgby5wYXR0ZXJucylcbiAgICAgICAgICAubWFwKHBhdGguZGlybmFtZSlcbiAgICAgICAgICAucmVkdWNlKChkaXJzOiBTZXQ8c3RyaW5nPiwgZGlyOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkaXJzLmFkZChkaXIpO1xuICAgICAgICAgIH0sIGRpcnMpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHJ1biBvbmUgZXh0cmFjdFRhc2sgcGVyIGZvbGRlciB3aGVyZSB0ZW1wbGF0ZSBpcyBmb3VuZFxuICAgICAgZGlycy5mb3JFYWNoKGRpciA9PiB7XG4gICAgICAgIGxldCBjb2xsZWN0aW9ucyA9IHRoaXMuX2V4dHJhY3QoW2Rpcl0sIHtcbiAgICAgICAgICBwYXR0ZXJuczogby5wYXR0ZXJucy5tYXAocCA9PiBgLyR7cGF0aC5iYXNlbmFtZShwKX1gKVxuICAgICAgICB9KTtcbiAgICAgICB0aGlzLl9zYXZlKGNvbGxlY3Rpb25zLCBvLm91dHB1dC5tYXAob3QgPT4gcGF0aC5qb2luKGRpciwgb3QsIGAke3BhdGguYmFzZW5hbWUoZGlyKX0uW2xhbmddLltleHRdYCkpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRyYWN0IHN0cmluZ3MgZnJvbSBpbnB1dCBkaXJzIHVzaW5nIGNvbmZpZ3VyZWQgcGFyc2Vyc1xuICAgKi9cbiAgcHJvdGVjdGVkIF9leHRyYWN0KGlucHV0OiBzdHJpbmdbXSwgb3B0aW9uczogRXh0cmFjdFRhc2tPcHRpb25zSW50ZXJmYWNlKToge1tsYW5nOnN0cmluZ106IFRyYW5zbGF0aW9uQ29sbGVjdGlvbn0ge1xuICAgIGxldCBjb2xsZWN0aW9uOiBUcmFuc2xhdGlvbkNvbGxlY3Rpb24gPSBuZXcgVHJhbnNsYXRpb25Db2xsZWN0aW9uKCk7XG4gICAgaW5wdXQuZm9yRWFjaChkaXIgPT4ge1xuICAgICAgcmVhZERpcihkaXIsIG9wdGlvbnMucGF0dGVybnMgfHwgW10pLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRzOiBzdHJpbmcgPSBmcy5yZWFkRmlsZVN5bmMocGF0aCwgJ3V0Zi04Jyk7XG4gICAgICAgIHRoaXMuX3BhcnNlcnMuZm9yRWFjaCgocGFyc2VyOiBQYXJzZXJJbnRlcmZhY2UpID0+IHtcbiAgICAgICAgICBjb2xsZWN0aW9uID0gY29sbGVjdGlvbi51bmlvbihwYXJzZXIuZXh0cmFjdChjb250ZW50cywgcGF0aCkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbnMgPSB7fTtcbiAgICAodGhpcy5vcHRpb25zIGFzIGFueSkubGFuZ3VhZ2VzLmZvckVhY2gobCA9PiB7XG4gICAgICBjb2xsZWN0aW9uc1tsXSA9IGNvbGxlY3Rpb247XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29sbGVjdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIF9zYXZlKGNvbGxlY3Rpb25zOiB7W2xhbmc6IHN0cmluZ106IFRyYW5zbGF0aW9uQ29sbGVjdGlvbn0sIG91dHB1dHM6IHN0cmluZ1tdKTogYW55IHtcblxuICAgIGZvciAoY29uc3QgbGFuZyBvZiBPYmplY3Qua2V5cyhjb2xsZWN0aW9ucykpIHtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRPdXRwdXRzID0gb3V0cHV0cy5tYXAocCA9PiBub3JtYWxpemVQYXRoKHAsIHRoaXMuX2NvbXBpbGVyLmV4dGVuc2lvbiwgbGFuZykpO1xuICAgICAgY29sbGVjdGlvbnNbbGFuZ10gPSBtZXJnZShub3JtYWxpemVkT3V0cHV0cywgdGhpcy5fY29tcGlsZXIsIGNvbGxlY3Rpb25zW2xhbmddKTtcbiAgICAgIHNhdmUoY29sbGVjdGlvbnNbbGFuZ10sIGxhbmcsICh0aGlzLm9wdGlvbnMgYXMgYW55KS5mb3JtYXQsIG5vcm1hbGl6ZWRPdXRwdXRzKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
