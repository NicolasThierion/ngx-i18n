"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mkdirp = require("mkdirp");
var glob = require("glob");
var fs = require("fs");
var path = require("path");
var biesbjerg_ngx_translate_extract_1 = require("./biesbjerg-ngx-translate-extract");
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
function save(collection, lang, format, output) {
    var compiler = compiler_factory_1.CompilerFactory.create(format, {});
    output.forEach(function (output) {
        var normalizedOutput = normalizePath(output, compiler.extension, lang);
        var dir = normalizedOutput;
        var filename = lang + "." + compiler.extension;
        if (!fs.existsSync(normalizedOutput) || !fs.statSync(normalizedOutput).isDirectory()) {
            dir = path.dirname(normalizedOutput);
            filename = path.basename(normalizedOutput);
        }
        var outputPath = path.join(dir, filename);
        collection = collection.sort();
        if (collection.count() > 0) {
            if (!fs.existsSync(dir)) {
                mkdirp.sync(dir);
            }
            fs.writeFileSync(outputPath, compiler.compile(collection));
        }
    });
}
exports.save = save;
function normalizePath(output, extension, lang) {
    return path.resolve(output
        .replace('[lang]', lang)
        .replace('[ext]', extension));
}
exports.normalizePath = normalizePath;
function merge(paths, compiler, collection) {
    if (collection === void 0) { collection = new biesbjerg_ngx_translate_extract_1.TranslationCollection(); }
    return paths
        .filter(function (p) { return path.extname(p) === "." + compiler.extension; })
        .filter(function (p) { return fs.existsSync(p); })
        .map(function (p) { return fs.readFileSync(p, 'utf-8'); })
        .map(compiler.parse.bind(compiler))
        .reduce(function (acc, c) {
        return acc.union(c);
    }, collection);
}
exports.merge = merge;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LE9BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFJLFFBQVEsQ0FBQyxTQUFXLEVBQTVDLENBQTRDLENBQUM7U0FDekQsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQztTQUM3QixHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQztTQUNyQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEMsTUFBTSxDQUFDLFVBQUMsR0FBMEIsRUFBRSxDQUF3QjtRQUMzRCxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QixDQUFDLEVBQUUsVUFBVSxDQUEwQixDQUFDO0FBQzVDLENBQUM7QUFWRCxzQkFVQyIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1rZGlycCBmcm9tICdta2RpcnAnO1xuaW1wb3J0ICogYXMgZ2xvYiBmcm9tICdnbG9iJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBUcmFuc2xhdGlvbkNvbGxlY3Rpb24sIENvbXBpbGVySW50ZXJmYWNlIH0gZnJvbSAnLi9iaWVzYmplcmctbmd4LXRyYW5zbGF0ZS1leHRyYWN0JztcbmltcG9ydCB7IENvbXBpbGVyRmFjdG9yeSB9IGZyb20gJy4vY29tcGlsZXIuZmFjdG9yeSc7XG5cbi8qKlxuICogR2V0IGFsbCBmaWxlcyBpbiBkaXIgbWF0Y2hpbmcgcGF0dGVybnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlYWREaXIoZGlyOiBzdHJpbmcsIHBhdHRlcm5zOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIHBhdHRlcm5zLnJlZHVjZSgocmVzdWx0cywgcGF0dGVybikgPT4ge1xuICAgIHJldHVybiBnbG9iLnN5bmMocGF0aC5qb2luKGRpciwgcGF0dGVybikpXG4gICAgICAuZmlsdGVyKHBhdGggPT4gZnMuc3RhdFN5bmMocGF0aCkuaXNGaWxlKCkpXG4gICAgICAuY29uY2F0KHJlc3VsdHMpO1xuICB9LCBbXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlKGNvbGxlY3Rpb246IFRyYW5zbGF0aW9uQ29sbGVjdGlvbiwgbGFuZzogc3RyaW5nLCBmb3JtYXQ6IHN0cmluZywgb3V0cHV0OiBzdHJpbmdbXSkge1xuICBjb25zdCBjb21waWxlcjogQ29tcGlsZXJJbnRlcmZhY2UgPSBDb21waWxlckZhY3RvcnkuY3JlYXRlKGZvcm1hdCwge30pO1xuXG4gIG91dHB1dC5mb3JFYWNoKG91dHB1dCA9PiB7XG4gICAgY29uc3Qgbm9ybWFsaXplZE91dHB1dCA9IG5vcm1hbGl6ZVBhdGgob3V0cHV0LCBjb21waWxlci5leHRlbnNpb24sIGxhbmcpO1xuICAgIGxldCBkaXI6IHN0cmluZyA9IG5vcm1hbGl6ZWRPdXRwdXQ7XG4gICAgbGV0IGZpbGVuYW1lOiBzdHJpbmcgPSBgJHtsYW5nfS4ke2NvbXBpbGVyLmV4dGVuc2lvbn1gO1xuICAgIGlmICghZnMuZXhpc3RzU3luYyhub3JtYWxpemVkT3V0cHV0KSB8fCAhZnMuc3RhdFN5bmMobm9ybWFsaXplZE91dHB1dCkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgZGlyID0gcGF0aC5kaXJuYW1lKG5vcm1hbGl6ZWRPdXRwdXQpO1xuICAgICAgZmlsZW5hbWUgPSBwYXRoLmJhc2VuYW1lKG5vcm1hbGl6ZWRPdXRwdXQpO1xuICAgIH1cblxuICAgIGNvbnN0IG91dHB1dFBhdGg6IHN0cmluZyA9IHBhdGguam9pbihkaXIsIGZpbGVuYW1lKTtcbiAgICBjb2xsZWN0aW9uID0gY29sbGVjdGlvbi5zb3J0KCk7XG5cbiAgICBpZiAoY29sbGVjdGlvbi5jb3VudCgpID4gMCkge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpcikpIHtcbiAgICAgICAgbWtkaXJwLnN5bmMoZGlyKTtcbiAgICAgIH1cbiAgICAgIGZzLndyaXRlRmlsZVN5bmMob3V0cHV0UGF0aCwgY29tcGlsZXIuY29tcGlsZShjb2xsZWN0aW9uKSk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVBhdGgob3V0cHV0OiBzdHJpbmcsIGV4dGVuc2lvbjogc3RyaW5nLCBsYW5nOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHBhdGgucmVzb2x2ZShvdXRwdXRcbiAgICAucmVwbGFjZSgnW2xhbmddJywgbGFuZylcbiAgICAucmVwbGFjZSgnW2V4dF0nLCBleHRlbnNpb24pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlKHBhdGhzOiBzdHJpbmdbXSwgY29tcGlsZXI6IENvbXBpbGVySW50ZXJmYWNlLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24gPSBuZXcgVHJhbnNsYXRpb25Db2xsZWN0aW9uKCkpOiBUcmFuc2xhdGlvbkNvbGxlY3Rpb24ge1xuICByZXR1cm4gcGF0aHNcbiAgICAuZmlsdGVyKHAgPT4gcGF0aC5leHRuYW1lKHApID09PSBgLiR7Y29tcGlsZXIuZXh0ZW5zaW9ufWApXG4gICAgLmZpbHRlcihwID0+IGZzLmV4aXN0c1N5bmMocCkpXG4gICAgLm1hcChwID0+IGZzLnJlYWRGaWxlU3luYyhwLCAndXRmLTgnKSlcbiAgICAubWFwKGNvbXBpbGVyLnBhcnNlLmJpbmQoY29tcGlsZXIpKVxuICAgIC5yZWR1Y2UoKGFjYzogVHJhbnNsYXRpb25Db2xsZWN0aW9uLCBjOiBUcmFuc2xhdGlvbkNvbGxlY3Rpb24pID0+IHtcbiAgICAgIHJldHVybiBhY2MudW5pb24oYyk7XG4gICAgfSwgY29sbGVjdGlvbikgYXMgVHJhbnNsYXRpb25Db2xsZWN0aW9uO1xufVxuIl19
