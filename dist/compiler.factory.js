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
var biesbjerg_ngx_translate_extract_1 = require("./biesbjerg-ngx-translate-extract");
var PoCompiler_1 = require("./PoCompiler");
/**
 * Overrides default CompilerFactory to take 'po' format for gettext instead of 'pot'
 */
var CompilerFactory = /** @class */ (function (_super) {
    __extends(CompilerFactory, _super);
    function CompilerFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompilerFactory.create = function (format, options) {
        // NgxCompilerFactory accepts 'pot' format rather than 'po'
        if (format === 'po' || format === 'pot') {
            return new PoCompiler_1.PoCompiler(options);
        }
        return _super.create.call(this, format, options);
    };
    return CompilerFactory;
}(biesbjerg_ngx_translate_extract_1.CompilerFactory));
exports.CompilerFactory = CompilerFactory;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlci5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFGQUE2RztBQUM3RywyQ0FBMEM7QUFFMUM7O0dBRUc7QUFDSDtJQUFxQyxtQ0FBa0I7SUFBdkQ7O0lBU0EsQ0FBQztJQVJRLHNCQUFNLEdBQWIsVUFBYyxNQUFjLEVBQUUsT0FBWTtRQUN4QywyREFBMkQ7UUFDM0QsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsSUFBSSx1QkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFFRCxNQUFNLENBQUMsT0FBTSxNQUFNLFlBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ3RDLENBQUM7SUFDSCxzQkFBQztBQUFELENBVEEsQUFTQyxDQVRvQyxpREFBa0IsR0FTdEQ7QUFUWSwwQ0FBZSIsImZpbGUiOiJjb21waWxlci5mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcGlsZXJGYWN0b3J5IGFzIE5neENvbXBpbGVyRmFjdG9yeSwgQ29tcGlsZXJJbnRlcmZhY2UgfSBmcm9tICcuL2JpZXNiamVyZy1uZ3gtdHJhbnNsYXRlLWV4dHJhY3QnO1xuaW1wb3J0IHsgUG9Db21waWxlciB9IGZyb20gJy4vUG9Db21waWxlcic7XG5cbi8qKlxuICogT3ZlcnJpZGVzIGRlZmF1bHQgQ29tcGlsZXJGYWN0b3J5IHRvIHRha2UgJ3BvJyBmb3JtYXQgZm9yIGdldHRleHQgaW5zdGVhZCBvZiAncG90J1xuICovXG5leHBvcnQgY2xhc3MgQ29tcGlsZXJGYWN0b3J5IGV4dGVuZHMgTmd4Q29tcGlsZXJGYWN0b3J5IHtcbiAgc3RhdGljIGNyZWF0ZShmb3JtYXQ6IHN0cmluZywgb3B0aW9ucz86IHt9KTogQ29tcGlsZXJJbnRlcmZhY2Uge1xuICAgIC8vIE5neENvbXBpbGVyRmFjdG9yeSBhY2NlcHRzICdwb3QnIGZvcm1hdCByYXRoZXIgdGhhbiAncG8nXG4gICAgaWYgKGZvcm1hdCA9PT0gJ3BvJyB8fCBmb3JtYXQgPT09ICdwb3QnKSB7XG4gICAgICByZXR1cm4gbmV3IFBvQ29tcGlsZXIob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLmNyZWF0ZShmb3JtYXQsIG9wdGlvbnMpXG4gIH1cbn1cbiJdfQ==
