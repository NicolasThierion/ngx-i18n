"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ngx_import_1 = require("./ngx-import");
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
            new ngx_import_1.PipeParser(),
            new ngx_import_1.DirectiveParser(),
            new ngx_import_1.ServiceParser()
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
        var collection = new ngx_import_1.TranslationCollection();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrL05neFRyYW5zbGF0ZUV4dHJhY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUtxQjtBQUNyQiwwQkFBNEI7QUFDNUIsMkJBQTZCO0FBQzdCLGlDQUF3QztBQUN4Qyx1QkFBeUI7QUFVekI7O0dBRUc7QUFDSDtJQUlFLCtCQUFZLE9BQXdCO1FBQXhCLHdCQUFBLEVBQUEsWUFBd0I7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUNqQyxLQUFLLEVBQUUsSUFBSTtZQUNYLE9BQU8sRUFBRSxLQUFLO1lBQ2QsSUFBSSxFQUFFLEtBQUs7WUFDWCxRQUFRLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDO1lBQ3BDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNoQixNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDbEIsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBZ0IsaUJBQWlCO1NBQzlDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sSUFBSSxTQUFTLENBQUMsc0JBQW9CLE9BQU8sQ0FBQyxNQUFNLGdDQUE2QixDQUFDLENBQUM7UUFDdkYsQ0FBQztRQUVELElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDZCxJQUFJLHVCQUFVLEVBQUU7WUFDaEIsSUFBSSw0QkFBZSxFQUFFO1lBQ3JCLElBQUksMEJBQWEsRUFBRTtTQUNwQixDQUFDO0lBQ0osQ0FBQztJQUVNLHVDQUFPLEdBQWQs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Y2svTmd4VHJhbnNsYXRlRXh0cmFjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgVHJhbnNsYXRpb25Db2xsZWN0aW9uLFxuICBEaXJlY3RpdmVQYXJzZXIsIEV4dHJhY3RUYXNrT3B0aW9uc0ludGVyZmFjZSxcbiAgUGFyc2VySW50ZXJmYWNlLCBQaXBlUGFyc2VyLFxuICBTZXJ2aWNlUGFyc2VyXG59IGZyb20gJy4vbmd4LWltcG9ydCdcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyByZWFkRGlyLCBzYXZlIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmd4T3B0aW9ucyBleHRlbmRzIEV4dHJhY3RUYXNrT3B0aW9uc0ludGVyZmFjZSB7XG4gIGlucHV0Pzogc3RyaW5nW107XG4gIG91dHB1dD86IHN0cmluZ1tdO1xuICByZWxhdGl2ZU91dHB1dD86IGJvb2xlYW47XG4gIGZvcm1hdD86ICdwbycgfCAnanNvbicsXG4gIGxhbmd1YWdlcz86IFsnZW4nXVxufVxuXG4vKipcbiAqIFdyYXBwZXIgZm9yIEV4dHJhY3RUYXNrIHdpdGhvdXQgZ29pbmcgdGhyb3VnaCB0aGUgcHJvdmlkZWQgY2xpLlxuICovXG5leHBvcnQgY2xhc3MgTmd4VHJhbnNsYXRlRXh0cmFjdG9yIHtcbiAgX3BhcnNlcnM6IFBhcnNlckludGVyZmFjZVtdO1xuICBvcHRpb25zOiBOZ3hPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE5neE9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMub3B0aW9ucyA9IF8uZGVmYXVsdHMob3B0aW9ucywge1xuICAgICAgY2xlYW46IHRydWUsICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgb2Jzb2xldGUgc3RyaW5ncyB3aGVuIG1lcmdpbmdcbiAgICAgIHJlcGxhY2U6IGZhbHNlLCAgICAgICAgICAgICAgLy8gUmVwbGFjZSB0aGUgY29udGVudHMgb2Ygb3V0cHV0IGZpbGUgaWYgaXQgZXhpc3RzXG4gICAgICBzb3J0OiBmYWxzZSwgICAgICAgICAgICAgICAgIC8vIFNvcnQgc3RyaW5ncyBpbiBhbHBoYWJldGljYWwgb3JkZXIgd2hlbiBzYXZpbmdcbiAgICAgIHBhdHRlcm5zOiBbJy8qKi8qLmh0bWwnLCAnLyoqLyoudHMnXSwgICAgLy8gRXh0cmFjdCBzdHJpbmdzIGZyb20gdGhlIGZvbGxvd2luZyBmaWxlIHBhdHRlcm5zXG4gICAgICBpbnB1dDogWycuL3NyYyddLFxuICAgICAgb3V0cHV0OiBbJy4vaTE4biddLFxuICAgICAgcmVsYXRpdmU6IHRydWUsXG4gICAgICBsYW5ndWFnZXM6IFsnZW4nXSxcbiAgICAgIGZvcm1hdDogJ3BvJyAgICAgICAgICAgICAgICAvLyBnZXR0ZXh0IGZvcm1hdFxuICAgIH0pO1xuICAgIE9iamVjdC5zZWFsKHRoaXMub3B0aW9ucyk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmZvcm1hdCAhPT0gJ3BvJyAmJiB0aGlzLm9wdGlvbnMuZm9ybWF0ICE9PSAnanNvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGludmFsaWQgZm9ybWF0IDogJHtvcHRpb25zLmZvcm1hdH0uIFZhbGlkIGZvcm1hdCBhcmUganNvbiwgcG9gKTtcbiAgICB9XG5cbiAgICB0aGlzLl9wYXJzZXJzID0gW1xuICAgICAgbmV3IFBpcGVQYXJzZXIoKSxcbiAgICAgIG5ldyBEaXJlY3RpdmVQYXJzZXIoKSxcbiAgICAgIG5ldyBTZXJ2aWNlUGFyc2VyKClcbiAgICBdO1xuICB9XG5cbiAgcHVibGljIGV4ZWN1dGUoZmlsZW5hbWVzPzogc3RyaW5nW10pIHtcblxuICAgIGNvbnN0IG8gPSB0aGlzLm9wdGlvbnMgYXMgYW55O1xuICAgIGNvbnN0IGlucHV0ID0gZmlsZW5hbWVzID8gZmlsZW5hbWVzXG4gICAgICAgIC5tYXAoZiA9PiBmcy5zdGF0U3luYyhmKS5pc0ZpbGUoKSA/IHBhdGguZGlybmFtZShmKSA6IGYpXG4gICAgICA6IG8uaW5wdXQ7XG5cbiAgICAvLyBpZiBvdXRwdXQgc3BlY2lmaWVkLCBydW4gRXh0cmFjdFRhc2sgYXMgbm9ybWFsXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMucmVsYXRpdmVPdXRwdXQpIHtcbiAgICAgIC8vIG5neC10cmFuc2xhdGUtZXh0cmFjdCAtLWlucHV0ICBgaW5wdXRgIC0tb3V0cHV0IGBvdXRwdXRgIC0tY2xlYW4gLS1zb3J0IC0tZm9ybWF0IG5hbWVzcGFjZWQtanNvblxuICAgICAgbGV0IG91dHB1dHM6IHN0cmluZ1tdID0gW107XG4gICAgICBmb3IgKGNvbnN0IGxhbmcgb2Ygby5sYW5ndWFnZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBvdCBvZiBvLm91dHB1dCkge1xuICAgICAgICAgIG91dHB1dHMucHVzaChwYXRoLmpvaW4ob3QsIGAke2xhbmd9LiR7by5mb3JtYXR9YCkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbGxlY3Rpb25zID0gdGhpcy5fZXh0cmFjdChpbnB1dCwgb3V0cHV0cywgbyk7XG4gICAgICBzYXZlKGNvbGxlY3Rpb25zLCBvLmZvcm1hdCwgb3V0cHV0cyk7XG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gbGlzdCBhbGwgZmlsZXMgZm91bmQgdGhhdCBtYXRjaGVzIHRlbXBsYXRlXG4gICAgICBjb25zdCBkaXJzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICBpbnB1dC5tYXAoZGlyID0+IHtcbiAgICAgICAgcmV0dXJuIHJlYWREaXIoZGlyLCBvLnBhdHRlcm5zKVxuICAgICAgICAgIC5tYXAocGF0aC5kaXJuYW1lKVxuICAgICAgICAgIC5yZWR1Y2UoKGRpcnM6IFNldDxzdHJpbmc+LCBkaXI6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRpcnMuYWRkKGRpcik7XG4gICAgICAgICAgfSwgZGlycyk7XG4gICAgICB9KTtcblxuICAgICAgLy8gcnVuIG9uZSBleHRyYWN0VGFzayBwZXIgZm9sZGVyIHdoZXJlIHRlbXBsYXRlIGlzIGZvdW5kXG4gICAgICBkaXJzLmZvckVhY2goZGlyID0+IHtcbiAgICAgICAgbGV0IG91dHB1dHMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBsYW5nIG9mIG8ubGFuZ3VhZ2VzKSB7XG4gICAgICAgICAgb3V0cHV0cyA9IG91dHB1dHMuY29uY2F0KFxuICAgICAgICAgICAgby5vdXRwdXRcbiAgICAgICAgICAgICAgLm1hcChvdCA9PiBwYXRoLmpvaW4oZGlyLCBvdCwgYCR7cGF0aC5iYXNlbmFtZShkaXIpfS4ke2xhbmd9LiR7by5mb3JtYXR9YCkpKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29sbGVjdGlvbnMgPSB0aGlzLl9leHRyYWN0KFtkaXJdLCBvdXRwdXRzLCB7XG4gICAgICAgICAgcGF0dGVybnM6IG8ucGF0dGVybnMubWFwKHAgPT4gYC8ke3BhdGguYmFzZW5hbWUocCl9YClcbiAgICAgICAgfSk7XG4gICAgICAgIHNhdmUoY29sbGVjdGlvbnMsIG8uZm9ybWF0LCBvdXRwdXRzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRyYWN0IHN0cmluZ3MgZnJvbSBpbnB1dCBkaXJzIHVzaW5nIGNvbmZpZ3VyZWQgcGFyc2Vyc1xuICAgKi9cbiAgcHJvdGVjdGVkIF9leHRyYWN0KGlucHV0OiBzdHJpbmdbXSwgb3V0cHV0czogc3RyaW5nW10sIG9wdGlvbnM6IEV4dHJhY3RUYXNrT3B0aW9uc0ludGVyZmFjZSk6IHtbbGFuZzpzdHJpbmddOiBUcmFuc2xhdGlvbkNvbGxlY3Rpb259IHtcbiAgICBsZXQgY29sbGVjdGlvbjogVHJhbnNsYXRpb25Db2xsZWN0aW9uID0gbmV3IFRyYW5zbGF0aW9uQ29sbGVjdGlvbigpO1xuICAgIGlucHV0LmZvckVhY2goZGlyID0+IHtcbiAgICAgIHJlYWREaXIoZGlyLCBvcHRpb25zLnBhdHRlcm5zIHx8IFtdKS5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICBjb25zdCBjb250ZW50czogc3RyaW5nID0gZnMucmVhZEZpbGVTeW5jKHBhdGgsICd1dGYtOCcpO1xuICAgICAgICB0aGlzLl9wYXJzZXJzLmZvckVhY2goKHBhcnNlcjogUGFyc2VySW50ZXJmYWNlKSA9PiB7XG4gICAgICAgICAgY29sbGVjdGlvbiA9IGNvbGxlY3Rpb24udW5pb24ocGFyc2VyLmV4dHJhY3QoY29udGVudHMsIHBhdGgpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbGxlY3Rpb25zID0ge307XG4gICAgKHRoaXMub3B0aW9ucyBhcyBhbnkpLmxhbmd1YWdlcy5mb3JFYWNoKGwgPT4ge1xuICAgICAgY29sbGVjdGlvbnNbbF0gPSBjb2xsZWN0aW9uO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbGxlY3Rpb25zO1xuICB9XG59XG4iXX0=
