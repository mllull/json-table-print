export interface printTableHeadersType {
  [key: string]: string;
}

export interface printTableElementsType {
  pageTitle?: string;
  table?: string;
  thead?: string;
  th?: string;
  tbody?: string;
  tr?: string;
  td?: string;
}

export interface printTableOptionsType {
  pageTitle?: string;
  headers: printTableHeadersType;
  classes?: printTableElementsType;
  style?: string;
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
  let container = document.createElement("div");

  if (options && options.pageTitle) {
    let p = document.createElement("p");

    if (options && options.classes?.pageTitle) {
      let classes = options.classes.pageTitle.split(" ");

      classes.forEach((cssClass: any) => {
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

  if (options && options.classes?.table) {
    let classes = options.classes.table.split(" ");

    classes.forEach((cssClass: any) => {
      table.classList.add(cssClass);
    });
  }

  if (options && options.classes?.thead) {
    let classes = options.classes.thead.split(" ");

    classes.forEach((cssClass: any) => {
      header.classList.add(cssClass);
    });
  }

  for (let i = 0; i < Object.keys(options.headers).length; i++) {
    let column = Object.keys(options.headers)[i];

    let text = options.headers[column];
    let textNode = document.createTextNode(text);
    let th = document.createElement("th");

    th.appendChild(textNode);

    if (options && options.classes?.th) {
      let classes = options.classes.th.split(" ");

      classes.forEach((cssClass: any) => {
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

    if (options && options.classes?.tbody) {
      let classes = options.classes.tbody.split(" ");

      classes.forEach((cssClass: any) => {
        body.classList.add(cssClass);
      });
    } else {
    }

    data.forEach((record: any) => {
      let tr = document.createElement("tr");

      if (options && options.classes?.tr) {
        let classes = options.classes.tr.split(" ");

        classes.forEach((cssClass: any) => {
          tr.classList.add(cssClass);
        });
      }

      for (let i = 0; i < Object.keys(options.headers).length; i++) {
        let column = Object.keys(options.headers)[i];
        let td = document.createElement("td");

        if (options && options.classes?.td) {
          let classes = options.classes.td.split(" ");

          classes.forEach((cssClass: any) => {
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

  const closeTabScript =
    "<script>window.addEventListener('afterprint', (event) => {window.setTimeout(() => {window.close();}, 1);});</script>";

  const linkContainer = options.linkCSSLib
    ? `<link href="${options.linkCSSLib}" rel="stylesheet" onload="window.print()">`
    : "";

  const htmlString = `<html><head>${
    options.style ? "<style>" + options.style + "</style>" : ""
  }${linkContainer}</head>${closeTabScript}<body>${container.outerHTML}</body>${
    options.linkCSSLib ? "" : "<script>window.print()</script>"
  }</html>`;

  let newWin = window.open("", "_blank");
  if (newWin) newWin.document.write(htmlString);

  const tabOpened = newWin !== null;
  return tabOpened;
};
