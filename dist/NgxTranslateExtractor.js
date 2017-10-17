"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var biesbjerg_ngx_translate_extract_1 = require("./biesbjerg-ngx-translate-extract");
var _ = require("lodash");
var path = require("path");
var utils_1 = require("./utils");
var fs = require("fs");
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
            var outputs = [];
            for (var _i = 0, _a = o.languages; _i < _a.length; _i++) {
                var lang = _a[_i];
                for (var _b = 0, _c = o.output; _b < _c.length; _b++) {
                    var ot = _c[_b];
                    outputs.push(path.join(ot, lang + "." + o.format));
                }
            }
            var collections = this._extract(input, outputs, o);
            utils_1.save(collections, o.format, outputs);
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
                var outputs = [];
                var _loop_1 = function (lang) {
                    outputs = outputs.concat(o.output
                        .map(function (ot) { return path.join(dir, ot, path.basename(dir) + "." + lang + "." + o.format); }));
                };
                for (var _i = 0, _a = o.languages; _i < _a.length; _i++) {
                    var lang = _a[_i];
                    _loop_1(lang);
                }
                var collections = _this._extract([dir], outputs, {
                    patterns: o.patterns.map(function (p) { return "/" + path.basename(p); })
                });
                utils_1.save(collections, o.format, outputs);
            });
        }
    };
    /**
     * Extract strings from input dirs using configured parsers
     */
    NgxTranslateExtractor.prototype._extract = function (input, outputs, options) {
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
    return NgxTranslateExtractor;
}());
exports.NgxTranslateExtractor = NgxTranslateExtractor;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9OZ3hUcmFuc2xhdGVFeHRyYWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxRkFLMEM7QUFDMUMsMEJBQTRCO0FBQzVCLDJCQUE2QjtBQUM3QixpQ0FBd0M7QUFDeEMsdUJBQXlCO0FBV3pCOztHQUVHO0FBQ0g7SUFJRSwrQkFBWSxPQUF3QjtRQUF4Qix3QkFBQSxFQUFBLFlBQXdCO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDakMsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsS0FBSztZQUNkLElBQUksRUFBRSxLQUFLO1lBQ1gsUUFBUSxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQztZQUNwQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDaEIsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2xCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQWdCLGlCQUFpQjtTQUM5QyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNuRSxNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFvQixPQUFPLENBQUMsTUFBTSxnQ0FBNkIsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ2QsSUFBSSw0Q0FBVSxFQUFFO1lBQ2hCLElBQUksaURBQWUsRUFBRTtZQUNyQixJQUFJLCtDQUFhLEVBQUU7U0FFcEIsQ0FBQztJQUNKLENBQUM7SUFFTSx1Q0FBTyxHQUFkLFVBQWUsU0FB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eHRyYWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBUcmFuc2xhdGlvbkNvbGxlY3Rpb24sXG4gIERpcmVjdGl2ZVBhcnNlciwgRXh0cmFjdFRhc2tPcHRpb25zSW50ZXJmYWNlLFxuICBQYXJzZXJJbnRlcmZhY2UsIFBpcGVQYXJzZXIsXG4gIFNlcnZpY2VQYXJzZXJcbn0gZnJvbSAnLi9iaWVzYmplcmctbmd4LXRyYW5zbGF0ZS1leHRyYWN0J1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IHJlYWREaXIsIHNhdmUgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IEkxOG5QYXJzZXIgfSBmcm9tICcuL3BhcnNlcnMvSTE4blBhcnNlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmd4T3B0aW9ucyBleHRlbmRzIEV4dHJhY3RUYXNrT3B0aW9uc0ludGVyZmFjZSB7XG4gIGlucHV0Pzogc3RyaW5nW107XG4gIG91dHB1dD86IHN0cmluZ1tdO1xuICByZWxhdGl2ZU91dHB1dD86IGJvb2xlYW47XG4gIGZvcm1hdD86ICdwbycgfCAnanNvbicsXG4gIGxhbmd1YWdlcz86IFsnZW4nXVxufVxuXG4vKipcbiAqIFdyYXBwZXIgZm9yIEV4dHJhY3RUYXNrIHdpdGhvdXQgZ29pbmcgdGhyb3VnaCB0aGUgcHJvdmlkZWQgY2xpLlxuICovXG5leHBvcnQgY2xhc3MgTmd4VHJhbnNsYXRlRXh0cmFjdG9yIHtcbiAgX3BhcnNlcnM6IFBhcnNlckludGVyZmFjZVtdO1xuICBvcHRpb25zOiBOZ3hPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE5neE9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMub3B0aW9ucyA9IF8uZGVmYXVsdHMob3B0aW9ucywge1xuICAgICAgY2xlYW46IHRydWUsICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgb2Jzb2xldGUgc3RyaW5ncyB3aGVuIG1lcmdpbmdcbiAgICAgIHJlcGxhY2U6IGZhbHNlLCAgICAgICAgICAgICAgLy8gUmVwbGFjZSB0aGUgY29udGVudHMgb2Ygb3V0cHV0IGZpbGUgaWYgaXQgZXhpc3RzXG4gICAgICBzb3J0OiBmYWxzZSwgICAgICAgICAgICAgICAgIC8vIFNvcnQgc3RyaW5ncyBpbiBhbHBoYWJldGljYWwgb3JkZXIgd2hlbiBzYXZpbmdcbiAgICAgIHBhdHRlcm5zOiBbJy8qKi8qLmh0bWwnLCAnLyoqLyoudHMnXSwgICAgLy8gRXh0cmFjdCBzdHJpbmdzIGZyb20gdGhlIGZvbGxvd2luZyBmaWxlIHBhdHRlcm5zXG4gICAgICBpbnB1dDogWycuL3NyYyddLFxuICAgICAgb3V0cHV0OiBbJy4vaTE4biddLFxuICAgICAgcmVsYXRpdmU6IHRydWUsXG4gICAgICBsYW5ndWFnZXM6IFsnZW4nXSxcbiAgICAgIGZvcm1hdDogJ3BvJyAgICAgICAgICAgICAgICAvLyBnZXR0ZXh0IGZvcm1hdFxuICAgIH0pO1xuICAgIE9iamVjdC5zZWFsKHRoaXMub3B0aW9ucyk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmZvcm1hdCAhPT0gJ3BvJyAmJiB0aGlzLm9wdGlvbnMuZm9ybWF0ICE9PSAnanNvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGludmFsaWQgZm9ybWF0IDogJHtvcHRpb25zLmZvcm1hdH0uIFZhbGlkIGZvcm1hdCBhcmUganNvbiwgcG9gKTtcbiAgICB9XG5cbiAgICB0aGlzLl9wYXJzZXJzID0gW1xuICAgICAgbmV3IFBpcGVQYXJzZXIoKSxcbiAgICAgIG5ldyBEaXJlY3RpdmVQYXJzZXIoKSxcbiAgICAgIG5ldyBTZXJ2aWNlUGFyc2VyKCksXG4gICAgICAvLyBuZXcgSTE4blBhcnNlcigpXG4gICAgXTtcbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlKGZpbGVuYW1lcz86IHN0cmluZ1tdKSB7XG5cbiAgICBjb25zdCBvID0gdGhpcy5vcHRpb25zIGFzIGFueTtcbiAgICBjb25zdCBpbnB1dCA9IGZpbGVuYW1lcyA/IGZpbGVuYW1lc1xuICAgICAgICAubWFwKGYgPT4gZnMuc3RhdFN5bmMoZikuaXNGaWxlKCkgPyBwYXRoLmRpcm5hbWUoZikgOiBmKVxuICAgICAgOiBvLmlucHV0O1xuXG4gICAgLy8gaWYgb3V0cHV0IHNwZWNpZmllZCwgcnVuIEV4dHJhY3RUYXNrIGFzIG5vcm1hbFxuICAgIGlmICghdGhpcy5vcHRpb25zLnJlbGF0aXZlT3V0cHV0KSB7XG4gICAgICAvLyBuZ3gtdHJhbnNsYXRlLWV4dHJhY3QgLS1pbnB1dCAgYGlucHV0YCAtLW91dHB1dCBgb3V0cHV0YCAtLWNsZWFuIC0tc29ydCAtLWZvcm1hdCBuYW1lc3BhY2VkLWpzb25cbiAgICAgIGxldCBvdXRwdXRzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgZm9yIChjb25zdCBsYW5nIG9mIG8ubGFuZ3VhZ2VzKSB7XG4gICAgICAgIGZvciAoY29uc3Qgb3Qgb2Ygby5vdXRwdXQpIHtcbiAgICAgICAgICBvdXRwdXRzLnB1c2gocGF0aC5qb2luKG90LCBgJHtsYW5nfS4ke28uZm9ybWF0fWApKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjb2xsZWN0aW9ucyA9IHRoaXMuX2V4dHJhY3QoaW5wdXQsIG91dHB1dHMsIG8pO1xuICAgICAgc2F2ZShjb2xsZWN0aW9ucywgby5mb3JtYXQsIG91dHB1dHMpO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIGxpc3QgYWxsIGZpbGVzIGZvdW5kIHRoYXQgbWF0Y2hlcyB0ZW1wbGF0ZVxuICAgICAgY29uc3QgZGlycyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgICAgaW5wdXQubWFwKGRpciA9PiB7XG4gICAgICAgIHJldHVybiByZWFkRGlyKGRpciwgby5wYXR0ZXJucylcbiAgICAgICAgICAubWFwKHBhdGguZGlybmFtZSlcbiAgICAgICAgICAucmVkdWNlKChkaXJzOiBTZXQ8c3RyaW5nPiwgZGlyOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkaXJzLmFkZChkaXIpO1xuICAgICAgICAgIH0sIGRpcnMpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHJ1biBvbmUgZXh0cmFjdFRhc2sgcGVyIGZvbGRlciB3aGVyZSB0ZW1wbGF0ZSBpcyBmb3VuZFxuICAgICAgZGlycy5mb3JFYWNoKGRpciA9PiB7XG4gICAgICAgIGxldCBvdXRwdXRzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBvLmxhbmd1YWdlcykge1xuICAgICAgICAgIG91dHB1dHMgPSBvdXRwdXRzLmNvbmNhdChcbiAgICAgICAgICAgIG8ub3V0cHV0XG4gICAgICAgICAgICAgIC5tYXAob3QgPT4gcGF0aC5qb2luKGRpciwgb3QsIGAke3BhdGguYmFzZW5hbWUoZGlyKX0uJHtsYW5nfS4ke28uZm9ybWF0fWApKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbGxlY3Rpb25zID0gdGhpcy5fZXh0cmFjdChbZGlyXSwgb3V0cHV0cywge1xuICAgICAgICAgIHBhdHRlcm5zOiBvLnBhdHRlcm5zLm1hcChwID0+IGAvJHtwYXRoLmJhc2VuYW1lKHApfWApXG4gICAgICAgIH0pO1xuICAgICAgICBzYXZlKGNvbGxlY3Rpb25zLCBvLmZvcm1hdCwgb3V0cHV0cyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdCBzdHJpbmdzIGZyb20gaW5wdXQgZGlycyB1c2luZyBjb25maWd1cmVkIHBhcnNlcnNcbiAgICovXG4gIHByb3RlY3RlZCBfZXh0cmFjdChpbnB1dDogc3RyaW5nW10sIG91dHB1dHM6IHN0cmluZ1tdLCBvcHRpb25zOiBFeHRyYWN0VGFza09wdGlvbnNJbnRlcmZhY2UpOiB7W2xhbmc6c3RyaW5nXTogVHJhbnNsYXRpb25Db2xsZWN0aW9ufSB7XG4gICAgbGV0IGNvbGxlY3Rpb246IFRyYW5zbGF0aW9uQ29sbGVjdGlvbiA9IG5ldyBUcmFuc2xhdGlvbkNvbGxlY3Rpb24oKTtcbiAgICBpbnB1dC5mb3JFYWNoKGRpciA9PiB7XG4gICAgICByZWFkRGlyKGRpciwgb3B0aW9ucy5wYXR0ZXJucyB8fCBbXSkuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgY29uc3QgY29udGVudHM6IHN0cmluZyA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLCAndXRmLTgnKTtcbiAgICAgICAgdGhpcy5fcGFyc2Vycy5mb3JFYWNoKChwYXJzZXI6IFBhcnNlckludGVyZmFjZSkgPT4ge1xuICAgICAgICAgIGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLnVuaW9uKHBhcnNlci5leHRyYWN0KGNvbnRlbnRzLCBwYXRoKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2xsZWN0aW9ucyA9IHt9O1xuICAgICh0aGlzLm9wdGlvbnMgYXMgYW55KS5sYW5ndWFnZXMuZm9yRWFjaChsID0+IHtcbiAgICAgIGNvbGxlY3Rpb25zW2xdID0gY29sbGVjdGlvbjtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb2xsZWN0aW9ucztcbiAgfVxufVxuIl19
