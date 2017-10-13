"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NgxTranslateExtractor_1 = require("./NgxTranslateExtractor");
var _ = require("lodash");
var NgxTranslateMerger_1 = require("./NgxTranslateMerger");
var ExtractorPlugin_1 = require("./ExtractorPlugin");
var TranslatePlugin;
(function (TranslatePlugin) {
    /**
     * Offers extraction of translations from HTML & JS, when compiling the sources.
     */
    var Extractor = /** @class */ (function () {
        function Extractor(options) {
            if (options === void 0) { options = {}; }
            this.html = new ExtractorPlugin_1.ExtractorPlugin(new NgxTranslateExtractor_1.NgxTranslateExtractor(_.merge(options, {
                patterns: ['/**/*.html']
            })));
            this.js = {
                apply: function (compiler) {
                    compiler.plugin('compile', function (compilation) {
                        // TODO extract translations from JS.
                        throw new Error('not implemented');
                    });
                }
            };
        }
        return Extractor;
    }());
    TranslatePlugin.Extractor = Extractor;
    /**
     * Offers injection of any previously extracted translation.
     */
    var Injector = /** @class */ (function () {
        function Injector(options) {
            options = options || {};
            // void output, and rather emit to webpack bundle
            this._emit = _.defaults(options.output, ['assets/i18n/[lang].[ext]']);
            options.output = [];
            this._merger = new NgxTranslateMerger_1.NgxTranslateMerger(options);
        }
        Injector.prototype.apply = function (compiler) {
            var _this = this;
            compiler.plugin('emit', function (compilation, callback) {
                _this._merger.execute();
                var format = _this._merger.getFormat();
                var output = _this._merger.translations;
                Object.keys(output)
                    .forEach(function (lang) {
                    var translationStr = JSON.stringify(output[lang].values);
                    // emit translation files to bundle
                    _this._emit.forEach(function (emit) {
                        var filename = emit
                            .replace('[lang]', "" + lang)
                            .replace('[ext]', "" + format);
                        compilation.assets["" + filename] = {
                            source: function () { return translationStr; },
                            size: function () { return translationStr.length; }
                        };
                    });
                });
                callback();
            });
        };
        return Injector;
    }());
    TranslatePlugin.Injector = Injector;
})(TranslatePlugin = exports.TranslatePlugin || (exports.TranslatePlugin = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrL25neC10cmFuc2xhdGlvbi13ZWJwYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsaUVBQWdFO0FBQ2hFLDBCQUE0QjtBQUM1QiwyREFBMEQ7QUFDMUQscURBQW9EO0FBRXBELElBQWlCLGVBQWUsQ0E0RS9CO0FBNUVELFdBQWlCLGVBQWU7SUFZOUI7O09BRUc7SUFDSDtRQUlFLG1CQUFZLE9BQThCO1lBQTlCLHdCQUFBLEVBQUEsWUFBOEI7WUFDeEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGlDQUFlLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDekUsUUFBUSxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFTCxJQUFJLENBQUMsRUFBRSxHQUFHO2dCQUNSLEtBQUssRUFBRSxVQUFDLFFBQWtCO29CQUN4QixRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFBLFdBQVc7d0JBQ3BDLHFDQUFxQzt3QkFDckMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO29CQUNwQyxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2FBQ0YsQ0FBQTtRQUNILENBQUM7UUFDSCxnQkFBQztJQUFELENBbEJBLEFBa0JDLElBQUE7SUFsQlkseUJBQVMsWUFrQnJCLENBQUE7SUFFRDs7T0FFRztJQUNIO1FBR0Usa0JBQVksT0FBeUI7WUFDbkMsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7WUFFeEIsaURBQWlEO1lBQ2pELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBRUQsd0JBQUssR0FBTCxVQUFNLFFBQWtCO1lBQXhCLGlCQXdCQztZQXZCQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFDLFdBQVcsRUFBRSxRQUFRO2dCQUM1QyxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN2QixJQUFNLE1BQU0sR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUN4QyxJQUFNLE1BQU0sR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztnQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7cUJBQ2hCLE9BQU8sQ0FBQyxVQUFBLElBQUk7b0JBQ1gsSUFBTSxjQUFjLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBRW5FLG1DQUFtQztvQkFDbkMsS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO3dCQUNyQixJQUFNLFFBQVEsR0FBRyxJQUFJOzZCQUNsQixPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUcsSUFBTSxDQUFDOzZCQUM1QixPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUcsTUFBUSxDQUFDLENBQUM7d0JBRWpDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBRyxRQUFVLENBQUMsR0FBRzs0QkFDbEMsTUFBTSxFQUFFLGNBQU0sT0FBQSxjQUFjLEVBQWQsQ0FBYzs0QkFDNUIsSUFBSSxFQUFFLGNBQU0sT0FBQSxjQUFjLENBQUMsTUFBTSxFQUFyQixDQUFxQjt5QkFDbEMsQ0FBQTtvQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQztnQkFFSCxRQUFRLEVBQUUsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNILGVBQUM7SUFBRCxDQXJDQSxBQXFDQyxJQUFBO0lBckNZLHdCQUFRLFdBcUNwQixDQUFBO0FBQ0gsQ0FBQyxFQTVFZ0IsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUE0RS9CIiwiZmlsZSI6IndlYnBhY2svbmd4LXRyYW5zbGF0aW9uLXdlYnBhY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21waWxlciwgUGx1Z2luIH0gZnJvbSAnd2VicGFjayc7XG5pbXBvcnQgeyBOZ3hUcmFuc2xhdGVFeHRyYWN0b3IgfSBmcm9tICcuL05neFRyYW5zbGF0ZUV4dHJhY3Rvcic7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBOZ3hUcmFuc2xhdGVNZXJnZXIgfSBmcm9tICcuL05neFRyYW5zbGF0ZU1lcmdlcic7XG5pbXBvcnQgeyBFeHRyYWN0b3JQbHVnaW4gfSBmcm9tICcuL0V4dHJhY3RvclBsdWdpbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNsYXRlUGx1Z2luIHtcblxuICBleHBvcnQgaW50ZXJmYWNlIEV4dHJhY3Rvck9wdGlvbnMge1xuICAgIGlucHV0Pzogc3RyaW5nW107ICAgICAgICAgLy8gcGF0aCB0byBzZWFyY2ggZm9yIHRyYW5zbGF0aW9ucyB0byBleHRyYWN0XG4gICAgb3V0cHV0Pzogc3RyaW5nW107ICAgICAgICAvLyB3aGVyZSB0byBzdG9yZSB0cmFuc2xhdGlvbnMgZmlsZXNcbiAgICBmb3JtYXQ/OiAnanNvbicgfCAncG8nLCAgIC8vIG91dHB1dCBmb3JtYXRcbiAgICByZWxhdGl2ZU91dHB1dD86IGJvb2xlYW47IC8vIGlmIHNldCB0byB0cnVlLCBvdXRwdXQgcmVsYXRpdmUgdG8gZmlsZXMgd2hlcmUgdHJhbnNsYXRpb25zIGhhdmUgYmVlbiBleHRyYWN0ZWRcbiAgICBsYW5ndWFnZXM/OiBzdHJpbmdbXTsgICAgIC8vIGZvciB3aGljaCBsYW5ndWFnZXMgc2hvdWxkIGdlbmVyYXRlIGZpbGVzID9cbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0b3JPcHRpb25zIGV4dGVuZHMgTmd4VHJhbnNsYXRlTWVyZ2VyLk1lcmdlck9wdGlvbnMge31cblxuICAvKipcbiAgICogT2ZmZXJzIGV4dHJhY3Rpb24gb2YgdHJhbnNsYXRpb25zIGZyb20gSFRNTCAmIEpTLCB3aGVuIGNvbXBpbGluZyB0aGUgc291cmNlcy5cbiAgICovXG4gIGV4cG9ydCBjbGFzcyBFeHRyYWN0b3Ige1xuICAgIHB1YmxpYyBodG1sOiBQbHVnaW47XG4gICAgcHVibGljIGpzOiBQbHVnaW47XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBFeHRyYWN0b3JPcHRpb25zID0ge30pIHtcbiAgICAgIHRoaXMuaHRtbCA9IG5ldyBFeHRyYWN0b3JQbHVnaW4obmV3IE5neFRyYW5zbGF0ZUV4dHJhY3RvcihfLm1lcmdlKG9wdGlvbnMsIHtcbiAgICAgICAgcGF0dGVybnM6IFsnLyoqLyouaHRtbCddXG4gICAgICB9KSkpO1xuXG4gICAgICB0aGlzLmpzID0ge1xuICAgICAgICBhcHBseTogKGNvbXBpbGVyOiBDb21waWxlcikgPT4ge1xuICAgICAgICAgIGNvbXBpbGVyLnBsdWdpbignY29tcGlsZScsIGNvbXBpbGF0aW9uID0+IHtcbiAgICAgICAgICAgIC8vIFRPRE8gZXh0cmFjdCB0cmFuc2xhdGlvbnMgZnJvbSBKUy5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGltcGxlbWVudGVkJylcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPZmZlcnMgaW5qZWN0aW9uIG9mIGFueSBwcmV2aW91c2x5IGV4dHJhY3RlZCB0cmFuc2xhdGlvbi5cbiAgICovXG4gIGV4cG9ydCBjbGFzcyBJbmplY3RvciB7XG4gICAgX2VtaXQ6IHN0cmluZ1tdO1xuICAgIF9tZXJnZXI6IE5neFRyYW5zbGF0ZU1lcmdlcjtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zPzogSW5qZWN0b3JPcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgLy8gdm9pZCBvdXRwdXQsIGFuZCByYXRoZXIgZW1pdCB0byB3ZWJwYWNrIGJ1bmRsZVxuICAgICAgdGhpcy5fZW1pdCA9IF8uZGVmYXVsdHMob3B0aW9ucy5vdXRwdXQsIFsnYXNzZXRzL2kxOG4vW2xhbmddLltleHRdJ10pO1xuICAgICAgb3B0aW9ucy5vdXRwdXQgPSBbXTtcbiAgICAgIHRoaXMuX21lcmdlciA9IG5ldyBOZ3hUcmFuc2xhdGVNZXJnZXIob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgYXBwbHkoY29tcGlsZXI6IENvbXBpbGVyKSB7XG4gICAgICBjb21waWxlci5wbHVnaW4oJ2VtaXQnLCAoY29tcGlsYXRpb24sIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIHRoaXMuX21lcmdlci5leGVjdXRlKCk7XG4gICAgICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMuX21lcmdlci5nZXRGb3JtYXQoKTtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gdGhpcy5fbWVyZ2VyLnRyYW5zbGF0aW9ucztcbiAgICAgICAgT2JqZWN0LmtleXMob3V0cHV0KVxuICAgICAgICAgIC5mb3JFYWNoKGxhbmcgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRpb25TdHI6IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KG91dHB1dFtsYW5nXS52YWx1ZXMpO1xuXG4gICAgICAgICAgICAvLyBlbWl0IHRyYW5zbGF0aW9uIGZpbGVzIHRvIGJ1bmRsZVxuICAgICAgICAgICAgdGhpcy5fZW1pdC5mb3JFYWNoKGVtaXQgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBmaWxlbmFtZSA9IGVtaXRcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgnW2xhbmddJywgYCR7bGFuZ31gKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKCdbZXh0XScsIGAke2Zvcm1hdH1gKTtcblxuICAgICAgICAgICAgICBjb21waWxhdGlvbi5hc3NldHNbYCR7ZmlsZW5hbWV9YF0gPSB7XG4gICAgICAgICAgICAgICAgc291cmNlOiAoKSA9PiB0cmFuc2xhdGlvblN0cixcbiAgICAgICAgICAgICAgICBzaXplOiAoKSA9PiB0cmFuc2xhdGlvblN0ci5sZW5ndGhcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuIl19
