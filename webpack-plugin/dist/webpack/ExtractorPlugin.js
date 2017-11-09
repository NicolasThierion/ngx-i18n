"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globToRegExp = require("glob-to-regexp");
var utils_1 = require("../utils");
/**
 * Webpack plugin that extracts translation from any file, using NgxTranslateExtractor.
 */
var ExtractorPlugin = /** @class */ (function () {
    function ExtractorPlugin(extractor) {
        this.fileTimestamps = {};
        this.extractor = extractor;
    }
    ExtractorPlugin.prototype.apply = function (compiler) {
        var _this = this;
        compiler.plugin('compile', function (compilation) {
            if (!_this.compiled) {
                _this.extractor.execute();
            }
            _this.compiled = true;
        });
        compiler.plugin('emit', function (compilation, done) {
            // filter changed files to only keep those which can contain new translations.
            var changedFiles = Object.keys(compilation.fileTimestamps)
                .filter(function (watchfile) { return (_this.fileTimestamps[watchfile] || Infinity) < (compilation.fileTimestamps[watchfile] || Infinity); })
                .filter(function (f) {
                return (_this.extractor.options.patterns || [])
                    .map(globToRegExp)
                    .map(function (r) { return !!f.match(r); })
                    .reduce(function (acc, v) { return acc || v; }, false);
            });
            // update file change timestamp
            _this.fileTimestamps = compilation.fileTimestamps;
            // trigger new extraction
            if (changedFiles.length) {
                _this.extractor.execute(changedFiles);
            }
            // watch newly created files
            var o = _this.extractor.options;
            var extractedFiles = o.input.reduce(function (inputs, i) {
                return inputs.concat(utils_1.readDir(i, ["**/*." + o.format]));
            }, []);
            compilation.fileDependencies = compilation.fileDependencies.concat(extractedFiles);
            done();
        });
    };
    return ExtractorPlugin;
}());
exports.ExtractorPlugin = ExtractorPlugin;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrL0V4dHJhY3RvclBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE4QztBQUc5QyxrQ0FBbUM7QUFFbkM7O0dBRUc7QUFDSDtJQUtFLHlCQUFZLFNBQWdDO1FBRnBDLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBRzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFRCwrQkFBSyxHQUFMLFVBQU0sUUFBa0I7UUFBeEIsaUJBcUNDO1FBcENDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQUMsV0FBVztZQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNCLENBQUM7WUFDRCxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFVBQUMsV0FBVyxFQUFFLElBQUk7WUFFeEMsOEVBQThFO1lBQzlFLElBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQztpQkFDekQsTUFBTSxDQUFDLFVBQUEsU0FBUyxJQUFJLE9BQUEsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUMsRUFBbEcsQ0FBa0csQ0FBQztpQkFDdkgsTUFBTSxDQUFDLFVBQUEsQ0FBQztnQkFDUCxNQUFNLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO3FCQUMzQyxHQUFHLENBQUMsWUFBWSxDQUFDO3FCQUNqQixHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFXLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQztxQkFDaEMsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUMsSUFBSyxPQUFBLEdBQUcsSUFBSSxDQUFDLEVBQVIsQ0FBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1lBRUwsK0JBQStCO1lBQy9CLEtBQUksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQztZQUVqRCx5QkFBeUI7WUFDekIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7WUFFRCw0QkFBNEI7WUFDNUIsSUFBTSxDQUFDLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFjLENBQUM7WUFDeEMsSUFBTSxjQUFjLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxNQUFNLEVBQUUsQ0FBQztnQkFDOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBTyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVEsQ0FBQyxDQUFDLE1BQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN4RCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDUCxXQUFXLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUVuRixJQUFJLEVBQUUsQ0FBQTtRQUNSLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0EvQ0EsQUErQ0MsSUFBQTtBQS9DWSwwQ0FBZSIsImZpbGUiOiJ3ZWJwYWNrL0V4dHJhY3RvclBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGdsb2JUb1JlZ0V4cCBmcm9tICdnbG9iLXRvLXJlZ2V4cCdcbmltcG9ydCB7IENvbXBpbGVyLCBQbHVnaW4gfSBmcm9tICd3ZWJwYWNrJztcbmltcG9ydCB7IE5neFRyYW5zbGF0ZUV4dHJhY3RvciB9IGZyb20gJy4uL05neFRyYW5zbGF0ZUV4dHJhY3Rvcic7XG5pbXBvcnQgeyByZWFkRGlyIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG4vKipcbiAqIFdlYnBhY2sgcGx1Z2luIHRoYXQgZXh0cmFjdHMgdHJhbnNsYXRpb24gZnJvbSBhbnkgZmlsZSwgdXNpbmcgTmd4VHJhbnNsYXRlRXh0cmFjdG9yLlxuICovXG5leHBvcnQgY2xhc3MgRXh0cmFjdG9yUGx1Z2luIGltcGxlbWVudHMgUGx1Z2luIHtcbiAgcHJpdmF0ZSBleHRyYWN0b3I6IE5neFRyYW5zbGF0ZUV4dHJhY3RvcjtcbiAgcHJpdmF0ZSBjb21waWxlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBmaWxlVGltZXN0YW1wcyA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKGV4dHJhY3RvcjogTmd4VHJhbnNsYXRlRXh0cmFjdG9yKSB7XG4gICAgdGhpcy5leHRyYWN0b3IgPSBleHRyYWN0b3I7XG4gIH1cblxuICBhcHBseShjb21waWxlcjogQ29tcGlsZXIpIHtcbiAgICBjb21waWxlci5wbHVnaW4oJ2NvbXBpbGUnLCAoY29tcGlsYXRpb24pID0+IHtcbiAgICAgIGlmICghdGhpcy5jb21waWxlZCkge1xuICAgICAgICB0aGlzLmV4dHJhY3Rvci5leGVjdXRlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNvbXBpbGVkID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIGNvbXBpbGVyLnBsdWdpbignZW1pdCcsIChjb21waWxhdGlvbiwgZG9uZSkgPT4ge1xuXG4gICAgICAvLyBmaWx0ZXIgY2hhbmdlZCBmaWxlcyB0byBvbmx5IGtlZXAgdGhvc2Ugd2hpY2ggY2FuIGNvbnRhaW4gbmV3IHRyYW5zbGF0aW9ucy5cbiAgICAgIGNvbnN0IGNoYW5nZWRGaWxlcyA9IE9iamVjdC5rZXlzKGNvbXBpbGF0aW9uLmZpbGVUaW1lc3RhbXBzKVxuICAgICAgICAuZmlsdGVyKHdhdGNoZmlsZSA9PiAodGhpcy5maWxlVGltZXN0YW1wc1t3YXRjaGZpbGVdIHx8IEluZmluaXR5KSA8IChjb21waWxhdGlvbi5maWxlVGltZXN0YW1wc1t3YXRjaGZpbGVdIHx8IEluZmluaXR5KSlcbiAgICAgICAgLmZpbHRlcihmID0+IHtcbiAgICAgICAgICByZXR1cm4gKHRoaXMuZXh0cmFjdG9yLm9wdGlvbnMucGF0dGVybnMgfHwgW10pXG4gICAgICAgICAgICAubWFwKGdsb2JUb1JlZ0V4cClcbiAgICAgICAgICAgIC5tYXAociA9PiAhIWYubWF0Y2gociBhcyBzdHJpbmcpKVxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCB2KSA9PiBhY2MgfHwgdiwgZmFsc2UpXG4gICAgICAgIH0pO1xuXG4gICAgICAvLyB1cGRhdGUgZmlsZSBjaGFuZ2UgdGltZXN0YW1wXG4gICAgICB0aGlzLmZpbGVUaW1lc3RhbXBzID0gY29tcGlsYXRpb24uZmlsZVRpbWVzdGFtcHM7XG5cbiAgICAgIC8vIHRyaWdnZXIgbmV3IGV4dHJhY3Rpb25cbiAgICAgIGlmIChjaGFuZ2VkRmlsZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuZXh0cmFjdG9yLmV4ZWN1dGUoY2hhbmdlZEZpbGVzKTtcbiAgICAgIH1cblxuICAgICAgLy8gd2F0Y2ggbmV3bHkgY3JlYXRlZCBmaWxlc1xuICAgICAgY29uc3QgbyA9IHRoaXMuZXh0cmFjdG9yLm9wdGlvbnMgYXMgYW55O1xuICAgICAgY29uc3QgZXh0cmFjdGVkRmlsZXMgPSBvLmlucHV0LnJlZHVjZSgoaW5wdXRzLCBpKSA9PiB7XG4gICAgICAgIHJldHVybiBpbnB1dHMuY29uY2F0KHJlYWREaXIoaSwgW2AqKi8qLiR7by5mb3JtYXR9YF0pKVxuICAgICAgfSwgW10pO1xuICAgICAgY29tcGlsYXRpb24uZmlsZURlcGVuZGVuY2llcyA9IGNvbXBpbGF0aW9uLmZpbGVEZXBlbmRlbmNpZXMuY29uY2F0KGV4dHJhY3RlZEZpbGVzKTtcblxuICAgICAgZG9uZSgpXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
