"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractTemplateParser = /** @class */ (function () {
    function AbstractTemplateParser() {
    }
    /**
     * Checks if file is of type javascript or typescript and
     * makes the assumption that it is an Angular Component
     */
    AbstractTemplateParser.prototype._isAngularComponent = function (path) {
        return (/\.ts|js$/i).test(path);
    };
    /**
     * Extracts inline template from components
     */
    AbstractTemplateParser.prototype._extractInlineTemplate = function (contents) {
        var regExp = /template\s*:\s*(["'`])([^\1]*?)\1/;
        var match = regExp.exec(contents);
        if (match !== null) {
            return match[2];
        }
        return '';
    };
    return AbstractTemplateParser;
}());
exports.AbstractTemplateParser = AbstractTemplateParser;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXJzL2Fic3RyYWN0LXRlbXBsYXRlLnBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0lBQUE7SUFzQkEsQ0FBQztJQXJCQzs7O09BR0c7SUFDTyxvREFBbUIsR0FBN0IsVUFBOEIsSUFBWTtRQUN4QyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVEOztPQUVHO0lBQ08sdURBQXNCLEdBQWhDLFVBQWlDLFFBQWdCO1FBQy9DLElBQU0sTUFBTSxHQUFXLG1DQUFtQyxDQUFDO1FBQzNELElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixDQUFDO1FBRUQsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFSCw2QkFBQztBQUFELENBdEJBLEFBc0JDLElBQUE7QUF0QnFCLHdEQUFzQiIsImZpbGUiOiJwYXJzZXJzL2Fic3RyYWN0LXRlbXBsYXRlLnBhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFRlbXBsYXRlUGFyc2VyIHtcbiAgLyoqXG4gICAqIENoZWNrcyBpZiBmaWxlIGlzIG9mIHR5cGUgamF2YXNjcmlwdCBvciB0eXBlc2NyaXB0IGFuZFxuICAgKiBtYWtlcyB0aGUgYXNzdW1wdGlvbiB0aGF0IGl0IGlzIGFuIEFuZ3VsYXIgQ29tcG9uZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgX2lzQW5ndWxhckNvbXBvbmVudChwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKC9cXC50c3xqcyQvaSkudGVzdChwYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRyYWN0cyBpbmxpbmUgdGVtcGxhdGUgZnJvbSBjb21wb25lbnRzXG4gICAqL1xuICBwcm90ZWN0ZWQgX2V4dHJhY3RJbmxpbmVUZW1wbGF0ZShjb250ZW50czogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCByZWdFeHA6IFJlZ0V4cCA9IC90ZW1wbGF0ZVxccyo6XFxzKihbXCInYF0pKFteXFwxXSo/KVxcMS87XG4gICAgY29uc3QgbWF0Y2ggPSByZWdFeHAuZXhlYyhjb250ZW50cyk7XG4gICAgaWYgKG1hdGNoICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbWF0Y2hbMl07XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9XG5cbn1cbiJdfQ==
