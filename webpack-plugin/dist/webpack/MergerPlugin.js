"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NgxTranslateMerger_1 = require("../NgxTranslateMerger");
var _ = require("lodash");
var MergerPlugin = /** @class */ (function () {
    function MergerPlugin(options) {
        options = _checkOptions(options);
        if (options.emitOnly) {
            // void output, and rather emit to webpack bundle
            this._emit = options.output;
            options.output = [];
        }
        else {
            this._emit = [];
        }
        this._merger = new NgxTranslateMerger_1.NgxTranslateMerger(options);
    }
    MergerPlugin.prototype.apply = function (compiler) {
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
    return MergerPlugin;
}());
exports.MergerPlugin = MergerPlugin;
function _checkOptions(options) {
    options = _.defaults(options || {}, {
        emitOnly: false,
        output: ['src/assets/i18n/[lang].[ext]']
    });
    if (typeof options.emitOnly !== 'boolean') {
        throw new TypeError('emitOnly should be a boolean');
    }
    if (!_.isArray(options.output)) {
        throw new TypeError('output should be an array');
    }
    return options;
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrL01lcmdlclBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLDREQUEyRDtBQUUzRCwwQkFBNEI7QUFFNUI7SUFHRSxzQkFBWSxPQUF1QztRQUNqRCxPQUFPLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBR2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLGlEQUFpRDtZQUNqRCxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFrQixDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksdUNBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELDRCQUFLLEdBQUwsVUFBTSxRQUFrQjtRQUF4QixpQkF3QkM7UUF2QkMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsVUFBQyxXQUFXLEVBQUUsUUFBUTtZQUM1QyxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3ZCLElBQU0sTUFBTSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDeEMsSUFBTSxNQUFNLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7WUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7aUJBQ2hCLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQ1gsSUFBTSxjQUFjLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRW5FLG1DQUFtQztnQkFDbkMsS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO29CQUNyQixJQUFNLFFBQVEsR0FBRyxJQUFJO3lCQUNsQixPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUcsSUFBTSxDQUFDO3lCQUM1QixPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUcsTUFBUSxDQUFDLENBQUM7b0JBRWpDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBRyxRQUFVLENBQUMsR0FBRzt3QkFDbEMsTUFBTSxFQUFFLGNBQU0sT0FBQSxjQUFjLEVBQWQsQ0FBYzt3QkFDNUIsSUFBSSxFQUFFLGNBQU0sT0FBQSxjQUFjLENBQUMsTUFBTSxFQUFyQixDQUFxQjtxQkFDbEMsQ0FBQTtnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxFQUFFLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxtQkFBQztBQUFELENBMUNBLEFBMENDLElBQUE7QUExQ1ksb0NBQVk7QUE2Q3pCLHVCQUF1QixPQUF1QztJQUM1RCxPQUFPLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFO1FBQ2xDLFFBQVEsRUFBRSxLQUFLO1FBQ2YsTUFBTSxFQUFFLENBQUMsOEJBQThCLENBQUM7S0FDekMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixNQUFNLElBQUksU0FBUyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDakIsQ0FBQyIsImZpbGUiOiJ3ZWJwYWNrL01lcmdlclBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogT2ZmZXJzIG1lcmdlICYgaW5qZWN0aW9uIG9mIGFueSBwcmV2aW91c2x5IGV4dHJhY3RlZCB0cmFuc2xhdGlvbi5cbiAqL1xuaW1wb3J0IHsgQ29tcGlsZXIgfSBmcm9tICd3ZWJwYWNrJztcbmltcG9ydCB7IE5neFRyYW5zbGF0ZU1lcmdlciB9IGZyb20gJy4uL05neFRyYW5zbGF0ZU1lcmdlcic7XG5pbXBvcnQgeyBUcmFuc2xhdGVQbHVnaW4gfSBmcm9tICcuL25neC10cmFuc2xhdGlvbi13ZWJwYWNrJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNsYXNzIE1lcmdlclBsdWdpbiB7XG4gIF9lbWl0OiBzdHJpbmdbXTtcbiAgX21lcmdlcjogTmd4VHJhbnNsYXRlTWVyZ2VyO1xuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogVHJhbnNsYXRlUGx1Z2luLk1lcmdlck9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gX2NoZWNrT3B0aW9ucyhvcHRpb25zKTtcblxuXG4gICAgaWYgKG9wdGlvbnMuZW1pdE9ubHkpIHtcbiAgICAgIC8vIHZvaWQgb3V0cHV0LCBhbmQgcmF0aGVyIGVtaXQgdG8gd2VicGFjayBidW5kbGVcbiAgICAgIHRoaXMuX2VtaXQgPSBvcHRpb25zLm91dHB1dCBhcyBzdHJpbmdbXTtcbiAgICAgIG9wdGlvbnMub3V0cHV0ID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VtaXQgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5fbWVyZ2VyID0gbmV3IE5neFRyYW5zbGF0ZU1lcmdlcihvcHRpb25zKTtcbiAgfVxuXG4gIGFwcGx5KGNvbXBpbGVyOiBDb21waWxlcikge1xuICAgIGNvbXBpbGVyLnBsdWdpbignZW1pdCcsIChjb21waWxhdGlvbiwgY2FsbGJhY2spID0+IHtcbiAgICAgIHRoaXMuX21lcmdlci5leGVjdXRlKCk7XG4gICAgICBjb25zdCBmb3JtYXQgPSB0aGlzLl9tZXJnZXIuZ2V0Rm9ybWF0KCk7XG4gICAgICBjb25zdCBvdXRwdXQgPSB0aGlzLl9tZXJnZXIudHJhbnNsYXRpb25zO1xuICAgICAgT2JqZWN0LmtleXMob3V0cHV0KVxuICAgICAgICAuZm9yRWFjaChsYW5nID0+IHtcbiAgICAgICAgICBjb25zdCB0cmFuc2xhdGlvblN0cjogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkob3V0cHV0W2xhbmddLnZhbHVlcyk7XG5cbiAgICAgICAgICAvLyBlbWl0IHRyYW5zbGF0aW9uIGZpbGVzIHRvIGJ1bmRsZVxuICAgICAgICAgIHRoaXMuX2VtaXQuZm9yRWFjaChlbWl0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVuYW1lID0gZW1pdFxuICAgICAgICAgICAgICAucmVwbGFjZSgnW2xhbmddJywgYCR7bGFuZ31gKVxuICAgICAgICAgICAgICAucmVwbGFjZSgnW2V4dF0nLCBgJHtmb3JtYXR9YCk7XG5cbiAgICAgICAgICAgIGNvbXBpbGF0aW9uLmFzc2V0c1tgJHtmaWxlbmFtZX1gXSA9IHtcbiAgICAgICAgICAgICAgc291cmNlOiAoKSA9PiB0cmFuc2xhdGlvblN0cixcbiAgICAgICAgICAgICAgc2l6ZTogKCkgPT4gdHJhbnNsYXRpb25TdHIubGVuZ3RoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIF9jaGVja09wdGlvbnMob3B0aW9ucz86IFRyYW5zbGF0ZVBsdWdpbi5NZXJnZXJPcHRpb25zKTogVHJhbnNsYXRlUGx1Z2luLk1lcmdlck9wdGlvbnMge1xuICBvcHRpb25zID0gXy5kZWZhdWx0cyhvcHRpb25zIHx8IHt9LCB7XG4gICAgZW1pdE9ubHk6IGZhbHNlLFxuICAgIG91dHB1dDogWydzcmMvYXNzZXRzL2kxOG4vW2xhbmddLltleHRdJ11cbiAgfSk7XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmVtaXRPbmx5ICE9PSAnYm9vbGVhbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbWl0T25seSBzaG91bGQgYmUgYSBib29sZWFuJyk7XG4gIH1cblxuICBpZiAoIV8uaXNBcnJheShvcHRpb25zLm91dHB1dCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvdXRwdXQgc2hvdWxkIGJlIGFuIGFycmF5Jyk7XG4gIH1cblxuICByZXR1cm4gb3B0aW9ucztcbn1cbiJdfQ==
