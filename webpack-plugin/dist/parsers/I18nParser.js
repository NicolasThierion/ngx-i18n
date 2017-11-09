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
                .map(function (text) { return text.replace(/%([^\s]*)/g, "{{$1}}"); }) // replaces '%value' with '{{value}}'
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXJzL0kxOG5QYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEsdUVBQW9FO0FBRXBFLDJCQUE2QjtBQUM3QixtRkFBa0Y7QUFHbEY7SUFBZ0MsOEJBQXNCO0lBQXREOztJQXVEQSxDQUFDO0lBckRRLDRCQUFPLEdBQWQsVUFBZSxRQUFnQixFQUFFLElBQWE7UUFDNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsUUFBUSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFUyxtQ0FBYyxHQUF4QixVQUF5QixRQUFnQixFQUFFLElBQWE7UUFDdEQsSUFBSSxVQUFVLEdBQUcsSUFBSSw2REFBNkIsRUFBRSxDQUFDO1FBRXJELFFBQVEsR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdkQsSUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxRQUFRLENBQUM7YUFDUixJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2QsT0FBTyxDQUFDLFFBQVEsQ0FBQzthQUNqQixJQUFJLENBQUMsVUFBQyxDQUFTLEVBQUUsT0FBdUI7WUFDdkMsSUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzNDLElBQU0sT0FBTyxHQUFHLHdDQUF3QyxDQUFDO1lBQ3pELElBQUksSUFBSSxHQUFvQixFQUFFLENBQUM7WUFDL0IsSUFBSSxPQUFPLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQztZQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBTSxPQUFPLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQXNCLENBQUM7Z0JBQzFELHFCQUE2QyxFQUE1QyxlQUFPLEVBQUUsbUJBQVcsRUFBRSxVQUFFLENBQXFCO2dCQUM5QyxJQUFJLEdBQUc7b0JBQ0wsT0FBTyxTQUFBLEVBQUUsV0FBVyxhQUFBO2lCQUNyQixDQUFBO1lBQ0gsQ0FBQztZQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBRXJCLFFBQVE7aUJBQ0wsUUFBUSxFQUFFO2lCQUNWLE9BQU8sRUFBRTtpQkFDVCxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBcEIsQ0FBb0IsQ0FBQztpQkFDcEMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBckIsQ0FBcUIsQ0FBQztpQkFDbEMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQWYsQ0FBZSxDQUFDO2lCQUMvQixHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFJLHFDQUFxQztpQkFDMUYsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQTdFLENBQTZFLENBQUMsQ0FBQzs7UUFDcEcsQ0FBQyxDQUFDLENBQUM7UUFFTCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7OztPQUlHO0lBQ08saURBQTRCLEdBQXRDLFVBQXVDLFFBQWdCO1FBQ3JELE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLDJCQUEyQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFDSCxpQkFBQztBQUFELENBdkRBLEFBdURDLENBdkQrQixpREFBc0IsR0F1RHJEO0FBdkRZLGdDQUFVIiwiZmlsZSI6InBhcnNlcnMvSTE4blBhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhcnNlckludGVyZmFjZSB9IGZyb20gJy4uL2JpZXNiamVyZy1uZ3gtdHJhbnNsYXRlLWV4dHJhY3QnO1xuaW1wb3J0IHsgfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdCc7XG5pbXBvcnQgeyBBYnN0cmFjdFRlbXBsYXRlUGFyc2VyIH0gZnJvbSAnLi9hYnN0cmFjdC10ZW1wbGF0ZS5wYXJzZXInO1xuXG5pbXBvcnQgKiBhcyAkIGZyb20gJ2NoZWVyaW8nO1xuaW1wb3J0IHsgRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24gfSBmcm9tICcuLi9FeHRlbmRlZFRyYW5zbGF0aW9uQ29sbGVjdGlvbiAnO1xuaW1wb3J0IHsgVHJhbnNsYXRpb25NZXRhIH0gZnJvbSAnLi4vVHJhbnNsYXRpb25NZXRhJztcblxuZXhwb3J0IGNsYXNzIEkxOG5QYXJzZXIgZXh0ZW5kcyBBYnN0cmFjdFRlbXBsYXRlUGFyc2VyIGltcGxlbWVudHMgUGFyc2VySW50ZXJmYWNlIHtcblxuICBwdWJsaWMgZXh0cmFjdChjb250ZW50czogc3RyaW5nLCBwYXRoPzogc3RyaW5nKTogRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24ge1xuICAgIGlmIChwYXRoICYmIHRoaXMuX2lzQW5ndWxhckNvbXBvbmVudChwYXRoKSkge1xuICAgICAgY29udGVudHMgPSB0aGlzLl9leHRyYWN0SW5saW5lVGVtcGxhdGUoY29udGVudHMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9wYXJzZVRlbXBsYXRlKGNvbnRlbnRzLCBwYXRoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZTogc3RyaW5nLCBwYXRoPzogc3RyaW5nKTogRXh0ZW5kZWRUcmFuc2xhdGlvbkNvbGxlY3Rpb24ge1xuICAgIGxldCBjb2xsZWN0aW9uID0gbmV3IEV4dGVuZGVkVHJhbnNsYXRpb25Db2xsZWN0aW9uKCk7XG5cbiAgICB0ZW1wbGF0ZSA9IHRoaXMuX25vcm1hbGl6ZVRlbXBsYXRlQXR0cmlidXRlcyh0ZW1wbGF0ZSk7XG5cbiAgICBjb25zdCBzZWxlY3RvciA9ICdbbmd4LWkxOG5dJztcbiAgICAkKHRlbXBsYXRlKVxuICAgICAgLmZpbmQoc2VsZWN0b3IpXG4gICAgICAuYWRkQmFjayhzZWxlY3RvcilcbiAgICAgIC5lYWNoKChpOiBudW1iZXIsIGVsZW1lbnQ6IENoZWVyaW9FbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0ICRlbGVtZW50ID0gJChlbGVtZW50KTtcbiAgICAgICAgbGV0IGF0dHIgPSAkZWxlbWVudC5hdHRyKCduZ3gtaTE4bicpIHx8ICcnO1xuICAgICAgICBjb25zdCBwYXR0ZXJuID0gLyg/OihbXnxAXSopXFx8KT8oW158QF0qKSg/OkBAKFtefEBdKikpPy87XG4gICAgICAgIGxldCBtZXRhOiBUcmFuc2xhdGlvbk1ldGEgPSB7fTtcbiAgICAgICAgbGV0IG1lYW5pbmcsIGRlc2NyaXB0aW9uLCBpZDtcbiAgICAgICAgaWYgKHBhdHRlcm4udGVzdChhdHRyKSkge1xuICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSAoYXR0ci5tYXRjaChwYXR0ZXJuKSBhcyBSZWdFeHBNYXRjaEFycmF5KTtcbiAgICAgICAgICBbbWVhbmluZywgZGVzY3JpcHRpb24sIGlkXSA9IG1hdGNoZXMuc2xpY2UoMSk7XG4gICAgICAgICAgbWV0YSA9IHtcbiAgICAgICAgICAgIG1lYW5pbmcsIGRlc2NyaXB0aW9uXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG1ldGEubG9jYXRpb24gPSBwYXRoO1xuXG4gICAgICAgICRlbGVtZW50XG4gICAgICAgICAgLmNvbnRlbnRzKClcbiAgICAgICAgICAudG9BcnJheSgpXG4gICAgICAgICAgLmZpbHRlcihub2RlID0+IG5vZGUudHlwZSA9PT0gJ3RleHQnKVxuICAgICAgICAgIC5tYXAobm9kZSA9PiBub2RlLm5vZGVWYWx1ZS50cmltKCkpXG4gICAgICAgICAgLmZpbHRlcih0ZXh0ID0+IHRleHQubGVuZ3RoID4gMClcbiAgICAgICAgICAubWFwKHRleHQgPT4gdGV4dC5yZXBsYWNlKC8lKFteXFxzXSopL2csIFwie3skMX19XCIpKSAgICAvLyByZXBsYWNlcyAnJXZhbHVlJyB3aXRoICd7e3ZhbHVlfX0nXG4gICAgICAgICAgLmZvckVhY2godGV4dCA9PiBjb2xsZWN0aW9uID0gY29sbGVjdGlvbi5hZGQodHlwZW9mIGlkID09PSAndW5kZWZpbmVkJyA/IHRleHQ6IGlkLCB0ZXh0LCBtZXRhKSk7XG4gICAgICB9KTtcblxuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuZ3VsYXIncyBgW2F0dHJdPVwiJ3ZhbCdcImAgc3ludGF4IGlzIG5vdCB2YWxpZCBIVE1MLFxuICAgKiBzbyBpdCBjYW4ndCBiZSBwYXJzZWQgYnkgc3RhbmRhcmQgSFRNTCBwYXJzZXJzLlxuICAgKiBUaGlzIG1ldGhvZCByZXBsYWNlcyBgW2F0dHJdPVwiJ3ZhbCdcIlwiYCB3aXRoIGBhdHRyPVwidmFsXCJgXG4gICAqL1xuICBwcm90ZWN0ZWQgX25vcm1hbGl6ZVRlbXBsYXRlQXR0cmlidXRlcyh0ZW1wbGF0ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgvXFxbKFteXFxdXSspXFxdPVwiJyhbXiddKiknXCIvZywgJyQxPVwiJDJcIicpO1xuICB9XG59XG4iXX0=
