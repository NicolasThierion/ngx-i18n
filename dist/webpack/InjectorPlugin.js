"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NgxTranslateMerger_1 = require("../NgxTranslateMerger");
var _ = require("lodash");
var InjectorPlugin = /** @class */ (function () {
    function InjectorPlugin(options) {
        options = options || {};
        // void output, and rather emit to webpack bundle
        this._emit = _.defaults(options.output, ['assets/i18n/[lang].[ext]']);
        options.output = [];
        this._merger = new NgxTranslateMerger_1.NgxTranslateMerger(options);
    }
    InjectorPlugin.prototype.apply = function (compiler) {
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
    return InjectorPlugin;
}());
exports.InjectorPlugin = InjectorPlugin;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrL0luamVjdG9yUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsNERBQTJEO0FBRTNELDBCQUE0QjtBQUU1QjtJQUdFLHdCQUFZLE9BQXlDO1FBQ25ELE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO1FBRXhCLGlEQUFpRDtRQUNqRCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztRQUN0RSxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksdUNBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELDhCQUFLLEdBQUwsVUFBTSxRQUFrQjtRQUF4QixpQkF3QkM7UUF2QkMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsVUFBQyxXQUFXLEVBQUUsUUFBUTtZQUM1QyxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3ZCLElBQU0sTUFBTSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDeEMsSUFBTSxNQUFNLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7WUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7aUJBQ2hCLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQ1gsSUFBTSxjQUFjLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRW5FLG1DQUFtQztnQkFDbkMsS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO29CQUNyQixJQUFNLFFBQVEsR0FBRyxJQUFJO3lCQUNsQixPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUcsSUFBTSxDQUFDO3lCQUM1QixPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUcsTUFBUSxDQUFDLENBQUM7b0JBRWpDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBRyxRQUFVLENBQUMsR0FBRzt3QkFDbEMsTUFBTSxFQUFFLGNBQU0sT0FBQSxjQUFjLEVBQWQsQ0FBYzt3QkFDNUIsSUFBSSxFQUFFLGNBQU0sT0FBQSxjQUFjLENBQUMsTUFBTSxFQUFyQixDQUFxQjtxQkFDbEMsQ0FBQTtnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxFQUFFLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxxQkFBQztBQUFELENBckNBLEFBcUNDLElBQUE7QUFyQ1ksd0NBQWMiLCJmaWxlIjoid2VicGFjay9JbmplY3RvclBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogT2ZmZXJzIGluamVjdGlvbiBvZiBhbnkgcHJldmlvdXNseSBleHRyYWN0ZWQgdHJhbnNsYXRpb24uXG4gKi9cbmltcG9ydCB7IENvbXBpbGVyIH0gZnJvbSAnd2VicGFjayc7XG5pbXBvcnQgeyBOZ3hUcmFuc2xhdGVNZXJnZXIgfSBmcm9tICcuLi9OZ3hUcmFuc2xhdGVNZXJnZXInO1xuaW1wb3J0IHsgVHJhbnNsYXRlUGx1Z2luIH0gZnJvbSAnLi9uZ3gtdHJhbnNsYXRpb24td2VicGFjayc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjbGFzcyBJbmplY3RvclBsdWdpbiB7XG4gIF9lbWl0OiBzdHJpbmdbXTtcbiAgX21lcmdlcjogTmd4VHJhbnNsYXRlTWVyZ2VyO1xuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogVHJhbnNsYXRlUGx1Z2luLkluamVjdG9yT3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgLy8gdm9pZCBvdXRwdXQsIGFuZCByYXRoZXIgZW1pdCB0byB3ZWJwYWNrIGJ1bmRsZVxuICAgIHRoaXMuX2VtaXQgPSBfLmRlZmF1bHRzKG9wdGlvbnMub3V0cHV0LCBbJ2Fzc2V0cy9pMThuL1tsYW5nXS5bZXh0XSddKTtcbiAgICBvcHRpb25zLm91dHB1dCA9IFtdO1xuICAgIHRoaXMuX21lcmdlciA9IG5ldyBOZ3hUcmFuc2xhdGVNZXJnZXIob3B0aW9ucyk7XG4gIH1cblxuICBhcHBseShjb21waWxlcjogQ29tcGlsZXIpIHtcbiAgICBjb21waWxlci5wbHVnaW4oJ2VtaXQnLCAoY29tcGlsYXRpb24sIGNhbGxiYWNrKSA9PiB7XG4gICAgICB0aGlzLl9tZXJnZXIuZXhlY3V0ZSgpO1xuICAgICAgY29uc3QgZm9ybWF0ID0gdGhpcy5fbWVyZ2VyLmdldEZvcm1hdCgpO1xuICAgICAgY29uc3Qgb3V0cHV0ID0gdGhpcy5fbWVyZ2VyLnRyYW5zbGF0aW9ucztcbiAgICAgIE9iamVjdC5rZXlzKG91dHB1dClcbiAgICAgICAgLmZvckVhY2gobGFuZyA9PiB7XG4gICAgICAgICAgY29uc3QgdHJhbnNsYXRpb25TdHI6IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KG91dHB1dFtsYW5nXS52YWx1ZXMpO1xuXG4gICAgICAgICAgLy8gZW1pdCB0cmFuc2xhdGlvbiBmaWxlcyB0byBidW5kbGVcbiAgICAgICAgICB0aGlzLl9lbWl0LmZvckVhY2goZW1pdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWxlbmFtZSA9IGVtaXRcbiAgICAgICAgICAgICAgLnJlcGxhY2UoJ1tsYW5nXScsIGAke2xhbmd9YClcbiAgICAgICAgICAgICAgLnJlcGxhY2UoJ1tleHRdJywgYCR7Zm9ybWF0fWApO1xuXG4gICAgICAgICAgICBjb21waWxhdGlvbi5hc3NldHNbYCR7ZmlsZW5hbWV9YF0gPSB7XG4gICAgICAgICAgICAgIHNvdXJjZTogKCkgPT4gdHJhbnNsYXRpb25TdHIsXG4gICAgICAgICAgICAgIHNpemU6ICgpID0+IHRyYW5zbGF0aW9uU3RyLmxlbmd0aFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
