// patch ngx-translate-extract's index.ts to exclude cli, that will complain if no arg is passed to command line.

export * from '@biesbjerg/ngx-translate-extract/dist/utils/translation.collection';
export * from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
export * from '@biesbjerg/ngx-translate-extract/dist/cli/tasks/task.interface';
export * from '@biesbjerg/ngx-translate-extract/dist/cli/tasks/extract.task';
export * from '@biesbjerg/ngx-translate-extract/dist/parsers/parser.interface';
export * from '@biesbjerg/ngx-translate-extract/dist/parsers/abstract-template.parser';
export * from '@biesbjerg/ngx-translate-extract/dist/parsers/abstract-ast.parser';
export * from '@biesbjerg/ngx-translate-extract/dist/parsers/directive.parser';
export * from '@biesbjerg/ngx-translate-extract/dist/parsers/pipe.parser';
export * from '@biesbjerg/ngx-translate-extract/dist/parsers/service.parser';
export * from '@biesbjerg/ngx-translate-extract/dist/parsers/function.parser';
export * from '@biesbjerg/ngx-translate-extract/dist/compilers/compiler.interface';
export * from '@biesbjerg/ngx-translate-extract/dist/compilers/compiler.factory';
export * from '@biesbjerg/ngx-translate-extract/dist/compilers/json.compiler';
export * from '@biesbjerg/ngx-translate-extract/dist/compilers/namespaced-json.compiler';
export * from '@biesbjerg/ngx-translate-extract/dist/compilers/po.compiler';
