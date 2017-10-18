"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_template_parser_1 = require("./abstract-template.parser");
var $ = require("cheerio");
var ExtendedTranslationCollection_1 = require("../ExtendedTranslationCollection ");
var I18nParser = /** @class */ (function (_super) {
    __extends(I18nParser, _super);
    function I18nParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    I18nParser.prototype.extract = function (contents, path) {
        if (path && this._isAngularComponent(path)) {
            contents = this._extractInlineTemplate(contents);
        }
        return this._parseTemplate(contents, path);
    };
    I18nParser.prototype._parseTemplate = function (template, path) {
        var collection = new ExtendedTranslationCollection_1.ExtendedTranslationCollection();
        template = this._normalizeTemplateAttributes(template);
        var selector = '[ngx-i18n]';
        $(template)
            .find(selector)
            .addBack(selector)
            .each(function (i, element) {
            var $element = $(element);
            var attr = $element.attr('ngx-i18n') || '';
            var pattern = /(?:([^|@]*)\|)?([^|@]*)(?:@@([^|@]*))?/;
            var meta = {};
            var meaning, description, id;
            if (pattern.test(attr)) {
                var matches = attr.match(pattern);
                _a = matches.slice(1), meaning = _a[0], description = _a[1], id = _a[2];
                meta = {
                    meaning: meaning, description: description
                };
            }
            meta.location = path;
            $element
                .contents()
                .toArray()
                .filter(function (node) { return node.type === 'text'; })
                .map(function (node) { return node.nodeValue.trim(); })
                .filter(function (text) { return text.length > 0; })
                .forEach(function (text) { return collection = collection.add(typeof id === 'undefined' ? text : id, text, meta); });
            var _a;
        });
        return collection;
    };
    /**
     * Angular's `[attr]="'val'"` syntax is not valid HTML,
     * so it can't be parsed by standard HTML parsers.
     * This method replaces `[attr]="'val'""` with `attr="val"`
     */
    I18nParser.prototype._normalizeTemplateAttributes = function (template) {
        return template.replace(/\[([^\]]+)\]="'([^']*)'"/g, '$1="$2"');
    };
    return I18nParser;
}(abstract_template_parser_1.AbstractTemplateParser));
exports.I18nParser = I18nParser;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXJzL0kxOG5QYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEsdUVBQW9FO0FBRXBFLDJCQUE2QjtBQUM3QixtRkFBa0Y7QUFHbEY7SUFBZ0MsOEJBQXNCO0lBQXREOztJQXNEQSxDQUFDO0lBcERRLDRCQUFPLEdBQWQsVUFBZSxRQUFnQixFQUFFLElBQWE7UUFDNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsUUFBUSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFUyxtQ0FBYyxHQUF4QixVQUF5QixRQUFnQixFQUFFLElBQWE7UUFDdEQsSUFBSSxVQUFVLEdBQUcsSUFBSSw2REFBNkIsRUFBRSxDQUFDO1FBRXJELFFBQVEsR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdkQsSUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxRQUFRLENBQUM7YUFDUixJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2QsT0FBTyxDQUFDLFFBQVEsQ0FBQzthQUNqQixJQUFJLENBQUMsVUFBQyxDQUFTLEVBQUUsT0FBdUI7WUFDdkMsSUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzNDLElBQU0sT0FBTyxHQUFHLHdDQUF3QyxDQUFDO1lBQ3pELElBQUksSUFBSSxHQUFvQixFQUFFLENBQUM7WUFDL0IsSUFBSSxPQUFPLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQztZQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBTSxPQUFPLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQXNCLENBQUM7Z0JBQzFELHFCQUE2QyxFQUE1QyxlQUFPLEVBQUUsbUJBQVcsRUFBRSxVQUFFLENBQXFCO2dCQUM5QyxJQUFJLEdBQUc7b0JBQ0wsT0FBTyxTQUFBLEVBQUUsV0FBVyxhQUFBO2lCQUNyQixDQUFBO1lBQ0gsQ0FBQztZQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBRXJCLFFBQVE7aUJBQ0wsUUFBUSxFQUFFO2lCQUNWLE9BQU8sRUFBRTtpQkFDVCxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBcEIsQ0FBb0IsQ0FBQztpQkFDcEMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBckIsQ0FBcUIsQ0FBQztpQkFDbEMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQWYsQ0FBZSxDQUFDO2lCQUMvQixPQUFPLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQSxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBN0UsQ0FBNkUsQ0FBQyxDQUFDOztRQUNwRyxDQUFDLENBQUMsQ0FBQztRQUVMLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxpREFBNEIsR0FBdEMsVUFBdUMsUUFBZ0I7UUFDckQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsMkJBQTJCLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0F0REEsQUFzREMsQ0F0RCtCLGlEQUFzQixHQXNEckQ7QUF0RFksZ0NBQVUiLCJmaWxlIjoicGFyc2Vycy9JMThuUGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFyc2VySW50ZXJmYWNlIH0gZnJvbSAnLi4vYmllc2JqZXJnLW5neC10cmFuc2xhdGUtZXh0cmFjdCc7XG5pbXBvcnQgeyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0JztcbmltcG9ydCB7IEFic3RyYWN0VGVtcGxhdGVQYXJzZXIgfSBmcm9tICcuL2Fic3RyYWN0LXRlbXBsYXRlLnBhcnNlcic7XG5cbmltcG9ydCAqIGFzICQgZnJvbSAnY2hlZXJpbyc7XG5pbXBvcnQgeyBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB9IGZyb20gJy4uL0V4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uICc7XG5pbXBvcnQgeyBUcmFuc2xhdGlvbk1ldGEgfSBmcm9tICcuLi9UcmFuc2xhdGlvbk1ldGEnO1xuXG5leHBvcnQgY2xhc3MgSTE4blBhcnNlciBleHRlbmRzIEFic3RyYWN0VGVtcGxhdGVQYXJzZXIgaW1wbGVtZW50cyBQYXJzZXJJbnRlcmZhY2Uge1xuXG4gIHB1YmxpYyBleHRyYWN0KGNvbnRlbnRzOiBzdHJpbmcsIHBhdGg/OiBzdHJpbmcpOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB7XG4gICAgaWYgKHBhdGggJiYgdGhpcy5faXNBbmd1bGFyQ29tcG9uZW50KHBhdGgpKSB7XG4gICAgICBjb250ZW50cyA9IHRoaXMuX2V4dHJhY3RJbmxpbmVUZW1wbGF0ZShjb250ZW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3BhcnNlVGVtcGxhdGUoY29udGVudHMsIHBhdGgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9wYXJzZVRlbXBsYXRlKHRlbXBsYXRlOiBzdHJpbmcsIHBhdGg/OiBzdHJpbmcpOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB7XG4gICAgbGV0IGNvbGxlY3Rpb24gPSBuZXcgRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24oKTtcblxuICAgIHRlbXBsYXRlID0gdGhpcy5fbm9ybWFsaXplVGVtcGxhdGVBdHRyaWJ1dGVzKHRlbXBsYXRlKTtcblxuICAgIGNvbnN0IHNlbGVjdG9yID0gJ1tuZ3gtaTE4bl0nO1xuICAgICQodGVtcGxhdGUpXG4gICAgICAuZmluZChzZWxlY3RvcilcbiAgICAgIC5hZGRCYWNrKHNlbGVjdG9yKVxuICAgICAgLmVhY2goKGk6IG51bWJlciwgZWxlbWVudDogQ2hlZXJpb0VsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgJGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xuICAgICAgICBsZXQgYXR0ciA9ICRlbGVtZW50LmF0dHIoJ25neC1pMThuJykgfHwgJyc7XG4gICAgICAgIGNvbnN0IHBhdHRlcm4gPSAvKD86KFtefEBdKilcXHwpPyhbXnxAXSopKD86QEAoW158QF0qKSk/LztcbiAgICAgICAgbGV0IG1ldGE6IFRyYW5zbGF0aW9uTWV0YSA9IHt9O1xuICAgICAgICBsZXQgbWVhbmluZywgZGVzY3JpcHRpb24sIGlkO1xuICAgICAgICBpZiAocGF0dGVybi50ZXN0KGF0dHIpKSB7XG4gICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IChhdHRyLm1hdGNoKHBhdHRlcm4pIGFzIFJlZ0V4cE1hdGNoQXJyYXkpO1xuICAgICAgICAgIFttZWFuaW5nLCBkZXNjcmlwdGlvbiwgaWRdID0gbWF0Y2hlcy5zbGljZSgxKTtcbiAgICAgICAgICBtZXRhID0ge1xuICAgICAgICAgICAgbWVhbmluZywgZGVzY3JpcHRpb25cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbWV0YS5sb2NhdGlvbiA9IHBhdGg7XG5cbiAgICAgICAgJGVsZW1lbnRcbiAgICAgICAgICAuY29udGVudHMoKVxuICAgICAgICAgIC50b0FycmF5KClcbiAgICAgICAgICAuZmlsdGVyKG5vZGUgPT4gbm9kZS50eXBlID09PSAndGV4dCcpXG4gICAgICAgICAgLm1hcChub2RlID0+IG5vZGUubm9kZVZhbHVlLnRyaW0oKSlcbiAgICAgICAgICAuZmlsdGVyKHRleHQgPT4gdGV4dC5sZW5ndGggPiAwKVxuICAgICAgICAgIC5mb3JFYWNoKHRleHQgPT4gY29sbGVjdGlvbiA9IGNvbGxlY3Rpb24uYWRkKHR5cGVvZiBpZCA9PT0gJ3VuZGVmaW5lZCcgPyB0ZXh0OiBpZCwgdGV4dCwgbWV0YSkpO1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbmd1bGFyJ3MgYFthdHRyXT1cIid2YWwnXCJgIHN5bnRheCBpcyBub3QgdmFsaWQgSFRNTCxcbiAgICogc28gaXQgY2FuJ3QgYmUgcGFyc2VkIGJ5IHN0YW5kYXJkIEhUTUwgcGFyc2Vycy5cbiAgICogVGhpcyBtZXRob2QgcmVwbGFjZXMgYFthdHRyXT1cIid2YWwnXCJcImAgd2l0aCBgYXR0cj1cInZhbFwiYFxuICAgKi9cbiAgcHJvdGVjdGVkIF9ub3JtYWxpemVUZW1wbGF0ZUF0dHJpYnV0ZXModGVtcGxhdGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRlbXBsYXRlLnJlcGxhY2UoL1xcWyhbXlxcXV0rKVxcXT1cIicoW14nXSopJ1wiL2csICckMT1cIiQyXCInKTtcbiAgfVxufVxuIl19
