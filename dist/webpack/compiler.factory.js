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
var ngx_import_1 = require("./ngx-import");
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
}(ngx_import_1.CompilerFactory));
exports.CompilerFactory = CompilerFactory;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrL2NvbXBpbGVyLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXdGO0FBRXhGO0lBQXFDLG1DQUFrQjtJQUF2RDs7SUFTQSxDQUFDO0lBUlEsc0JBQU0sR0FBYixVQUFjLE1BQWMsRUFBRSxPQUFZO1FBQ3hDLDJEQUEyRDtRQUMzRCxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTSxNQUFNLFlBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ3RDLENBQUM7SUFFSCxzQkFBQztBQUFELENBVEEsQUFTQyxDQVRvQyw0QkFBa0IsR0FTdEQ7QUFUWSwwQ0FBZSIsImZpbGUiOiJ3ZWJwYWNrL2NvbXBpbGVyLmZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21waWxlckZhY3RvcnkgYXMgTmd4Q29tcGlsZXJGYWN0b3J5LCBDb21waWxlckludGVyZmFjZSB9IGZyb20gJy4vbmd4LWltcG9ydCc7XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlckZhY3RvcnkgZXh0ZW5kcyBOZ3hDb21waWxlckZhY3Rvcnkge1xuICBzdGF0aWMgY3JlYXRlKGZvcm1hdDogc3RyaW5nLCBvcHRpb25zPzoge30pOiBDb21waWxlckludGVyZmFjZSB7XG4gICAgLy8gTmd4Q29tcGlsZXJGYWN0b3J5IGFjY2VwdHMgJ3BvdCcgZm9ybWF0IHJhdGhlciB0aGFuICdwbydcbiAgICBpZiAoZm9ybWF0ID09PSAncG8nKSB7XG4gICAgICBmb3JtYXQgPSAncG90JztcbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLmNyZWF0ZShmb3JtYXQsIG9wdGlvbnMpXG4gIH1cblxufVxuIl19
