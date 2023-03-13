import { createGenerator } from "@unocss/core";
import { presetUno } from "@unocss/preset-uno";

export interface printTableHeadersType {
  [key: string]: string;
}

export interface printTableOptionsType {
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

/**
 * Renders a HTML Table into a new browser window and prints the table.
 * @param options printTableOptionsType
 * @param data any
 * @returns boolean
 */

export const printTable = async (
  options: printTableOptionsType,
  data: any
): Promise<boolean> => {
  const unoClasses: string[] = [];

  let container = document.createElement("div");

  if (options && options.pageTitle) {
    let p = document.createElement("p");

    if (options && options.pageTitleClass) {
      let classes = options.pageTitleClass.split(" ");

      classes.forEach((cssClass: any) => {
        if (!unoClasses.includes(cssClass)) unoClasses.push(cssClass);
        p.classList.add(cssClass);
      });
    }

    let text = document.createTextNode(options.pageTitle);

    p.appendChild(text);
    container.appendChild(p);
  }

  let table = document.createElement("table");

  let header = document.createElement("thead");
  let headerTr = document.createElement("tr");

  if (options && options.tableClass) {
    let classes = options.tableClass.split(" ");

    classes.forEach((cssClass: any) => {
      if (!unoClasses.includes(cssClass)) unoClasses.push(cssClass);
      table.classList.add(cssClass);
    });
  }

  if (options && options.theadClass) {
    let classes = options.theadClass.split(" ");

    classes.forEach((cssClass: any) => {
      if (!unoClasses.includes(cssClass)) unoClasses.push(cssClass);
      header.classList.add(cssClass);
    });
  }

  for (let i = 0; i < Object.keys(options.headers).length; i++) {
    let column = Object.keys(options.headers)[i];

    let text = options.headers[column];
    let textNode = document.createTextNode(text);
    let th = document.createElement("th");

    th.appendChild(textNode);

    if (options && options.thClass) {
      let classes = options.thClass.split(" ");

      classes.forEach((cssClass: any) => {
        if (!unoClasses.includes(cssClass)) unoClasses.push(cssClass);
        th.classList.add(cssClass);
      });
    }
    headerTr.appendChild(th);
  }

  header.appendChild(headerTr);
  table.appendChild(header);

  //body
  if (data) {
    let body = document.createElement("tbody");

    if (options && options.tbodyClass) {
      let classes = options.tbodyClass.split(" ");

      classes.forEach((cssClass: any) => {
        if (!unoClasses.includes(cssClass)) unoClasses.push(cssClass);
        body.classList.add(cssClass);
      });
    } else {
    }

    data.forEach((record: any) => {
      let tr = document.createElement("tr");

      if (options && options.trClass) {
        let classes = options.trClass.split(" ");

        classes.forEach((cssClass: any) => {
          if (!unoClasses.includes(cssClass)) unoClasses.push(cssClass);
          tr.classList.add(cssClass);
        });
      }

      for (let i = 0; i < Object.keys(options.headers).length; i++) {
        let column = Object.keys(options.headers)[i];
        let td = document.createElement("td");

        if (options && options.tdClass) {
          let classes = options.tdClass.split(" ");

          classes.forEach((cssClass: any) => {
            if (!unoClasses.includes(cssClass)) unoClasses.push(cssClass);
            td.classList.add(cssClass);
          });
        }

        let cellData = record[column];
        let text = document.createTextNode(cellData);

        td.appendChild(text);
        tr.appendChild(td);
      }

      body.appendChild(tr);
    });
    table.appendChild(body);
  }

  container.appendChild(table);

  const generator = createGenerator({
    presets: [presetUno()],
  });
  const { css } = await generator.generate(unoClasses);

  const closeTabScript =
    "<script>window.addEventListener('afterprint', (event) => {window.setTimeout(() => {window.close();}, 1);});</script>";

  const linkContainer = options.linkCSSLib
    ? `<link href="${options.linkCSSLib}" rel="stylesheet" onload="window.print()">`
    : null;

  const htmlString = `<html><head>${
    options.linkCSSLib ? "" : "<style>" + css + "</style>"
  }${linkContainer ? linkContainer : ""}</head>${closeTabScript}<body>${
    container.outerHTML
  }</body>${
    options.linkCSSLib ? "" : "<script>window.print()</script>"
  }</html>`;

  let newWin = window.open("", "_blank");
  if (newWin) newWin.document.write(htmlString);

  const tabOpened = newWin !== null;
  return tabOpened;
};
