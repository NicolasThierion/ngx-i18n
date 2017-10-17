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
var biesbjerg_ngx_translate_extract_1 = require("../biesbjerg-ngx-translate-extract");
var abstract_template_parser_1 = require("./abstract-template.parser");
var $ = require("cheerio");
var I18nParser = /** @class */ (function (_super) {
    __extends(I18nParser, _super);
    function I18nParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    I18nParser.prototype.extract = function (contents, path) {
        if (path && this._isAngularComponent(path)) {
            contents = this._extractInlineTemplate(contents);
        }
        return this._parseTemplate(contents);
    };
    I18nParser.prototype._parseTemplate = function (template) {
        var collection = new biesbjerg_ngx_translate_extract_1.TranslationCollection();
        template = this._normalizeTemplateAttributes(template);
        var selector = '[i18n]';
        $(template)
            .find(selector)
            .addBack(selector)
            .each(function (i, element) {
            var $element = $(element);
            var attr = $element.attr('i18n');
            if (attr) {
                collection = collection.add(attr);
            }
            else {
                $element
                    .contents()
                    .toArray()
                    .filter(function (node) { return node.type === 'text'; })
                    .map(function (node) { return node.nodeValue.trim(); })
                    .filter(function (text) { return text.length > 0; })
                    .forEach(function (text) { return collection = collection.add(text); });
            }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXJzL0kxOG5QYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsc0ZBQTZGO0FBRTdGLHVFQUFvRTtBQUVwRSwyQkFBNkI7QUFFN0I7SUFBZ0MsOEJBQXNCO0lBQXREOztJQStDQSxDQUFDO0lBN0NRLDRCQUFPLEdBQWQsVUFBZSxRQUFnQixFQUFFLElBQWE7UUFDNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsUUFBUSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVTLG1DQUFjLEdBQXhCLFVBQXlCLFFBQWdCO1FBQ3ZDLElBQUksVUFBVSxHQUEwQixJQUFJLHVEQUFxQixFQUFFLENBQUM7UUFFcEUsUUFBUSxHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV2RCxJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDMUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQzthQUNSLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDZCxPQUFPLENBQUMsUUFBUSxDQUFDO2FBQ2pCLElBQUksQ0FBQyxVQUFDLENBQVMsRUFBRSxPQUF1QjtZQUN2QyxJQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVuQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNULFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixRQUFRO3FCQUNMLFFBQVEsRUFBRTtxQkFDVixPQUFPLEVBQUU7cUJBQ1QsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQXBCLENBQW9CLENBQUM7cUJBQ3BDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQXJCLENBQXFCLENBQUM7cUJBQ2xDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFmLENBQWUsQ0FBQztxQkFDL0IsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztZQUN4RCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFTCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7OztPQUlHO0lBQ08saURBQTRCLEdBQXRDLFVBQXVDLFFBQWdCO1FBQ3JELE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLDJCQUEyQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFDSCxpQkFBQztBQUFELENBL0NBLEFBK0NDLENBL0MrQixpREFBc0IsR0ErQ3JEO0FBL0NZLGdDQUFVIiwiZmlsZSI6InBhcnNlcnMvSTE4blBhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhcnNlckludGVyZmFjZSwgVHJhbnNsYXRpb25Db2xsZWN0aW9uICB9IGZyb20gJy4uL2JpZXNiamVyZy1uZ3gtdHJhbnNsYXRlLWV4dHJhY3QnO1xuaW1wb3J0IHsgfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdCc7XG5pbXBvcnQgeyBBYnN0cmFjdFRlbXBsYXRlUGFyc2VyIH0gZnJvbSAnLi9hYnN0cmFjdC10ZW1wbGF0ZS5wYXJzZXInO1xuXG5pbXBvcnQgKiBhcyAkIGZyb20gJ2NoZWVyaW8nO1xuXG5leHBvcnQgY2xhc3MgSTE4blBhcnNlciBleHRlbmRzIEFic3RyYWN0VGVtcGxhdGVQYXJzZXIgaW1wbGVtZW50cyBQYXJzZXJJbnRlcmZhY2Uge1xuXG4gIHB1YmxpYyBleHRyYWN0KGNvbnRlbnRzOiBzdHJpbmcsIHBhdGg/OiBzdHJpbmcpOiBUcmFuc2xhdGlvbkNvbGxlY3Rpb24ge1xuICAgIGlmIChwYXRoICYmIHRoaXMuX2lzQW5ndWxhckNvbXBvbmVudChwYXRoKSkge1xuICAgICAgY29udGVudHMgPSB0aGlzLl9leHRyYWN0SW5saW5lVGVtcGxhdGUoY29udGVudHMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9wYXJzZVRlbXBsYXRlKGNvbnRlbnRzKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZTogc3RyaW5nKTogVHJhbnNsYXRpb25Db2xsZWN0aW9uIHtcbiAgICBsZXQgY29sbGVjdGlvbjogVHJhbnNsYXRpb25Db2xsZWN0aW9uID0gbmV3IFRyYW5zbGF0aW9uQ29sbGVjdGlvbigpO1xuXG4gICAgdGVtcGxhdGUgPSB0aGlzLl9ub3JtYWxpemVUZW1wbGF0ZUF0dHJpYnV0ZXModGVtcGxhdGUpO1xuXG4gICAgY29uc3Qgc2VsZWN0b3IgPSAnW2kxOG5dJztcbiAgICAkKHRlbXBsYXRlKVxuICAgICAgLmZpbmQoc2VsZWN0b3IpXG4gICAgICAuYWRkQmFjayhzZWxlY3RvcilcbiAgICAgIC5lYWNoKChpOiBudW1iZXIsIGVsZW1lbnQ6IENoZWVyaW9FbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0ICRlbGVtZW50ID0gJChlbGVtZW50KTtcbiAgICAgICAgY29uc3QgYXR0ciA9ICRlbGVtZW50LmF0dHIoJ2kxOG4nKTtcblxuICAgICAgICBpZiAoYXR0cikge1xuICAgICAgICAgIGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLmFkZChhdHRyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkZWxlbWVudFxuICAgICAgICAgICAgLmNvbnRlbnRzKClcbiAgICAgICAgICAgIC50b0FycmF5KClcbiAgICAgICAgICAgIC5maWx0ZXIobm9kZSA9PiBub2RlLnR5cGUgPT09ICd0ZXh0JylcbiAgICAgICAgICAgIC5tYXAobm9kZSA9PiBub2RlLm5vZGVWYWx1ZS50cmltKCkpXG4gICAgICAgICAgICAuZmlsdGVyKHRleHQgPT4gdGV4dC5sZW5ndGggPiAwKVxuICAgICAgICAgICAgLmZvckVhY2godGV4dCA9PiBjb2xsZWN0aW9uID0gY29sbGVjdGlvbi5hZGQodGV4dCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuZ3VsYXIncyBgW2F0dHJdPVwiJ3ZhbCdcImAgc3ludGF4IGlzIG5vdCB2YWxpZCBIVE1MLFxuICAgKiBzbyBpdCBjYW4ndCBiZSBwYXJzZWQgYnkgc3RhbmRhcmQgSFRNTCBwYXJzZXJzLlxuICAgKiBUaGlzIG1ldGhvZCByZXBsYWNlcyBgW2F0dHJdPVwiJ3ZhbCdcIlwiYCB3aXRoIGBhdHRyPVwidmFsXCJgXG4gICAqL1xuICBwcm90ZWN0ZWQgX25vcm1hbGl6ZVRlbXBsYXRlQXR0cmlidXRlcyh0ZW1wbGF0ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgvXFxbKFteXFxdXSspXFxdPVwiJyhbXiddKiknXCIvZywgJyQxPVwiJDJcIicpO1xuICB9XG59XG4iXX0=
