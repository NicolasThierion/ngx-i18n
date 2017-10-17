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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFpQztBQUNqQywyQkFBNkI7QUFDN0IsdUJBQXlCO0FBQ3pCLDJCQUE2QjtBQUU3Qix1REFBcUQ7QUFFckQ7O0dBRUc7QUFDSCxpQkFBd0IsR0FBVyxFQUFFLFFBQWtCO0lBQ3JELE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUMsT0FBTyxFQUFFLE9BQU87UUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDdEMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBMUIsQ0FBMEIsQ0FBQzthQUMxQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1QsQ0FBQztBQU5ELDBCQU1DO0FBRUQsY0FBcUIsV0FBbUQsRUFBRSxNQUFjLEVBQUUsTUFBZ0I7SUFDeEcsSUFBTSxRQUFRLEdBQXNCLGtDQUFlLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUV2RSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtRQUNuQixHQUFHLENBQUMsQ0FBZSxVQUF3QixFQUF4QixLQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQXhCLGNBQXdCLEVBQXhCLElBQXdCO1lBQXRDLElBQU0sSUFBSSxTQUFBO1lBQ2IsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07aUJBQ3pDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO2lCQUN2QixPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksR0FBRyxHQUFXLGdCQUFnQixDQUFDO1lBQ25DLElBQUksUUFBUSxHQUFjLElBQUksU0FBSSxRQUFRLENBQUMsU0FBVyxDQUFDO1lBQ3ZELEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDckYsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDckMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM3QyxDQUFDO1lBRUQsSUFBTSxVQUFVLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFHcEQsSUFBSSxtQkFBbUIsR0FBMEIsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25FLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDO1lBRWpELEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25CLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDdEUsQ0FBQztTQUNGO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBN0JELG9CQTZCQyIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1rZGlycCBmcm9tICdta2RpcnAnO1xuaW1wb3J0ICogYXMgZ2xvYiBmcm9tICdnbG9iJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBUcmFuc2xhdGlvbkNvbGxlY3Rpb24sIENvbXBpbGVySW50ZXJmYWNlIH0gZnJvbSAnLi9iaWVzYmplcmctbmd4LXRyYW5zbGF0ZS1leHRyYWN0JztcbmltcG9ydCB7IENvbXBpbGVyRmFjdG9yeSB9IGZyb20gJy4vY29tcGlsZXIuZmFjdG9yeSc7XG5cbi8qKlxuICogR2V0IGFsbCBmaWxlcyBpbiBkaXIgbWF0Y2hpbmcgcGF0dGVybnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlYWREaXIoZGlyOiBzdHJpbmcsIHBhdHRlcm5zOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIHBhdHRlcm5zLnJlZHVjZSgocmVzdWx0cywgcGF0dGVybikgPT4ge1xuICAgIHJldHVybiBnbG9iLnN5bmMocGF0aC5qb2luKGRpciwgcGF0dGVybikpXG4gICAgICAuZmlsdGVyKHBhdGggPT4gZnMuc3RhdFN5bmMocGF0aCkuaXNGaWxlKCkpXG4gICAgICAuY29uY2F0KHJlc3VsdHMpO1xuICB9LCBbXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlKGNvbGxlY3Rpb25zOiB7IFtwOiBzdHJpbmddOiBUcmFuc2xhdGlvbkNvbGxlY3Rpb24gfSwgZm9ybWF0OiBzdHJpbmcsIG91dHB1dDogc3RyaW5nW10pIHtcbiAgY29uc3QgY29tcGlsZXI6IENvbXBpbGVySW50ZXJmYWNlID0gQ29tcGlsZXJGYWN0b3J5LmNyZWF0ZShmb3JtYXQsIHt9KTtcblxuICBvdXRwdXQuZm9yRWFjaChvdXRwdXQgPT4ge1xuICAgIGZvciAoY29uc3QgbGFuZyBvZiBPYmplY3Qua2V5cyhjb2xsZWN0aW9ucykpIHtcbiAgICAgIGNvbnN0IG5vdG1hbGl6ZWRPdXRwdXQgPSBwYXRoLnJlc29sdmUob3V0cHV0XG4gICAgICAgIC5yZXBsYWNlKCdbbGFuZ10nLCBsYW5nKVxuICAgICAgICAucmVwbGFjZSgnW2V4dF0nLCBjb21waWxlci5leHRlbnNpb24pKTtcbiAgICAgIGxldCBkaXI6IHN0cmluZyA9IG5vdG1hbGl6ZWRPdXRwdXQ7XG4gICAgICBsZXQgZmlsZW5hbWU6IHN0cmluZyA9IGAke2xhbmd9LiR7Y29tcGlsZXIuZXh0ZW5zaW9ufWA7XG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMobm90bWFsaXplZE91dHB1dCkgfHwgIWZzLnN0YXRTeW5jKG5vdG1hbGl6ZWRPdXRwdXQpLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgZGlyID0gcGF0aC5kaXJuYW1lKG5vdG1hbGl6ZWRPdXRwdXQpO1xuICAgICAgICBmaWxlbmFtZSA9IHBhdGguYmFzZW5hbWUobm90bWFsaXplZE91dHB1dCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG91dHB1dFBhdGg6IHN0cmluZyA9IHBhdGguam9pbihkaXIsIGZpbGVuYW1lKTtcblxuXG4gICAgICBsZXQgcHJvY2Vzc2VkQ29sbGVjdGlvbjogVHJhbnNsYXRpb25Db2xsZWN0aW9uID0gY29sbGVjdGlvbnNbbGFuZ107XG4gICAgICBwcm9jZXNzZWRDb2xsZWN0aW9uID0gcHJvY2Vzc2VkQ29sbGVjdGlvbi5zb3J0KCk7XG5cbiAgICAgIGlmIChwcm9jZXNzZWRDb2xsZWN0aW9uLmNvdW50KCkgPiAwKSB7XG4gICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhkaXIpKSB7XG4gICAgICAgICAgbWtkaXJwLnN5bmMoZGlyKTtcbiAgICAgICAgfVxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKG91dHB1dFBhdGgsIGNvbXBpbGVyLmNvbXBpbGUocHJvY2Vzc2VkQ29sbGVjdGlvbikpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG4iXX0=
