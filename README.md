# JSON Print Table

[![NPM version](https://img.shields.io/npm/v/birpc?color=a1b858&label=)](https://www.npmjs.com/package/birpc)

> Renders a HTML Table from JSON data to a new browser tab and prints the table.

## Features

- Print JSON as a Table - Parse JSON data and transform it to HTML Table.
- Customizable - Style the table with any CSS lib like Bootstrap, Material, etc.
- UnoCSS integrated - Use the power from [UnoCSS](https://github.com/unocss/unocss) by avoiding to inject any CSSLib.
- Fully typed.

## Usage

Install package:

```bash
npm i @mllull/json-print-table
```

```ts
// ESM
import {
  printTable,
  printTableHeadersType,
  printTableOptionsType,
} from "@mllull/json-table-print";

// CommonJS
const {
  printTable,
  printTableHeadersType,
  printTableOptionsType,
} = require("@mllull/json-table-print");
```

```ts
printTable = async (
  options: printTableOptionsType,
  data: any
): Promise<boolean>
```


## Options

```ts
interface printTableHeadersType {
  [key: string]: string;
}

interface printTableOptionsType {
  pageTitle?: string;
  pageTitleClass?: string;
  headers: printTableHeadersType;
  tableClass?: string;
  theadClass?: string;
  thClass?: string;
  tbodyClass?: string;
  trClass?: string;
  tdClass?: string;
  linkCSSLib?: string;
}
```

### `pageTitle`

(Optional) The title of the page, it will be shown over the table.

### `pageTitleClass`

(Optional) Styles to be applied to `pageTitle` element.

### `headers`

Keys of the JSON data that will be shown in the table, the second value is the text of the header that will be displayed in the table.

### `tableClass`

(Optional) Styles to be applied to the generated `<table>` element.

### `theadClass`

(Optional) Styles to be applied to the generated `<thead>` element.

### `thClass`

(Optional) Styles to be applied to the generated `<th>` element.

### `tbodyClass`

(Optional) Styles to be applied to the generated `<tbody>` element.


### `trClass`

(Optional) Styles to be applied to the generated `<tr>` elements.


### `tdClass`

(Optional) Styles to be applied to the generated `<td>` elements.

### `linkCSSLib`

(Optional) URL to any CSS library that will be injected to the new browser tab. Styles from the CSS lib will be applied to the table and all of the above elements.


## Using UnoCSS magic

You can use [UnoCSS](https://github.com/unocss/unocss) in this library by not providing the `linkCSSLib` option and specifying any of the `*Class` options. This library will extract the generated css using UnoCSS and will inject as a `<style>` element.

Using UnoCSS it's usefull if you want to use this package without Internet connection or behind a restrictive Firewall.

## Examples

A [Quasar](https://quasar.dev/) demo app is available in [examples](./examples/) folder.


## License

[MIT](./LICENSE) License © 2023 [Mateu Llull](https://github.com/mllull).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/get-port-please?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/get-port-please
[npm-downloads-src]: https://img.shields.io/npm/dm/get-port-please?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/get-port-please
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/get-port-please/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/unjs/get-port-please
[license-src]: https://img.shields.io/github/license/unjs/get-port-please.svg?style=flat&colorA=18181B&colorB=F0DB4F
[license-href]: https://github.com/unjs/get-port-please/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsDocs.io-reference-18181B?style=flat&colorA=18181B&colorB=F0DB4F
[jsdocs-href]: https://www.jsdocs.io/package/get-port-please
