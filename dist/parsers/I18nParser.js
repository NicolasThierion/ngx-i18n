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
        var selector = '[i18n]';
        $(template)
            .find(selector)
            .addBack(selector)
            .each(function (i, element) {
            var $element = $(element);
            var attr = $element.attr('i18n') || '';
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXJzL0kxOG5QYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEsdUVBQW9FO0FBRXBFLDJCQUE2QjtBQUM3QixtRkFBa0Y7QUFHbEY7SUFBZ0MsOEJBQXNCO0lBQXREOztJQXNEQSxDQUFDO0lBcERRLDRCQUFPLEdBQWQsVUFBZSxRQUFnQixFQUFFLElBQWE7UUFDNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsUUFBUSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFUyxtQ0FBYyxHQUF4QixVQUF5QixRQUFnQixFQUFFLElBQWE7UUFDdEQsSUFBSSxVQUFVLEdBQUcsSUFBSSw2REFBNkIsRUFBRSxDQUFDO1FBRXJELFFBQVEsR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdkQsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxRQUFRLENBQUM7YUFDUixJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2QsT0FBTyxDQUFDLFFBQVEsQ0FBQzthQUNqQixJQUFJLENBQUMsVUFBQyxDQUFTLEVBQUUsT0FBdUI7WUFDdkMsSUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZDLElBQU0sT0FBTyxHQUFHLHdDQUF3QyxDQUFDO1lBQ3pELElBQUksSUFBSSxHQUFvQixFQUFFLENBQUM7WUFDL0IsSUFBSSxPQUFPLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQztZQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBTSxPQUFPLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQXNCLENBQUM7Z0JBQzFELHFCQUE2QyxFQUE1QyxlQUFPLEVBQUUsbUJBQVcsRUFBRSxVQUFFLENBQXFCO2dCQUM5QyxJQUFJLEdBQUc7b0JBQ0wsT0FBTyxTQUFBLEVBQUUsV0FBVyxhQUFBO2lCQUNyQixDQUFBO1lBQ0gsQ0FBQztZQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBRXJCLFFBQVE7aUJBQ0wsUUFBUSxFQUFFO2lCQUNWLE9BQU8sRUFBRTtpQkFDVCxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBcEIsQ0FBb0IsQ0FBQztpQkFDcEMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBckIsQ0FBcUIsQ0FBQztpQkFDbEMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQWYsQ0FBZSxDQUFDO2lCQUMvQixPQUFPLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQSxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBN0UsQ0FBNkUsQ0FBQyxDQUFDOztRQUNwRyxDQUFDLENBQUMsQ0FBQztRQUVMLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxpREFBNEIsR0FBdEMsVUFBdUMsUUFBZ0I7UUFDckQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsMkJBQTJCLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0F0REEsQUFzREMsQ0F0RCtCLGlEQUFzQixHQXNEckQ7QUF0RFksZ0NBQVUiLCJmaWxlIjoicGFyc2Vycy9JMThuUGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFyc2VySW50ZXJmYWNlIH0gZnJvbSAnLi4vYmllc2JqZXJnLW5neC10cmFuc2xhdGUtZXh0cmFjdCc7XG5pbXBvcnQgeyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0JztcbmltcG9ydCB7IEFic3RyYWN0VGVtcGxhdGVQYXJzZXIgfSBmcm9tICcuL2Fic3RyYWN0LXRlbXBsYXRlLnBhcnNlcic7XG5cbmltcG9ydCAqIGFzICQgZnJvbSAnY2hlZXJpbyc7XG5pbXBvcnQgeyBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB9IGZyb20gJy4uL0V4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uICc7XG5pbXBvcnQgeyBUcmFuc2xhdGlvbk1ldGEgfSBmcm9tICcuLi9UcmFuc2xhdGlvbk1ldGEnO1xuXG5leHBvcnQgY2xhc3MgSTE4blBhcnNlciBleHRlbmRzIEFic3RyYWN0VGVtcGxhdGVQYXJzZXIgaW1wbGVtZW50cyBQYXJzZXJJbnRlcmZhY2Uge1xuXG4gIHB1YmxpYyBleHRyYWN0KGNvbnRlbnRzOiBzdHJpbmcsIHBhdGg/OiBzdHJpbmcpOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB7XG4gICAgaWYgKHBhdGggJiYgdGhpcy5faXNBbmd1bGFyQ29tcG9uZW50KHBhdGgpKSB7XG4gICAgICBjb250ZW50cyA9IHRoaXMuX2V4dHJhY3RJbmxpbmVUZW1wbGF0ZShjb250ZW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3BhcnNlVGVtcGxhdGUoY29udGVudHMsIHBhdGgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9wYXJzZVRlbXBsYXRlKHRlbXBsYXRlOiBzdHJpbmcsIHBhdGg/OiBzdHJpbmcpOiBFeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiB7XG4gICAgbGV0IGNvbGxlY3Rpb24gPSBuZXcgRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24oKTtcblxuICAgIHRlbXBsYXRlID0gdGhpcy5fbm9ybWFsaXplVGVtcGxhdGVBdHRyaWJ1dGVzKHRlbXBsYXRlKTtcblxuICAgIGNvbnN0IHNlbGVjdG9yID0gJ1tpMThuXSc7XG4gICAgJCh0ZW1wbGF0ZSlcbiAgICAgIC5maW5kKHNlbGVjdG9yKVxuICAgICAgLmFkZEJhY2soc2VsZWN0b3IpXG4gICAgICAuZWFjaCgoaTogbnVtYmVyLCBlbGVtZW50OiBDaGVlcmlvRWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCAkZWxlbWVudCA9ICQoZWxlbWVudCk7XG4gICAgICAgIGxldCBhdHRyID0gJGVsZW1lbnQuYXR0cignaTE4bicpIHx8ICcnO1xuICAgICAgICBjb25zdCBwYXR0ZXJuID0gLyg/OihbXnxAXSopXFx8KT8oW158QF0qKSg/OkBAKFtefEBdKikpPy87XG4gICAgICAgIGxldCBtZXRhOiBUcmFuc2xhdGlvbk1ldGEgPSB7fTtcbiAgICAgICAgbGV0IG1lYW5pbmcsIGRlc2NyaXB0aW9uLCBpZDtcbiAgICAgICAgaWYgKHBhdHRlcm4udGVzdChhdHRyKSkge1xuICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSAoYXR0ci5tYXRjaChwYXR0ZXJuKSBhcyBSZWdFeHBNYXRjaEFycmF5KTtcbiAgICAgICAgICBbbWVhbmluZywgZGVzY3JpcHRpb24sIGlkXSA9IG1hdGNoZXMuc2xpY2UoMSk7XG4gICAgICAgICAgbWV0YSA9IHtcbiAgICAgICAgICAgIG1lYW5pbmcsIGRlc2NyaXB0aW9uXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG1ldGEubG9jYXRpb24gPSBwYXRoO1xuXG4gICAgICAgICRlbGVtZW50XG4gICAgICAgICAgLmNvbnRlbnRzKClcbiAgICAgICAgICAudG9BcnJheSgpXG4gICAgICAgICAgLmZpbHRlcihub2RlID0+IG5vZGUudHlwZSA9PT0gJ3RleHQnKVxuICAgICAgICAgIC5tYXAobm9kZSA9PiBub2RlLm5vZGVWYWx1ZS50cmltKCkpXG4gICAgICAgICAgLmZpbHRlcih0ZXh0ID0+IHRleHQubGVuZ3RoID4gMClcbiAgICAgICAgICAuZm9yRWFjaCh0ZXh0ID0+IGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLmFkZCh0eXBlb2YgaWQgPT09ICd1bmRlZmluZWQnID8gdGV4dDogaWQsIHRleHQsIG1ldGEpKTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH1cblxuICAvKipcbiAgICogQW5ndWxhcidzIGBbYXR0cl09XCIndmFsJ1wiYCBzeW50YXggaXMgbm90IHZhbGlkIEhUTUwsXG4gICAqIHNvIGl0IGNhbid0IGJlIHBhcnNlZCBieSBzdGFuZGFyZCBIVE1MIHBhcnNlcnMuXG4gICAqIFRoaXMgbWV0aG9kIHJlcGxhY2VzIGBbYXR0cl09XCIndmFsJ1wiXCJgIHdpdGggYGF0dHI9XCJ2YWxcImBcbiAgICovXG4gIHByb3RlY3RlZCBfbm9ybWFsaXplVGVtcGxhdGVBdHRyaWJ1dGVzKHRlbXBsYXRlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKC9cXFsoW15cXF1dKylcXF09XCInKFteJ10qKSdcIi9nLCAnJDE9XCIkMlwiJyk7XG4gIH1cbn1cbiJdfQ==
