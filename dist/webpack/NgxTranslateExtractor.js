"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ngx_import_1 = require("./ngx-import");
var _ = require("lodash");
var path = require("path");
var utils_1 = require("./utils");
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
        this._compiler = compiler_factory_1.CompilerFactory.create(this.options.format, {});
        this._parsers = [
            new ngx_import_1.PipeParser(),
            new ngx_import_1.DirectiveParser(),
            new ngx_import_1.ServiceParser()
        ];
    }
    NgxTranslateExtractor.prototype.execute = function (filenames) {
        var _this = this;
        var o = this.options;
        var input = filenames || o.input;
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
            var extract = new ngx_import_1.ExtractTask(input, outputs, o);
            extract.setCompiler(this._compiler);
            extract.setParsers(this._parsers);
            extract.execute();
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
                var extract = new ngx_import_1.ExtractTask([dir], outputs, {
                    patterns: o.patterns.map(function (p) { return "/" + path.basename(p); })
                });
                extract.setCompiler(_this._compiler);
                extract.setParsers(_this._parsers);
                extract.execute();
            });
        }
    };
    return NgxTranslateExtractor;
}());
exports.NgxTranslateExtractor = NgxTranslateExtractor;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrL05neFRyYW5zbGF0ZUV4dHJhY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQU1xQjtBQUNyQiwwQkFBNEI7QUFDNUIsMkJBQTZCO0FBQzdCLGlDQUFrQztBQUNsQyx1REFBcUQ7QUFVckQ7O0dBRUc7QUFDSDtJQUtFLCtCQUFZLE9BQXdCO1FBQXhCLHdCQUFBLEVBQUEsWUFBd0I7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUNqQyxLQUFLLEVBQUUsSUFBSTtZQUNYLE9BQU8sRUFBRSxLQUFLO1lBQ2QsSUFBSSxFQUFFLEtBQUs7WUFDWCxRQUFRLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDO1lBQ3BDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNoQixNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDbEIsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBZ0IsaUJBQWlCO1NBQzlDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sSUFBSSxTQUFTLENBQUMsc0JBQW9CLE9BQU8sQ0FBQyxNQUFNLGdDQUE2QixDQUFDLENBQUM7UUFDdkYsQ0FBQztRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsa0NBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakUsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNkLElBQUks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QztpQkFDdEQsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNwQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbEMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUM7SUFDSCw0QkFBQztBQUFELENBaEZBLEFBZ0ZDLElBQUE7QUFoRlksc0RBQXFCIiwiZmlsZSI6IndlYnBhY2svTmd4VHJhbnNsYXRlRXh0cmFjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcGlsZXJJbnRlcmZhY2UsXG4gIERpcmVjdGl2ZVBhcnNlcixcbiAgRXh0cmFjdFRhc2ssIEV4dHJhY3RUYXNrT3B0aW9uc0ludGVyZmFjZSxcbiAgUGFyc2VySW50ZXJmYWNlLCBQaXBlUGFyc2VyLFxuICBTZXJ2aWNlUGFyc2VyXG59IGZyb20gJy4vbmd4LWltcG9ydCdcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyByZWFkRGlyIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBDb21waWxlckZhY3RvcnkgfSBmcm9tICcuL2NvbXBpbGVyLmZhY3RvcnknO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5neE9wdGlvbnMgZXh0ZW5kcyBFeHRyYWN0VGFza09wdGlvbnNJbnRlcmZhY2Uge1xuICBpbnB1dD86IHN0cmluZ1tdO1xuICBvdXRwdXQ/OiBzdHJpbmdbXTtcbiAgcmVsYXRpdmVPdXRwdXQ/OiBib29sZWFuO1xuICBmb3JtYXQ/OiAncG8nIHwgJ2pzb24nLFxuICBsYW5ndWFnZXM/OiBbJ2VuJ11cbn1cblxuLyoqXG4gKiBXcmFwcGVyIGZvciBFeHRyYWN0VGFzayB3aXRob3V0IGdvaW5nIHRocm91Z2ggdGhlIHByb3ZpZGVkIGNsaS5cbiAqL1xuZXhwb3J0IGNsYXNzIE5neFRyYW5zbGF0ZUV4dHJhY3RvciB7XG4gIF9wYXJzZXJzOiBQYXJzZXJJbnRlcmZhY2VbXTtcbiAgX2NvbXBpbGVyOiBDb21waWxlckludGVyZmFjZTtcbiAgb3B0aW9uczogTmd4T3B0aW9ucztcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBOZ3hPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBfLmRlZmF1bHRzKG9wdGlvbnMsIHtcbiAgICAgIGNsZWFuOiB0cnVlLCAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIG9ic29sZXRlIHN0cmluZ3Mgd2hlbiBtZXJnaW5nXG4gICAgICByZXBsYWNlOiBmYWxzZSwgICAgICAgICAgICAgIC8vIFJlcGxhY2UgdGhlIGNvbnRlbnRzIG9mIG91dHB1dCBmaWxlIGlmIGl0IGV4aXN0c1xuICAgICAgc29ydDogZmFsc2UsICAgICAgICAgICAgICAgICAvLyBTb3J0IHN0cmluZ3MgaW4gYWxwaGFiZXRpY2FsIG9yZGVyIHdoZW4gc2F2aW5nXG4gICAgICBwYXR0ZXJuczogWycvKiovKi5odG1sJywgJy8qKi8qLnRzJ10sICAgIC8vIEV4dHJhY3Qgc3RyaW5ncyBmcm9tIHRoZSBmb2xsb3dpbmcgZmlsZSBwYXR0ZXJuc1xuICAgICAgaW5wdXQ6IFsnLi9zcmMnXSxcbiAgICAgIG91dHB1dDogWycuL2kxOG4nXSxcbiAgICAgIHJlbGF0aXZlOiB0cnVlLFxuICAgICAgbGFuZ3VhZ2VzOiBbJ2VuJ10sXG4gICAgICBmb3JtYXQ6ICdwbycgICAgICAgICAgICAgICAgLy8gZ2V0dGV4dCBmb3JtYXRcbiAgICB9KTtcbiAgICBPYmplY3Quc2VhbCh0aGlzLm9wdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5mb3JtYXQgIT09ICdwbycgJiYgdGhpcy5vcHRpb25zLmZvcm1hdCAhPT0gJ2pzb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBpbnZhbGlkIGZvcm1hdCA6ICR7b3B0aW9ucy5mb3JtYXR9LiBWYWxpZCBmb3JtYXQgYXJlIGpzb24sIHBvYCk7XG4gICAgfVxuXG4gICAgdGhpcy5fY29tcGlsZXIgPSBDb21waWxlckZhY3RvcnkuY3JlYXRlKHRoaXMub3B0aW9ucy5mb3JtYXQsIHt9KTtcblxuICAgIHRoaXMuX3BhcnNlcnMgPSBbXG4gICAgICBuZXcgUGlwZVBhcnNlcigpLFxuICAgICAgbmV3IERpcmVjdGl2ZVBhcnNlcigpLFxuICAgICAgbmV3IFNlcnZpY2VQYXJzZXIoKVxuICAgIF07XG4gIH1cblxuICBwdWJsaWMgZXhlY3V0ZShmaWxlbmFtZXM/OiBzdHJpbmdbXSkge1xuXG4gICAgY29uc3QgbyA9IHRoaXMub3B0aW9ucyBhcyBhbnk7XG4gICAgY29uc3QgaW5wdXQgPSBmaWxlbmFtZXMgfHwgby5pbnB1dDtcblxuICAgIC8vIGlmIG91dHB1dCBzcGVjaWZpZWQsIHJ1biBFeHRyYWN0VGFzayBhcyBub3JtYWxcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5yZWxhdGl2ZU91dHB1dCkge1xuICAgICAgLy8gbmd4LXRyYW5zbGF0ZS1leHRyYWN0IC0taW5wdXQgIGBpbnB1dGAgLS1vdXRwdXQgYG91dHB1dGAgLS1jbGVhbiAtLXNvcnQgLS1mb3JtYXQgbmFtZXNwYWNlZC1qc29uXG4gICAgICBsZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbiAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBvLmxhbmd1YWdlcykge1xuICAgICAgICBmb3IgKGNvbnN0IG90IG9mIG8ub3V0cHV0KSB7XG4gICAgICAgICAgb3V0cHV0cy5wdXNoKHBhdGguam9pbihvdCwgYCR7bGFuZ30uJHtvLmZvcm1hdH1gKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGV4dHJhY3QgPSBuZXcgRXh0cmFjdFRhc2soaW5wdXQsIG91dHB1dHMsIG8pO1xuICAgICAgZXh0cmFjdC5zZXRDb21waWxlcih0aGlzLl9jb21waWxlcik7XG4gICAgICBleHRyYWN0LnNldFBhcnNlcnModGhpcy5fcGFyc2Vycyk7XG4gICAgICBleHRyYWN0LmV4ZWN1dGUoKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBsaXN0IGFsbCBmaWxlcyBmb3VuZCB0aGF0IG1hdGNoZXMgdGVtcGxhdGVcbiAgICAgIGNvbnN0IGRpcnMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgIGlucHV0Lm1hcChkaXIgPT4ge1xuICAgICAgICByZXR1cm4gcmVhZERpcihkaXIsIG8ucGF0dGVybnMpXG4gICAgICAgICAgLm1hcChwYXRoLmRpcm5hbWUpXG4gICAgICAgICAgLnJlZHVjZSgoZGlyczogU2V0PHN0cmluZz4sIGRpcjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZGlycy5hZGQoZGlyKTtcbiAgICAgICAgICB9LCBkaXJzKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBydW4gb25lIGV4dHJhY3RUYXNrIHBlciBmb2xkZXIgd2hlcmUgdGVtcGxhdGUgaXMgZm91bmRcbiAgICAgIGRpcnMuZm9yRWFjaChkaXIgPT4ge1xuICAgICAgICBsZXQgb3V0cHV0cyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGxhbmcgb2Ygby5sYW5ndWFnZXMpIHtcbiAgICAgICAgICBvdXRwdXRzID0gb3V0cHV0cy5jb25jYXQoXG4gICAgICAgICAgICBvLm91dHB1dFxuICAgICAgICAgICAgICAubWFwKG90ID0+IHBhdGguam9pbihkaXIsIG90LCBgJHtwYXRoLmJhc2VuYW1lKGRpcil9LiR7bGFuZ30uJHtvLmZvcm1hdH1gKSkpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBleHRyYWN0ID0gbmV3IEV4dHJhY3RUYXNrKFtkaXJdLCBvdXRwdXRzLCB7XG4gICAgICAgICAgcGF0dGVybnM6IG8ucGF0dGVybnMubWFwKHAgPT4gYC8ke3BhdGguYmFzZW5hbWUocCl9YClcbiAgICAgICAgfSk7XG4gICAgICAgIGV4dHJhY3Quc2V0Q29tcGlsZXIodGhpcy5fY29tcGlsZXIpO1xuICAgICAgICBleHRyYWN0LnNldFBhcnNlcnModGhpcy5fcGFyc2Vycyk7XG4gICAgICAgIGV4dHJhY3QuZXhlY3V0ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=
