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
        if (format === 'po') {
            format = 'pot';
        }
        return _super.create.call(this, format, options);
    };
    return CompilerFactory;
}(biesbjerg_ngx_translate_extract_1.CompilerFactory));
exports.CompilerFactory = CompilerFactory;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlci5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFGQUE2RztBQUU3Rzs7R0FFRztBQUNIO0lBQXFDLG1DQUFrQjtJQUF2RDs7SUFTQSxDQUFDO0lBUlEsc0JBQU0sR0FBYixVQUFjLE1BQWMsRUFBRSxPQUFZO1FBQ3hDLDJEQUEyRDtRQUMzRCxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTSxNQUFNLFlBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ3RDLENBQUM7SUFFSCxzQkFBQztBQUFELENBVEEsQUFTQyxDQVRvQyxpREFBa0IsR0FTdEQ7QUFUWSwwQ0FBZSIsImZpbGUiOiJjb21waWxlci5mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcGlsZXJGYWN0b3J5IGFzIE5neENvbXBpbGVyRmFjdG9yeSwgQ29tcGlsZXJJbnRlcmZhY2UgfSBmcm9tICcuL2JpZXNiamVyZy1uZ3gtdHJhbnNsYXRlLWV4dHJhY3QnO1xuXG4vKipcbiAqIE92ZXJyaWRlcyBkZWZhdWx0IENvbXBpbGVyRmFjdG9yeSB0byB0YWtlICdwbycgZm9ybWF0IGZvciBnZXR0ZXh0IGluc3RlYWQgb2YgJ3BvdCdcbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBpbGVyRmFjdG9yeSBleHRlbmRzIE5neENvbXBpbGVyRmFjdG9yeSB7XG4gIHN0YXRpYyBjcmVhdGUoZm9ybWF0OiBzdHJpbmcsIG9wdGlvbnM/OiB7fSk6IENvbXBpbGVySW50ZXJmYWNlIHtcbiAgICAvLyBOZ3hDb21waWxlckZhY3RvcnkgYWNjZXB0cyAncG90JyBmb3JtYXQgcmF0aGVyIHRoYW4gJ3BvJ1xuICAgIGlmIChmb3JtYXQgPT09ICdwbycpIHtcbiAgICAgIGZvcm1hdCA9ICdwb3QnO1xuICAgIH1cbiAgICByZXR1cm4gc3VwZXIuY3JlYXRlKGZvcm1hdCwgb3B0aW9ucylcbiAgfVxuXG59XG4iXX0=
