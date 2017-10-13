"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globToRegExp = require("glob-to-regexp");
var utils_1 = require("./utils");
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
            // update change timestamp
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
        compiler.plugin('run', function (compiler, done) {
            done();
        });
        compiler.plugin('watch-run', function (watching, done) {
            done();
        });
    };
    return ExtractorPlugin;
}());
exports.ExtractorPlugin = ExtractorPlugin;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrL0V4dHJhY3RvclBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE4QztBQUk5QyxpQ0FBa0M7QUFFbEM7SUFLRSx5QkFBWSxTQUFnQztRQUZwQyxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUcxQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBRUQsK0JBQUssR0FBTCxVQUFNLFFBQWtCO1FBQXhCLGlCQTRDQztRQTNDQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFDLFdBQVc7WUFDckMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQixDQUFDO1lBQ0QsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFDLFdBQVcsRUFBRSxJQUFJO1lBRXhDLDhFQUE4RTtZQUM5RSxJQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUM7aUJBQ3pELE1BQU0sQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksUUFBUSxDQUFDLEVBQWxHLENBQWtHLENBQUM7aUJBQ3ZILE1BQU0sQ0FBQyxVQUFBLENBQUM7Z0JBQ1AsTUFBTSxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztxQkFDM0MsR0FBRyxDQUFDLFlBQVksQ0FBQztxQkFDakIsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBVyxDQUFDLEVBQXRCLENBQXNCLENBQUM7cUJBQ2hDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxDQUFDLElBQUssT0FBQSxHQUFHLElBQUksQ0FBQyxFQUFSLENBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUN4QyxDQUFDLENBQUMsQ0FBQztZQUVMLDBCQUEwQjtZQUMxQixLQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUM7WUFFakQseUJBQXlCO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN2QyxDQUFDO1lBRUQsNEJBQTRCO1lBQzVCLElBQU0sQ0FBQyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBYyxDQUFDO1lBQ3hDLElBQU0sY0FBYyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFRLENBQUMsQ0FBQyxNQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDeEQsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ1AsV0FBVyxDQUFDLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFbkYsSUFBSSxFQUFFLENBQUE7UUFDUixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFVBQUMsUUFBa0IsRUFBRSxJQUFJO1lBQzlDLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7UUFDSCxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxVQUFDLFFBQWtCLEVBQUUsSUFBSTtZQUNwRCxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0F0REEsQUFzREMsSUFBQTtBQXREWSwwQ0FBZSIsImZpbGUiOiJ3ZWJwYWNrL0V4dHJhY3RvclBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGdsb2JUb1JlZ0V4cCBmcm9tICdnbG9iLXRvLXJlZ2V4cCdcbmltcG9ydCB7IENvbXBpbGVyLCBQbHVnaW4gfSBmcm9tICd3ZWJwYWNrJztcbmltcG9ydCB7IE5neFRyYW5zbGF0ZUV4dHJhY3RvciB9IGZyb20gJy4vTmd4VHJhbnNsYXRlRXh0cmFjdG9yJztcbmltcG9ydCBXYXRjaGluZyA9IENvbXBpbGVyLldhdGNoaW5nO1xuaW1wb3J0IHsgcmVhZERpciB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgRXh0cmFjdG9yUGx1Z2luIGltcGxlbWVudHMgUGx1Z2luIHtcbiAgcHJpdmF0ZSBleHRyYWN0b3I6IE5neFRyYW5zbGF0ZUV4dHJhY3RvcjtcbiAgcHJpdmF0ZSBjb21waWxlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBmaWxlVGltZXN0YW1wcyA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKGV4dHJhY3RvcjogTmd4VHJhbnNsYXRlRXh0cmFjdG9yKSB7XG4gICAgdGhpcy5leHRyYWN0b3IgPSBleHRyYWN0b3I7XG4gIH1cblxuICBhcHBseShjb21waWxlcjogQ29tcGlsZXIpIHtcbiAgICBjb21waWxlci5wbHVnaW4oJ2NvbXBpbGUnLCAoY29tcGlsYXRpb24pID0+IHtcbiAgICAgIGlmICghdGhpcy5jb21waWxlZCkge1xuICAgICAgICB0aGlzLmV4dHJhY3Rvci5leGVjdXRlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNvbXBpbGVkID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIGNvbXBpbGVyLnBsdWdpbignZW1pdCcsIChjb21waWxhdGlvbiwgZG9uZSkgPT4ge1xuXG4gICAgICAvLyBmaWx0ZXIgY2hhbmdlZCBmaWxlcyB0byBvbmx5IGtlZXAgdGhvc2Ugd2hpY2ggY2FuIGNvbnRhaW4gbmV3IHRyYW5zbGF0aW9ucy5cbiAgICAgIGNvbnN0IGNoYW5nZWRGaWxlcyA9IE9iamVjdC5rZXlzKGNvbXBpbGF0aW9uLmZpbGVUaW1lc3RhbXBzKVxuICAgICAgICAuZmlsdGVyKHdhdGNoZmlsZSA9PiAodGhpcy5maWxlVGltZXN0YW1wc1t3YXRjaGZpbGVdIHx8IEluZmluaXR5KSA8IChjb21waWxhdGlvbi5maWxlVGltZXN0YW1wc1t3YXRjaGZpbGVdIHx8IEluZmluaXR5KSlcbiAgICAgICAgLmZpbHRlcihmID0+IHtcbiAgICAgICAgICByZXR1cm4gKHRoaXMuZXh0cmFjdG9yLm9wdGlvbnMucGF0dGVybnMgfHwgW10pXG4gICAgICAgICAgICAubWFwKGdsb2JUb1JlZ0V4cClcbiAgICAgICAgICAgIC5tYXAociA9PiAhIWYubWF0Y2gociBhcyBzdHJpbmcpKVxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCB2KSA9PiBhY2MgfHwgdiwgZmFsc2UpXG4gICAgICAgIH0pO1xuXG4gICAgICAvLyB1cGRhdGUgY2hhbmdlIHRpbWVzdGFtcFxuICAgICAgdGhpcy5maWxlVGltZXN0YW1wcyA9IGNvbXBpbGF0aW9uLmZpbGVUaW1lc3RhbXBzO1xuXG4gICAgICAvLyB0cmlnZ2VyIG5ldyBleHRyYWN0aW9uXG4gICAgICBpZiAoY2hhbmdlZEZpbGVzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmV4dHJhY3Rvci5leGVjdXRlKGNoYW5nZWRGaWxlcyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHdhdGNoIG5ld2x5IGNyZWF0ZWQgZmlsZXNcbiAgICAgIGNvbnN0IG8gPSB0aGlzLmV4dHJhY3Rvci5vcHRpb25zIGFzIGFueTtcbiAgICAgIGNvbnN0IGV4dHJhY3RlZEZpbGVzID0gby5pbnB1dC5yZWR1Y2UoKGlucHV0cywgaSkgPT4ge1xuICAgICAgICByZXR1cm4gaW5wdXRzLmNvbmNhdChyZWFkRGlyKGksIFtgKiovKi4ke28uZm9ybWF0fWBdKSlcbiAgICAgIH0sIFtdKTtcbiAgICAgIGNvbXBpbGF0aW9uLmZpbGVEZXBlbmRlbmNpZXMgPSBjb21waWxhdGlvbi5maWxlRGVwZW5kZW5jaWVzLmNvbmNhdChleHRyYWN0ZWRGaWxlcyk7XG5cbiAgICAgIGRvbmUoKVxuICAgIH0pO1xuXG4gICAgY29tcGlsZXIucGx1Z2luKCdydW4nLCAoY29tcGlsZXI6IENvbXBpbGVyLCBkb25lKSA9PiB7XG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gICAgY29tcGlsZXIucGx1Z2luKCd3YXRjaC1ydW4nLCAod2F0Y2hpbmc6IFdhdGNoaW5nLCBkb25lKSA9PiB7XG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
