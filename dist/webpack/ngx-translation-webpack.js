"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NgxTranslateExtractor_1 = require("../NgxTranslateExtractor");
var _ = require("lodash");
var ExtractorPlugin_1 = require("./ExtractorPlugin");
var InjectorPlugin_1 = require("./InjectorPlugin");
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
        }
        return Extractor;
    }());
    TranslatePlugin.Extractor = Extractor;
    TranslatePlugin.Injector = InjectorPlugin_1.InjectorPlugin;
})(TranslatePlugin = exports.TranslatePlugin || (exports.TranslatePlugin = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrL25neC10cmFuc2xhdGlvbi13ZWJwYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esa0VBQWlFO0FBQ2pFLDBCQUE0QjtBQUU1QixxREFBb0Q7QUFDcEQsbURBQWtEO0FBRWxEOztHQUVHO0FBQ0gsSUFBaUIsZUFBZSxDQXFDL0I7QUFyQ0QsV0FBaUIsZUFBZTtJQVk5Qjs7T0FFRztJQUNIO1FBSUUsbUJBQVksT0FBOEI7WUFBOUIsd0JBQUEsRUFBQSxZQUE4QjtZQUN4QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUNBQWUsQ0FBQyxJQUFJLDZDQUFxQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUN6RSxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVMLElBQUksQ0FBQyxFQUFFLEdBQUc7Z0JBQ1IsS0FBSyxFQUFFLFVBQUMsUUFBa0I7b0JBQ3hCLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQUEsV0FBVzt3QkFDcEMscUNBQXFDO3dCQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUE7b0JBQ3BDLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7YUFDRixDQUFBO1FBQ0gsQ0FBQztRQUNILGdCQUFDO0lBQUQsQ0FsQkEsQUFrQkMsSUFBQTtJQWxCWSx5QkFBUyxZQWtCckIsQ0FBQTtJQUVZLHdCQUFRLEdBQUcsK0JBQWMsQ0FBQztBQUV6QyxDQUFDLEVBckNnQixlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQXFDL0IiLCJmaWxlIjoid2VicGFjay9uZ3gtdHJhbnNsYXRpb24td2VicGFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBpbGVyLCBQbHVnaW4gfSBmcm9tICd3ZWJwYWNrJztcbmltcG9ydCB7IE5neFRyYW5zbGF0ZUV4dHJhY3RvciB9IGZyb20gJy4uL05neFRyYW5zbGF0ZUV4dHJhY3Rvcic7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBOZ3hUcmFuc2xhdGVNZXJnZXIgfSBmcm9tICcuLi9OZ3hUcmFuc2xhdGVNZXJnZXInO1xuaW1wb3J0IHsgRXh0cmFjdG9yUGx1Z2luIH0gZnJvbSAnLi9FeHRyYWN0b3JQbHVnaW4nO1xuaW1wb3J0IHsgSW5qZWN0b3JQbHVnaW4gfSBmcm9tICcuL0luamVjdG9yUGx1Z2luJztcblxuLyoqXG4gKlxuICovXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zbGF0ZVBsdWdpbiB7XG5cbiAgZXhwb3J0IGludGVyZmFjZSBFeHRyYWN0b3JPcHRpb25zIHtcbiAgICBpbnB1dD86IHN0cmluZ1tdOyAgICAgICAgIC8vIHBhdGggdG8gc2VhcmNoIGZvciB0cmFuc2xhdGlvbnMgdG8gZXh0cmFjdFxuICAgIG91dHB1dD86IHN0cmluZ1tdOyAgICAgICAgLy8gd2hlcmUgdG8gc3RvcmUgdHJhbnNsYXRpb25zIGZpbGVzXG4gICAgZm9ybWF0PzogJ2pzb24nIHwgJ3BvJywgICAvLyBvdXRwdXQgZm9ybWF0XG4gICAgcmVsYXRpdmVPdXRwdXQ/OiBib29sZWFuOyAvLyBpZiBzZXQgdG8gdHJ1ZSwgb3V0cHV0IHJlbGF0aXZlIHRvIGZpbGVzIHdoZXJlIHRyYW5zbGF0aW9ucyBoYXZlIGJlZW4gZXh0cmFjdGVkXG4gICAgbGFuZ3VhZ2VzPzogc3RyaW5nW107ICAgICAvLyBmb3Igd2hpY2ggbGFuZ3VhZ2VzIHNob3VsZCBnZW5lcmF0ZSBmaWxlcyA/XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEluamVjdG9yT3B0aW9ucyBleHRlbmRzIE5neFRyYW5zbGF0ZU1lcmdlci5NZXJnZXJPcHRpb25zIHt9XG5cbiAgLyoqXG4gICAqIE9mZmVycyBleHRyYWN0aW9uIG9mIHRyYW5zbGF0aW9ucyBmcm9tIEhUTUwgJiBKUywgd2hlbiBjb21waWxpbmcgdGhlIHNvdXJjZXMuXG4gICAqL1xuICBleHBvcnQgY2xhc3MgRXh0cmFjdG9yIHtcbiAgICBwdWJsaWMgaHRtbDogUGx1Z2luO1xuICAgIHB1YmxpYyBqczogUGx1Z2luO1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogRXh0cmFjdG9yT3B0aW9ucyA9IHt9KSB7XG4gICAgICB0aGlzLmh0bWwgPSBuZXcgRXh0cmFjdG9yUGx1Z2luKG5ldyBOZ3hUcmFuc2xhdGVFeHRyYWN0b3IoXy5tZXJnZShvcHRpb25zLCB7XG4gICAgICAgIHBhdHRlcm5zOiBbJy8qKi8qLmh0bWwnXVxuICAgICAgfSkpKTtcblxuICAgICAgdGhpcy5qcyA9IHtcbiAgICAgICAgYXBwbHk6IChjb21waWxlcjogQ29tcGlsZXIpID0+IHtcbiAgICAgICAgICBjb21waWxlci5wbHVnaW4oJ2NvbXBpbGUnLCBjb21waWxhdGlvbiA9PiB7XG4gICAgICAgICAgICAvLyBUT0RPIGV4dHJhY3QgdHJhbnNsYXRpb25zIGZyb20gSlMuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBpbXBsZW1lbnRlZCcpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBleHBvcnQgY29uc3QgSW5qZWN0b3IgPSBJbmplY3RvclBsdWdpbjtcblxufVxuXG4iXX0=
