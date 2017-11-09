"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var biesbjerg_ngx_translate_extract_1 = require("./biesbjerg-ngx-translate-extract");
var _ = require("lodash");
var PATH = require("path");
var utils_1 = require("./utils");
var fs = require("fs");
var I18nParser_1 = require("./parsers/I18nParser");
var compiler_factory_1 = require("./compiler.factory");
var ExtendedTranslationCollection_1 = require("./ExtendedTranslationCollection ");
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
            new I18nParser_1.I18nParser()
        ];
        this._compiler = compiler_factory_1.CompilerFactory.create(this.options.format, {});
    }
    NgxTranslateExtractor.prototype.execute = function (filenames) {
        var _this = this;
        var o = this.options;
        var input = filenames ? filenames
            .map(function (f) { return fs.statSync(f).isFile() ? PATH.dirname(f) : f; })
            : o.input;
        // if output specified, run ExtractTask as normal
        if (!this.options.relativeOutput) {
            // ngx-translate-extract --input  `input` --output `output` --clean --sort --format namespaced-json
            var collections = this._extract(input, o);
            this._save(collections, o.output.map(function (ot) { return PATH.join(ot, "[lang].[ext]"); }));
        }
        else {
            // list all files found that matches template
            var dirs_1 = new Set();
            input.map(function (dir) {
                return utils_1.readDir(dir, o.patterns)
                    .map(PATH.dirname)
                    .reduce(function (dirs, dir) {
                    return dirs.add(dir);
                }, dirs_1);
            });
            // run one extractTask per folder where template is found
            dirs_1.forEach(function (dir) {
                var collections = _this._extract([dir], {
                    patterns: o.patterns.map(function (p) { return "/" + PATH.basename(p); })
                });
                _this._save(collections, o.output.map(function (ot) { return PATH.join(dir, ot, PATH.basename(dir) + ".[lang].[ext]"); }));
            });
        }
    };
    /**
     * Extract strings from input dirs using configured parsers
     */
    NgxTranslateExtractor.prototype._extract = function (input, options) {
        var _this = this;
        var collection = new ExtendedTranslationCollection_1.ExtendedTranslationCollection();
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
            var normalizedOutputs = outputs.map(function (ot) { return utils_1.normalizePath(ot, _this._compiler.extension, lang); });
            normalizedOutputs.forEach(function (o) {
                var collection = intersect(o, _this._compiler, collections[lang]);
                utils_1.save(collection, lang, _this.options.format, o);
            });
        };
        for (var _i = 0, _a = Object.keys(collections); _i < _a.length; _i++) {
            var lang = _a[_i];
            _loop_1(lang);
        }
    };
    return NgxTranslateExtractor;
}());
exports.NgxTranslateExtractor = NgxTranslateExtractor;
function intersect(path, compiler, collection) {
    if (collection === void 0) { collection = new ExtendedTranslationCollection_1.ExtendedTranslationCollection(); }
    var res = collection;
    if (PATH.extname(path) !== "." + compiler.extension) {
        return res;
    }
    if (!fs.existsSync(path)) {
        return res;
    }
    res = ExtendedTranslationCollection_1.ExtendedTranslationCollection.of(compiler.parse(fs.readFileSync(path, 'utf-8')));
    res = collection.union(res).intersect(collection);
    return res;
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9OZ3hUcmFuc2xhdGVFeHRyYWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxRkFJMEM7QUFDMUMsMEJBQTRCO0FBQzVCLDJCQUE2QjtBQUM3QixpQ0FBdUQ7QUFDdkQsdUJBQXlCO0FBQ3pCLG1EQUFrRDtBQUVsRCx1REFBcUQ7QUFDckQsa0ZBQWlGO0FBVWpGOztHQUVHO0FBQ0g7SUFLRSwrQkFBWSxPQUF3QjtRQUF4Qix3QkFBQSxFQUFBLFlBQXdCO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDakMsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsS0FBSztZQUNkLElBQUksRUFBRSxLQUFLO1lBQ1gsUUFBUSxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQztZQUNwQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDaEIsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2xCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQWdCLGlCQUFpQjtTQUM5QyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNuRSxNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFvQixPQUFPLENBQUMsTUFBTSxnQ0FBNkIsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ2QsSUFBSSw0Q0FBVSxFQUFFO1lBQ2hCLElBQUksaURBQWUsRUFBRTtZQUNyQixJQUFJLCtDQUFhLEVBQUU7WUFDbkIsSUFBSSx1QkFBVSxFQUFFO1NBQ2pCLENBQUM7UUFFRixJQUFJLENBQUMsU0FBUyxHQUFHLGtDQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ2xFLENBQUM7SUFFTSx1Q0FBTyxHQUFkLFVBQWUsU0FBb0I7UUFBbkMsaUJBZ0NDO1FBOUJDLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFjLENBQUM7UUFDOUIsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTO2FBQzlCLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBN0MsQ0FBNkMsQ0FBQztZQUMxRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUVaLGlEQUFpRDtRQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNqQyxtR0FBbUc7WUFDbkcsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxjQUFjLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDLENBQUM7UUFDN0UsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRU4sNkNBQTZDO1lBQzdDLElBQU0sTUFBSSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7WUFDL0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUc7Z0JBQ1gsTUFBTSxDQUFDLGVBQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztxQkFDNUIsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7cUJBQ2pCLE1BQU0sQ0FBQyxVQUFDLElBQWlCLEVBQUUsR0FBVztvQkFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLENBQUMsRUFBRSxNQUFJLENBQUMsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFDO1lBRUgseURBQXlEO1lBQ3pELE1BQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO2dCQUNkLElBQUksV0FBVyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDckMsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsTUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBRyxFQUF0QixDQUFzQixDQUFDO2lCQUN0RCxDQUFDLENBQUM7Z0JBQ0osS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsa0JBQWUsQ0FBQyxFQUF4RCxDQUF3RCxDQUFDLENBQUMsQ0FBQztZQUN2RyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDTyx3Q0FBUSxHQUFsQixVQUFtQixLQUFlLEVBQUUsT0FBb0M7UUFBeEUsaUJBaUJDO1FBaEJDLElBQUksVUFBVSxHQUFHLElBQUksNkRBQTZCLEVBQUUsQ0FBQztRQUNyRCxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUNmLGVBQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dCQUMvQyxJQUFNLFFBQVEsR0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDeEQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUF1QjtvQkFDNUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDaEUsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7WUFDdkMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVPLHFDQUFLLEdBQWIsVUFBYyxXQUE0RCxFQUFFLE9BQWlCO1FBQTdGLGlCQVVDO2dDQVJZLElBQUk7WUFFYixJQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxxQkFBYSxDQUFDLEVBQUUsRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBakQsQ0FBaUQsQ0FBQyxDQUFDO1lBQy9GLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7Z0JBQ3pCLElBQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkUsWUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUcsS0FBSSxDQUFDLE9BQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUQsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBUEQsR0FBRyxDQUFDLENBQWUsVUFBd0IsRUFBeEIsS0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUF4QixjQUF3QixFQUF4QixJQUF3QjtZQUF0QyxJQUFNLElBQUksU0FBQTtvQkFBSixJQUFJO1NBT2Q7SUFDSCxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQXBHQSxBQW9HQyxJQUFBO0FBcEdZLHNEQUFxQjtBQXNHbEMsbUJBQW1CLElBQVksRUFBRSxRQUEyQixFQUN6QyxVQUFnRDtJQUFoRCwyQkFBQSxFQUFBLGlCQUFpQiw2REFBNkIsRUFBRTtJQUNqRSxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUM7SUFFckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxNQUFJLFFBQVEsQ0FBQyxTQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDYixDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNELEdBQUcsR0FBRyw2REFBNkIsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkYsR0FBRyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDYixDQUFDIiwiZmlsZSI6Ik5neFRyYW5zbGF0ZUV4dHJhY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZVBhcnNlciwgRXh0cmFjdFRhc2tPcHRpb25zSW50ZXJmYWNlLFxuICBQYXJzZXJJbnRlcmZhY2UsIFBpcGVQYXJzZXIsXG4gIFNlcnZpY2VQYXJzZXJcbn0gZnJvbSAnLi9iaWVzYmplcmctbmd4LXRyYW5zbGF0ZS1leHRyYWN0J1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgUEFUSCBmcm9tICdwYXRoJztcbmltcG9ydCB7IG5vcm1hbGl6ZVBhdGgsIHJlYWREaXIsIHNhdmUgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IEkxOG5QYXJzZXIgfSBmcm9tICcuL3BhcnNlcnMvSTE4blBhcnNlcic7XG5pbXBvcnQgeyBDb21waWxlckludGVyZmFjZSB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0JztcbmltcG9ydCB7IENvbXBpbGVyRmFjdG9yeSB9IGZyb20gJy4vY29tcGlsZXIuZmFjdG9yeSc7XG5pbXBvcnQgeyBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB9IGZyb20gJy4vRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24gJztcblxuZXhwb3J0IGludGVyZmFjZSBOZ3hPcHRpb25zIGV4dGVuZHMgRXh0cmFjdFRhc2tPcHRpb25zSW50ZXJmYWNlIHtcbiAgaW5wdXQ/OiBzdHJpbmdbXTtcbiAgb3V0cHV0Pzogc3RyaW5nW107XG4gIHJlbGF0aXZlT3V0cHV0PzogYm9vbGVhbjtcbiAgZm9ybWF0PzogJ3BvJyB8ICdqc29uJyxcbiAgbGFuZ3VhZ2VzPzogWydlbiddXG59XG5cbi8qKlxuICogV3JhcHBlciBmb3IgRXh0cmFjdFRhc2sgd2l0aG91dCBnb2luZyB0aHJvdWdoIHRoZSBwcm92aWRlZCBjbGkuXG4gKi9cbmV4cG9ydCBjbGFzcyBOZ3hUcmFuc2xhdGVFeHRyYWN0b3Ige1xuICBfcGFyc2VyczogUGFyc2VySW50ZXJmYWNlW107XG4gIF9jb21waWxlcjogQ29tcGlsZXJJbnRlcmZhY2U7XG4gIG9wdGlvbnM6IE5neE9wdGlvbnM7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogTmd4T3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5vcHRpb25zID0gXy5kZWZhdWx0cyhvcHRpb25zLCB7XG4gICAgICBjbGVhbjogdHJ1ZSwgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBvYnNvbGV0ZSBzdHJpbmdzIHdoZW4gbWVyZ2luZ1xuICAgICAgcmVwbGFjZTogZmFsc2UsICAgICAgICAgICAgICAvLyBSZXBsYWNlIHRoZSBjb250ZW50cyBvZiBvdXRwdXQgZmlsZSBpZiBpdCBleGlzdHNcbiAgICAgIHNvcnQ6IGZhbHNlLCAgICAgICAgICAgICAgICAgLy8gU29ydCBzdHJpbmdzIGluIGFscGhhYmV0aWNhbCBvcmRlciB3aGVuIHNhdmluZ1xuICAgICAgcGF0dGVybnM6IFsnLyoqLyouaHRtbCcsICcvKiovKi50cyddLCAgICAvLyBFeHRyYWN0IHN0cmluZ3MgZnJvbSB0aGUgZm9sbG93aW5nIGZpbGUgcGF0dGVybnNcbiAgICAgIGlucHV0OiBbJy4vc3JjJ10sXG4gICAgICBvdXRwdXQ6IFsnLi9pMThuJ10sXG4gICAgICByZWxhdGl2ZTogdHJ1ZSxcbiAgICAgIGxhbmd1YWdlczogWydlbiddLFxuICAgICAgZm9ybWF0OiAncG8nICAgICAgICAgICAgICAgIC8vIGdldHRleHQgZm9ybWF0XG4gICAgfSk7XG4gICAgT2JqZWN0LnNlYWwodGhpcy5vcHRpb25zKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZm9ybWF0ICE9PSAncG8nICYmIHRoaXMub3B0aW9ucy5mb3JtYXQgIT09ICdqc29uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgaW52YWxpZCBmb3JtYXQgOiAke29wdGlvbnMuZm9ybWF0fS4gVmFsaWQgZm9ybWF0IGFyZSBqc29uLCBwb2ApO1xuICAgIH1cblxuICAgIHRoaXMuX3BhcnNlcnMgPSBbXG4gICAgICBuZXcgUGlwZVBhcnNlcigpLFxuICAgICAgbmV3IERpcmVjdGl2ZVBhcnNlcigpLFxuICAgICAgbmV3IFNlcnZpY2VQYXJzZXIoKSxcbiAgICAgIG5ldyBJMThuUGFyc2VyKClcbiAgICBdO1xuXG4gICAgdGhpcy5fY29tcGlsZXIgPSBDb21waWxlckZhY3RvcnkuY3JlYXRlKHRoaXMub3B0aW9ucy5mb3JtYXQsIHt9KVxuICB9XG5cbiAgcHVibGljIGV4ZWN1dGUoZmlsZW5hbWVzPzogc3RyaW5nW10pIHtcblxuICAgIGNvbnN0IG8gPSB0aGlzLm9wdGlvbnMgYXMgYW55O1xuICAgIGNvbnN0IGlucHV0ID0gZmlsZW5hbWVzID8gZmlsZW5hbWVzXG4gICAgICAgIC5tYXAoZiA9PiBmcy5zdGF0U3luYyhmKS5pc0ZpbGUoKSA/IFBBVEguZGlybmFtZShmKSA6IGYpXG4gICAgICA6IG8uaW5wdXQ7XG5cbiAgICAvLyBpZiBvdXRwdXQgc3BlY2lmaWVkLCBydW4gRXh0cmFjdFRhc2sgYXMgbm9ybWFsXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMucmVsYXRpdmVPdXRwdXQpIHtcbiAgICAgIC8vIG5neC10cmFuc2xhdGUtZXh0cmFjdCAtLWlucHV0ICBgaW5wdXRgIC0tb3V0cHV0IGBvdXRwdXRgIC0tY2xlYW4gLS1zb3J0IC0tZm9ybWF0IG5hbWVzcGFjZWQtanNvblxuICAgICAgbGV0IGNvbGxlY3Rpb25zID0gdGhpcy5fZXh0cmFjdChpbnB1dCwgbyk7XG4gICAgICB0aGlzLl9zYXZlKGNvbGxlY3Rpb25zLCBvLm91dHB1dC5tYXAob3QgPT4gUEFUSC5qb2luKG90LCBgW2xhbmddLltleHRdYCkpKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBsaXN0IGFsbCBmaWxlcyBmb3VuZCB0aGF0IG1hdGNoZXMgdGVtcGxhdGVcbiAgICAgIGNvbnN0IGRpcnMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgIGlucHV0Lm1hcChkaXIgPT4ge1xuICAgICAgICByZXR1cm4gcmVhZERpcihkaXIsIG8ucGF0dGVybnMpXG4gICAgICAgICAgLm1hcChQQVRILmRpcm5hbWUpXG4gICAgICAgICAgLnJlZHVjZSgoZGlyczogU2V0PHN0cmluZz4sIGRpcjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZGlycy5hZGQoZGlyKTtcbiAgICAgICAgICB9LCBkaXJzKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBydW4gb25lIGV4dHJhY3RUYXNrIHBlciBmb2xkZXIgd2hlcmUgdGVtcGxhdGUgaXMgZm91bmRcbiAgICAgIGRpcnMuZm9yRWFjaChkaXIgPT4ge1xuICAgICAgICBsZXQgY29sbGVjdGlvbnMgPSB0aGlzLl9leHRyYWN0KFtkaXJdLCB7XG4gICAgICAgICAgcGF0dGVybnM6IG8ucGF0dGVybnMubWFwKHAgPT4gYC8ke1BBVEguYmFzZW5hbWUocCl9YClcbiAgICAgICAgfSk7XG4gICAgICAgdGhpcy5fc2F2ZShjb2xsZWN0aW9ucywgby5vdXRwdXQubWFwKG90ID0+IFBBVEguam9pbihkaXIsIG90LCBgJHtQQVRILmJhc2VuYW1lKGRpcil9LltsYW5nXS5bZXh0XWApKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdCBzdHJpbmdzIGZyb20gaW5wdXQgZGlycyB1c2luZyBjb25maWd1cmVkIHBhcnNlcnNcbiAgICovXG4gIHByb3RlY3RlZCBfZXh0cmFjdChpbnB1dDogc3RyaW5nW10sIG9wdGlvbnM6IEV4dHJhY3RUYXNrT3B0aW9uc0ludGVyZmFjZSk6IHtbbGFuZzpzdHJpbmddOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbn0ge1xuICAgIGxldCBjb2xsZWN0aW9uID0gbmV3IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uKCk7XG4gICAgaW5wdXQuZm9yRWFjaChkaXIgPT4ge1xuICAgICAgcmVhZERpcihkaXIsIG9wdGlvbnMucGF0dGVybnMgfHwgW10pLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRzOiBzdHJpbmcgPSBmcy5yZWFkRmlsZVN5bmMocGF0aCwgJ3V0Zi04Jyk7XG4gICAgICAgIHRoaXMuX3BhcnNlcnMuZm9yRWFjaCgocGFyc2VyOiBQYXJzZXJJbnRlcmZhY2UpID0+IHtcbiAgICAgICAgICBjb2xsZWN0aW9uID0gY29sbGVjdGlvbi51bmlvbihwYXJzZXIuZXh0cmFjdChjb250ZW50cywgcGF0aCkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbnMgPSB7fTtcbiAgICAodGhpcy5vcHRpb25zIGFzIGFueSkubGFuZ3VhZ2VzLmZvckVhY2gobCA9PiB7XG4gICAgICBjb2xsZWN0aW9uc1tsXSA9IGNvbGxlY3Rpb247XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29sbGVjdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIF9zYXZlKGNvbGxlY3Rpb25zOiB7W2xhbmc6IHN0cmluZ106IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9ufSwgb3V0cHV0czogc3RyaW5nW10pOiBhbnkge1xuXG4gICAgZm9yIChjb25zdCBsYW5nIG9mIE9iamVjdC5rZXlzKGNvbGxlY3Rpb25zKSkge1xuXG4gICAgICBjb25zdCBub3JtYWxpemVkT3V0cHV0cyA9IG91dHB1dHMubWFwKG90ID0+IG5vcm1hbGl6ZVBhdGgob3QsIHRoaXMuX2NvbXBpbGVyLmV4dGVuc2lvbiwgbGFuZykpO1xuICAgICAgbm9ybWFsaXplZE91dHB1dHMuZm9yRWFjaChvID0+IHtcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbiA9IGludGVyc2VjdChvLCB0aGlzLl9jb21waWxlciwgY29sbGVjdGlvbnNbbGFuZ10pO1xuICAgICAgICBzYXZlKGNvbGxlY3Rpb24sIGxhbmcsICh0aGlzLm9wdGlvbnMgYXMgYW55KS5mb3JtYXQsIG8pO1xuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaW50ZXJzZWN0KHBhdGg6IHN0cmluZywgY29tcGlsZXI6IENvbXBpbGVySW50ZXJmYWNlLFxuICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24gPSBuZXcgRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24oKSk6IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uIHtcbiAgbGV0IHJlcyA9IGNvbGxlY3Rpb247XG5cbiAgaWYgKFBBVEguZXh0bmFtZShwYXRoKSAhPT0gYC4ke2NvbXBpbGVyLmV4dGVuc2lvbn1gKSB7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBpZiAoIWZzLmV4aXN0c1N5bmMocGF0aCkpIHtcbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIHJlcyA9IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uLm9mKGNvbXBpbGVyLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhwYXRoLCAndXRmLTgnKSkpO1xuICByZXMgPSBjb2xsZWN0aW9uLnVuaW9uKHJlcykuaW50ZXJzZWN0KGNvbGxlY3Rpb24pO1xuICByZXR1cm4gcmVzO1xufVxuIl19
