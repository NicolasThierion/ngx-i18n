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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrL0V4dHJhY3RvclBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE4QztBQUk5QyxpQ0FBa0M7QUFFbEM7SUFLRSx5QkFBWSxTQUFnQztRQUZwQyxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUcxQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBRUQsK0JBQUssR0FBTCxVQUFNLFFBQWtCO1FBQXhCLGlCQXFDQztRQXBDQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFDLFdBQVc7WUFDckMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQixDQUFDO1lBQ0QsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFDLFdBQVcsRUFBRSxJQUFJO1lBRXhDLDhFQUE4RTtZQUM5RSxJQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUM7aUJBQ3pELE1BQU0sQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksUUFBUSxDQUFDLEVBQWxHLENBQWtHLENBQUM7aUJBQ3ZILE1BQU0sQ0FBQyxVQUFBLENBQUM7Z0JBQ1AsTUFBTSxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztxQkFDM0MsR0FBRyxDQUFDLFlBQVksQ0FBQztxQkFDakIsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBVyxDQUFDLEVBQXRCLENBQXNCLENBQUM7cUJBQ2hDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxDQUFDLElBQUssT0FBQSxHQUFHLElBQUksQ0FBQyxFQUFSLENBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUN4QyxDQUFDLENBQUMsQ0FBQztZQUVMLCtCQUErQjtZQUMvQixLQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUM7WUFFakQseUJBQXlCO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN2QyxDQUFDO1lBRUQsNEJBQTRCO1lBQzVCLElBQU0sQ0FBQyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBYyxDQUFDO1lBQ3hDLElBQU0sY0FBYyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFRLENBQUMsQ0FBQyxNQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDeEQsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ1AsV0FBVyxDQUFDLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFbkYsSUFBSSxFQUFFLENBQUE7UUFDUixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxzQkFBQztBQUFELENBL0NBLEFBK0NDLElBQUE7QUEvQ1ksMENBQWUiLCJmaWxlIjoid2VicGFjay9FeHRyYWN0b3JQbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBnbG9iVG9SZWdFeHAgZnJvbSAnZ2xvYi10by1yZWdleHAnXG5pbXBvcnQgeyBDb21waWxlciwgUGx1Z2luIH0gZnJvbSAnd2VicGFjayc7XG5pbXBvcnQgeyBOZ3hUcmFuc2xhdGVFeHRyYWN0b3IgfSBmcm9tICcuL05neFRyYW5zbGF0ZUV4dHJhY3Rvcic7XG5pbXBvcnQgV2F0Y2hpbmcgPSBDb21waWxlci5XYXRjaGluZztcbmltcG9ydCB7IHJlYWREaXIgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIEV4dHJhY3RvclBsdWdpbiBpbXBsZW1lbnRzIFBsdWdpbiB7XG4gIHByaXZhdGUgZXh0cmFjdG9yOiBOZ3hUcmFuc2xhdGVFeHRyYWN0b3I7XG4gIHByaXZhdGUgY29tcGlsZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgZmlsZVRpbWVzdGFtcHMgPSB7fTtcblxuICBjb25zdHJ1Y3RvcihleHRyYWN0b3I6IE5neFRyYW5zbGF0ZUV4dHJhY3Rvcikge1xuICAgIHRoaXMuZXh0cmFjdG9yID0gZXh0cmFjdG9yO1xuICB9XG5cbiAgYXBwbHkoY29tcGlsZXI6IENvbXBpbGVyKSB7XG4gICAgY29tcGlsZXIucGx1Z2luKCdjb21waWxlJywgKGNvbXBpbGF0aW9uKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuY29tcGlsZWQpIHtcbiAgICAgICAgdGhpcy5leHRyYWN0b3IuZXhlY3V0ZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5jb21waWxlZCA9IHRydWU7XG4gICAgfSk7XG5cbiAgICBjb21waWxlci5wbHVnaW4oJ2VtaXQnLCAoY29tcGlsYXRpb24sIGRvbmUpID0+IHtcblxuICAgICAgLy8gZmlsdGVyIGNoYW5nZWQgZmlsZXMgdG8gb25seSBrZWVwIHRob3NlIHdoaWNoIGNhbiBjb250YWluIG5ldyB0cmFuc2xhdGlvbnMuXG4gICAgICBjb25zdCBjaGFuZ2VkRmlsZXMgPSBPYmplY3Qua2V5cyhjb21waWxhdGlvbi5maWxlVGltZXN0YW1wcylcbiAgICAgICAgLmZpbHRlcih3YXRjaGZpbGUgPT4gKHRoaXMuZmlsZVRpbWVzdGFtcHNbd2F0Y2hmaWxlXSB8fCBJbmZpbml0eSkgPCAoY29tcGlsYXRpb24uZmlsZVRpbWVzdGFtcHNbd2F0Y2hmaWxlXSB8fCBJbmZpbml0eSkpXG4gICAgICAgIC5maWx0ZXIoZiA9PiB7XG4gICAgICAgICAgcmV0dXJuICh0aGlzLmV4dHJhY3Rvci5vcHRpb25zLnBhdHRlcm5zIHx8IFtdKVxuICAgICAgICAgICAgLm1hcChnbG9iVG9SZWdFeHApXG4gICAgICAgICAgICAubWFwKHIgPT4gISFmLm1hdGNoKHIgYXMgc3RyaW5nKSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgdikgPT4gYWNjIHx8IHYsIGZhbHNlKVxuICAgICAgICB9KTtcblxuICAgICAgLy8gdXBkYXRlIGZpbGUgY2hhbmdlIHRpbWVzdGFtcFxuICAgICAgdGhpcy5maWxlVGltZXN0YW1wcyA9IGNvbXBpbGF0aW9uLmZpbGVUaW1lc3RhbXBzO1xuXG4gICAgICAvLyB0cmlnZ2VyIG5ldyBleHRyYWN0aW9uXG4gICAgICBpZiAoY2hhbmdlZEZpbGVzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmV4dHJhY3Rvci5leGVjdXRlKGNoYW5nZWRGaWxlcyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHdhdGNoIG5ld2x5IGNyZWF0ZWQgZmlsZXNcbiAgICAgIGNvbnN0IG8gPSB0aGlzLmV4dHJhY3Rvci5vcHRpb25zIGFzIGFueTtcbiAgICAgIGNvbnN0IGV4dHJhY3RlZEZpbGVzID0gby5pbnB1dC5yZWR1Y2UoKGlucHV0cywgaSkgPT4ge1xuICAgICAgICByZXR1cm4gaW5wdXRzLmNvbmNhdChyZWFkRGlyKGksIFtgKiovKi4ke28uZm9ybWF0fWBdKSlcbiAgICAgIH0sIFtdKTtcbiAgICAgIGNvbXBpbGF0aW9uLmZpbGVEZXBlbmRlbmNpZXMgPSBjb21waWxhdGlvbi5maWxlRGVwZW5kZW5jaWVzLmNvbmNhdChleHRyYWN0ZWRGaWxlcyk7XG5cbiAgICAgIGRvbmUoKVxuICAgIH0pO1xuICB9XG59XG4iXX0=
