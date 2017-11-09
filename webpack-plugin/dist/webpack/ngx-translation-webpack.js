"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NgxTranslateExtractor_1 = require("../NgxTranslateExtractor");
var _ = require("lodash");
var ExtractorPlugin_1 = require("./ExtractorPlugin");
var MergerPlugin_1 = require("./MergerPlugin");
/**
 *
 */
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
            this.ts = {
                apply: function (compiler) {
                    compiler.plugin('compile', function (compilation) {
                        // TODO extract translations from TS.
                        throw new Error('not implemented');
                    });
                }
            };
        }
        return Extractor;
    }());
    TranslatePlugin.Extractor = Extractor;
    TranslatePlugin.Merger = MergerPlugin_1.MergerPlugin;
})(TranslatePlugin = exports.TranslatePlugin || (exports.TranslatePlugin = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrL25neC10cmFuc2xhdGlvbi13ZWJwYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esa0VBQWlFO0FBQ2pFLDBCQUE0QjtBQUU1QixxREFBb0Q7QUFDcEQsK0NBQThDO0FBRTlDOztHQUVHO0FBQ0gsSUFBaUIsZUFBZSxDQWdEL0I7QUFoREQsV0FBaUIsZUFBZTtJQWM5Qjs7T0FFRztJQUNIO1FBS0UsbUJBQVksT0FBOEI7WUFBOUIsd0JBQUEsRUFBQSxZQUE4QjtZQUN4QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUNBQWUsQ0FBQyxJQUFJLDZDQUFxQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUN6RSxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVMLElBQUksQ0FBQyxFQUFFLEdBQUc7Z0JBQ1IsS0FBSyxFQUFFLFVBQUMsUUFBa0I7b0JBQ3hCLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQUEsV0FBVzt3QkFDcEMscUNBQXFDO3dCQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUE7b0JBQ3BDLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7YUFDRixDQUFDO1lBRUYsSUFBSSxDQUFDLEVBQUUsR0FBRztnQkFDUixLQUFLLEVBQUUsVUFBQyxRQUFrQjtvQkFDeEIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBQSxXQUFXO3dCQUNwQyxxQ0FBcUM7d0JBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtvQkFDcEMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQzthQUNGLENBQUM7UUFDSixDQUFDO1FBQ0gsZ0JBQUM7SUFBRCxDQTVCQSxBQTRCQyxJQUFBO0lBNUJZLHlCQUFTLFlBNEJyQixDQUFBO0lBRVksc0JBQU0sR0FBRywyQkFBWSxDQUFDO0FBQ3JDLENBQUMsRUFoRGdCLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBZ0QvQiIsImZpbGUiOiJ3ZWJwYWNrL25neC10cmFuc2xhdGlvbi13ZWJwYWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcGlsZXIsIFBsdWdpbiB9IGZyb20gJ3dlYnBhY2snO1xuaW1wb3J0IHsgTmd4VHJhbnNsYXRlRXh0cmFjdG9yIH0gZnJvbSAnLi4vTmd4VHJhbnNsYXRlRXh0cmFjdG9yJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE5neFRyYW5zbGF0ZU1lcmdlciB9IGZyb20gJy4uL05neFRyYW5zbGF0ZU1lcmdlcic7XG5pbXBvcnQgeyBFeHRyYWN0b3JQbHVnaW4gfSBmcm9tICcuL0V4dHJhY3RvclBsdWdpbic7XG5pbXBvcnQgeyBNZXJnZXJQbHVnaW4gfSBmcm9tICcuL01lcmdlclBsdWdpbic7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2xhdGVQbHVnaW4ge1xuXG4gIGV4cG9ydCBpbnRlcmZhY2UgRXh0cmFjdG9yT3B0aW9ucyB7XG4gICAgaW5wdXQ/OiBzdHJpbmdbXTsgICAgICAgICAvLyBwYXRoIHRvIHNlYXJjaCBmb3IgdHJhbnNsYXRpb25zIHRvIGV4dHJhY3RcbiAgICBvdXRwdXQ/OiBzdHJpbmdbXTsgICAgICAgIC8vIHdoZXJlIHRvIHN0b3JlIHRyYW5zbGF0aW9ucyBmaWxlc1xuICAgIGZvcm1hdD86ICdqc29uJyB8ICdwbycsICAgLy8gb3V0cHV0IGZvcm1hdFxuICAgIHJlbGF0aXZlT3V0cHV0PzogYm9vbGVhbjsgLy8gaWYgc2V0IHRvIHRydWUsIG91dHB1dCByZWxhdGl2ZSB0byBmaWxlcyB3aGVyZSB0cmFuc2xhdGlvbnMgaGF2ZSBiZWVuIGV4dHJhY3RlZFxuICAgIGxhbmd1YWdlcz86IHN0cmluZ1tdOyAgICAgLy8gZm9yIHdoaWNoIGxhbmd1YWdlcyBzaG91bGQgZ2VuZXJhdGUgZmlsZXMgP1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBNZXJnZXJPcHRpb25zIGV4dGVuZHMgTmd4VHJhbnNsYXRlTWVyZ2VyLk1lcmdlck9wdGlvbnMge1xuICAgIGVtaXRPbmx5PzogYm9vbGVhbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBPZmZlcnMgZXh0cmFjdGlvbiBvZiB0cmFuc2xhdGlvbnMgZnJvbSBIVE1MICYgSlMsIHdoZW4gY29tcGlsaW5nIHRoZSBzb3VyY2VzLlxuICAgKi9cbiAgZXhwb3J0IGNsYXNzIEV4dHJhY3RvciB7XG4gICAgcHVibGljIGh0bWw6IFBsdWdpbjtcbiAgICBwdWJsaWMganM6IFBsdWdpbjtcbiAgICBwdWJsaWMgdHM6IFBsdWdpbjtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEV4dHJhY3Rvck9wdGlvbnMgPSB7fSkge1xuICAgICAgdGhpcy5odG1sID0gbmV3IEV4dHJhY3RvclBsdWdpbihuZXcgTmd4VHJhbnNsYXRlRXh0cmFjdG9yKF8ubWVyZ2Uob3B0aW9ucywge1xuICAgICAgICBwYXR0ZXJuczogWycvKiovKi5odG1sJ11cbiAgICAgIH0pKSk7XG5cbiAgICAgIHRoaXMuanMgPSB7XG4gICAgICAgIGFwcGx5OiAoY29tcGlsZXI6IENvbXBpbGVyKSA9PiB7XG4gICAgICAgICAgY29tcGlsZXIucGx1Z2luKCdjb21waWxlJywgY29tcGlsYXRpb24gPT4ge1xuICAgICAgICAgICAgLy8gVE9ETyBleHRyYWN0IHRyYW5zbGF0aW9ucyBmcm9tIEpTLlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3QgaW1wbGVtZW50ZWQnKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB0aGlzLnRzID0ge1xuICAgICAgICBhcHBseTogKGNvbXBpbGVyOiBDb21waWxlcikgPT4ge1xuICAgICAgICAgIGNvbXBpbGVyLnBsdWdpbignY29tcGlsZScsIGNvbXBpbGF0aW9uID0+IHtcbiAgICAgICAgICAgIC8vIFRPRE8gZXh0cmFjdCB0cmFuc2xhdGlvbnMgZnJvbSBUUy5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGltcGxlbWVudGVkJylcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBleHBvcnQgY29uc3QgTWVyZ2VyID0gTWVyZ2VyUGx1Z2luO1xufVxuXG4iXX0=
