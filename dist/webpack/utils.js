"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mkdirp = require("mkdirp");
var glob = require("glob");
var fs = require("fs");
var path = require("path");
var compiler_factory_1 = require("./compiler.factory");
/**
 * Get all files in dir matching patterns
 */
function readDir(dir, patterns) {
    return patterns.reduce(function (results, pattern) {
        return glob.sync(path.join(dir, pattern))
            .filter(function (path) { return fs.statSync(path).isFile(); })
            .concat(results);
    }, []);
}
exports.readDir = readDir;
function save(collections, format, output) {
    var compiler = compiler_factory_1.CompilerFactory.create(format, {});
    output.forEach(function (output) {
        for (var _i = 0, _a = Object.keys(collections); _i < _a.length; _i++) {
            var lang = _a[_i];
            var notmalizedOutput = path.resolve(output
                .replace('[lang]', lang)
                .replace('[ext]', compiler.extension));
            var dir = notmalizedOutput;
            var filename = lang + "." + compiler.extension;
            if (!fs.existsSync(notmalizedOutput) || !fs.statSync(notmalizedOutput).isDirectory()) {
                dir = path.dirname(notmalizedOutput);
                filename = path.basename(notmalizedOutput);
            }
            var outputPath = path.join(dir, filename);
            var processedCollection = collections[lang];
            processedCollection = processedCollection.sort();
            if (processedCollection.count() > 0) {
                if (!fs.existsSync(dir)) {
                    mkdirp.sync(dir);
                }
                fs.writeFileSync(outputPath, compiler.compile(processedCollection));
            }
        }
    });
}
exports.save = save;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQWlDO0FBQ2pDLDJCQUE2QjtBQUM3Qix1QkFBeUI7QUFDekIsMkJBQTZCO0FBRTdCLHVEQUFxRDtBQUVyRDs7R0FFRztBQUNILGlCQUF3QixHQUFXLEVBQUUsUUFBa0I7SUFDckQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQyxPQUFPLEVBQUUsT0FBTztRQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQzthQUN0QyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUExQixDQUEwQixDQUFDO2FBQzFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDO0FBTkQsMEJBTUM7QUFFRCxjQUFxQixXQUFtRCxFQUFFLE1BQWMsRUFBRSxNQUFnQjtJQUN4RyxJQUFNLFFBQVEsR0FBc0Isa0NBQWUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXZFLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO1FBQ25CLEdBQUcsQ0FBQyxDQUFlLFVBQXdCLEVBQXhCLEtBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBeEIsY0FBd0IsRUFBeEIsSUFBd0I7WUFBdEMsSUFBTSxJQUFJLFNBQUE7WUFDYixJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtpQkFDekMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7aUJBQ3ZCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxHQUFHLEdBQVcsZ0JBQWdCLENBQUM7WUFDbkMsSUFBSSxRQUFRLEdBQWMsSUFBSSxTQUFJLFFBQVEsQ0FBQyxTQUFXLENBQUM7WUFDdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNyRixHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNyQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzdDLENBQUM7WUFFRCxJQUFNLFVBQVUsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUdwRCxJQUFJLG1CQUFtQixHQUEwQixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkUsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFakQsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsQ0FBQztnQkFDRCxFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUN0RSxDQUFDO1NBQ0Y7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUE3QkQsb0JBNkJDIiwiZmlsZSI6IndlYnBhY2svdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBta2RpcnAgZnJvbSAnbWtkaXJwJztcbmltcG9ydCAqIGFzIGdsb2IgZnJvbSAnZ2xvYic7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgVHJhbnNsYXRpb25Db2xsZWN0aW9uLCBDb21waWxlckludGVyZmFjZSB9IGZyb20gJy4vbmd4LWltcG9ydCc7XG5pbXBvcnQgeyBDb21waWxlckZhY3RvcnkgfSBmcm9tICcuL2NvbXBpbGVyLmZhY3RvcnknO1xuXG4vKipcbiAqIEdldCBhbGwgZmlsZXMgaW4gZGlyIG1hdGNoaW5nIHBhdHRlcm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWFkRGlyKGRpcjogc3RyaW5nLCBwYXR0ZXJuczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gIHJldHVybiBwYXR0ZXJucy5yZWR1Y2UoKHJlc3VsdHMsIHBhdHRlcm4pID0+IHtcbiAgICByZXR1cm4gZ2xvYi5zeW5jKHBhdGguam9pbihkaXIsIHBhdHRlcm4pKVxuICAgICAgLmZpbHRlcihwYXRoID0+IGZzLnN0YXRTeW5jKHBhdGgpLmlzRmlsZSgpKVxuICAgICAgLmNvbmNhdChyZXN1bHRzKTtcbiAgfSwgW10pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZShjb2xsZWN0aW9uczogeyBbcDogc3RyaW5nXTogVHJhbnNsYXRpb25Db2xsZWN0aW9uIH0sIGZvcm1hdDogc3RyaW5nLCBvdXRwdXQ6IHN0cmluZ1tdKSB7XG4gIGNvbnN0IGNvbXBpbGVyOiBDb21waWxlckludGVyZmFjZSA9IENvbXBpbGVyRmFjdG9yeS5jcmVhdGUoZm9ybWF0LCB7fSk7XG5cbiAgb3V0cHV0LmZvckVhY2gob3V0cHV0ID0+IHtcbiAgICBmb3IgKGNvbnN0IGxhbmcgb2YgT2JqZWN0LmtleXMoY29sbGVjdGlvbnMpKSB7XG4gICAgICBjb25zdCBub3RtYWxpemVkT3V0cHV0ID0gcGF0aC5yZXNvbHZlKG91dHB1dFxuICAgICAgICAucmVwbGFjZSgnW2xhbmddJywgbGFuZylcbiAgICAgICAgLnJlcGxhY2UoJ1tleHRdJywgY29tcGlsZXIuZXh0ZW5zaW9uKSk7XG4gICAgICBsZXQgZGlyOiBzdHJpbmcgPSBub3RtYWxpemVkT3V0cHV0O1xuICAgICAgbGV0IGZpbGVuYW1lOiBzdHJpbmcgPSBgJHtsYW5nfS4ke2NvbXBpbGVyLmV4dGVuc2lvbn1gO1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKG5vdG1hbGl6ZWRPdXRwdXQpIHx8ICFmcy5zdGF0U3luYyhub3RtYWxpemVkT3V0cHV0KS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIGRpciA9IHBhdGguZGlybmFtZShub3RtYWxpemVkT3V0cHV0KTtcbiAgICAgICAgZmlsZW5hbWUgPSBwYXRoLmJhc2VuYW1lKG5vdG1hbGl6ZWRPdXRwdXQpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBvdXRwdXRQYXRoOiBzdHJpbmcgPSBwYXRoLmpvaW4oZGlyLCBmaWxlbmFtZSk7XG5cblxuICAgICAgbGV0IHByb2Nlc3NlZENvbGxlY3Rpb246IFRyYW5zbGF0aW9uQ29sbGVjdGlvbiA9IGNvbGxlY3Rpb25zW2xhbmddO1xuICAgICAgcHJvY2Vzc2VkQ29sbGVjdGlvbiA9IHByb2Nlc3NlZENvbGxlY3Rpb24uc29ydCgpO1xuXG4gICAgICBpZiAocHJvY2Vzc2VkQ29sbGVjdGlvbi5jb3VudCgpID4gMCkge1xuICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlyKSkge1xuICAgICAgICAgIG1rZGlycC5zeW5jKGRpcik7XG4gICAgICAgIH1cbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhvdXRwdXRQYXRoLCBjb21waWxlci5jb21waWxlKHByb2Nlc3NlZENvbGxlY3Rpb24pKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuIl19
