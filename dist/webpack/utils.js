"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glob = require("glob");
var fs = require("fs");
var path = require("path");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQTZCO0FBQzdCLHVCQUF5QjtBQUN6QiwyQkFBNkI7QUFFN0I7O0dBRUc7QUFDSCxpQkFBd0IsR0FBVyxFQUFFLFFBQWtCO0lBQ3JELE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUMsT0FBTyxFQUFFLE9BQU87UUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDdEMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBMUIsQ0FBMEIsQ0FBQzthQUMxQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1QsQ0FBQztBQU5ELDBCQU1DIiwiZmlsZSI6IndlYnBhY2svdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBnbG9iIGZyb20gJ2dsb2InO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcblxuLyoqXG4gKiBHZXQgYWxsIGZpbGVzIGluIGRpciBtYXRjaGluZyBwYXR0ZXJuc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVhZERpcihkaXI6IHN0cmluZywgcGF0dGVybnM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICByZXR1cm4gcGF0dGVybnMucmVkdWNlKChyZXN1bHRzLCBwYXR0ZXJuKSA9PiB7XG4gICAgcmV0dXJuIGdsb2Iuc3luYyhwYXRoLmpvaW4oZGlyLCBwYXR0ZXJuKSlcbiAgICAgIC5maWx0ZXIocGF0aCA9PiBmcy5zdGF0U3luYyhwYXRoKS5pc0ZpbGUoKSlcbiAgICAgIC5jb25jYXQocmVzdWx0cyk7XG4gIH0sIFtdKTtcbn1cbiJdfQ==
