"use strict";
// patch ngx-translate-extract's index.ts to exclude cli, that will complain if no arg is passed to command line.
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("@biesbjerg/ngx-translate-extract/dist/utils/translation.collection"));
__export(require("@biesbjerg/ngx-translate-extract/dist/utils/utils"));
__export(require("@biesbjerg/ngx-translate-extract/dist/cli/tasks/extract.task"));
__export(require("@biesbjerg/ngx-translate-extract/dist/parsers/abstract-template.parser"));
__export(require("@biesbjerg/ngx-translate-extract/dist/parsers/abstract-ast.parser"));
__export(require("@biesbjerg/ngx-translate-extract/dist/parsers/directive.parser"));
__export(require("@biesbjerg/ngx-translate-extract/dist/parsers/pipe.parser"));
__export(require("@biesbjerg/ngx-translate-extract/dist/parsers/service.parser"));
__export(require("@biesbjerg/ngx-translate-extract/dist/parsers/function.parser"));
__export(require("@biesbjerg/ngx-translate-extract/dist/compilers/compiler.factory"));
__export(require("@biesbjerg/ngx-translate-extract/dist/compilers/json.compiler"));
__export(require("@biesbjerg/ngx-translate-extract/dist/compilers/namespaced-json.compiler"));
__export(require("@biesbjerg/ngx-translate-extract/dist/compilers/po.compiler"));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrL25neC1pbXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlIQUFpSDs7Ozs7QUFFakgsd0ZBQW1GO0FBQ25GLHVFQUFrRTtBQUVsRSxrRkFBNkU7QUFFN0UsNEZBQXVGO0FBQ3ZGLHVGQUFrRjtBQUNsRixvRkFBK0U7QUFDL0UsK0VBQTBFO0FBQzFFLGtGQUE2RTtBQUM3RSxtRkFBOEU7QUFFOUUsc0ZBQWlGO0FBQ2pGLG1GQUE4RTtBQUM5RSw4RkFBeUY7QUFDekYsaUZBQTRFIiwiZmlsZSI6IndlYnBhY2svbmd4LWltcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHBhdGNoIG5neC10cmFuc2xhdGUtZXh0cmFjdCdzIGluZGV4LnRzIHRvIGV4Y2x1ZGUgY2xpLCB0aGF0IHdpbGwgY29tcGxhaW4gaWYgbm8gYXJnIGlzIHBhc3NlZCB0byBjb21tYW5kIGxpbmUuXG5cbmV4cG9ydCAqIGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0L2Rpc3QvdXRpbHMvdHJhbnNsYXRpb24uY29sbGVjdGlvbic7XG5leHBvcnQgKiBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC9kaXN0L3V0aWxzL3V0aWxzJztcbmV4cG9ydCAqIGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0L2Rpc3QvY2xpL3Rhc2tzL3Rhc2suaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0L2Rpc3QvY2xpL3Rhc2tzL2V4dHJhY3QudGFzayc7XG5leHBvcnQgKiBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC9kaXN0L3BhcnNlcnMvcGFyc2VyLmludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC9kaXN0L3BhcnNlcnMvYWJzdHJhY3QtdGVtcGxhdGUucGFyc2VyJztcbmV4cG9ydCAqIGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0L2Rpc3QvcGFyc2Vycy9hYnN0cmFjdC1hc3QucGFyc2VyJztcbmV4cG9ydCAqIGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0L2Rpc3QvcGFyc2Vycy9kaXJlY3RpdmUucGFyc2VyJztcbmV4cG9ydCAqIGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0L2Rpc3QvcGFyc2Vycy9waXBlLnBhcnNlcic7XG5leHBvcnQgKiBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC9kaXN0L3BhcnNlcnMvc2VydmljZS5wYXJzZXInO1xuZXhwb3J0ICogZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QvZGlzdC9wYXJzZXJzL2Z1bmN0aW9uLnBhcnNlcic7XG5leHBvcnQgKiBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC9kaXN0L2NvbXBpbGVycy9jb21waWxlci5pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QvZGlzdC9jb21waWxlcnMvY29tcGlsZXIuZmFjdG9yeSc7XG5leHBvcnQgKiBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC9kaXN0L2NvbXBpbGVycy9qc29uLmNvbXBpbGVyJztcbmV4cG9ydCAqIGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0L2Rpc3QvY29tcGlsZXJzL25hbWVzcGFjZWQtanNvbi5jb21waWxlcic7XG5leHBvcnQgKiBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC9kaXN0L2NvbXBpbGVycy9wby5jb21waWxlcic7XG4iXX0=
