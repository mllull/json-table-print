export const printTable = (options: any, data: any) => {
  let container = document.createElement("div");

  container.classList.add("p-datatable-wrapper");

  if (options && options.pageTitle) {
    let p = document.createElement("p");

    if (options && options.pageTitleClass) {
      let classes = options.pageTitleClass.split(" ");

      classes.forEach((clase: any) => {
        p.classList.add(clase);
      });
    }

    let text = document.createTextNode(options.pageTitle);

    p.appendChild(text);
    container.appendChild(p);
  }

  let table = document.createElement("table");

  table.style.width = "100%";
  let header = document.createElement("thead");
  let headerTr = document.createElement("tr");

  if (options && options.tableClass) {
    let classes = options.tableClass.split(" ");

    classes.forEach((clase: any) => {
      table.classList.add(clase);
    });
  } else {
    table.classList.add("p-datatable-table");
  }

  if (options && options.theaderClass) {
    let classes = options.theaderClass.split(" ");

    classes.forEach((clase: any) => {
      header.classList.add(clase);
    });
  } else {
    header.classList.add("p-datatable-thead");
  }

  for (let i = 0; i < Object.keys(options.headers).length; i++) {
    let column = Object.keys(options.headers)[i];

    let text = options.headers[column]; //(this.columnProp(column, 'header') || this.columnProp(column, 'field'));
    let textNode = document.createTextNode(text);
    let th = document.createElement("th");

    th.appendChild(textNode);
    headerTr.appendChild(th);
  }

  header.appendChild(headerTr);
  table.appendChild(header);

  //body
  if (data) {
    let body = document.createElement("tbody");

    if (options && options.tbodyClass) {
      let classes = options.tbodyClass.split(" ");

      classes.forEach((clase: any) => {
        body.classList.add(clase);
      });
    } else {
      body.classList.add("p-datatable-tbody");
    }

    data.forEach((record: any) => {
      let tr = document.createElement("tr");

      if (options && options.trClass) {
        let classes = options.trClass.split(" ");

        classes.forEach((clase: any) => {
          tr.classList.add(clase);
        });
      }

      //   let rowInitiated = false;
      for (let i = 0; i < Object.keys(options.headers).length; i++) {
        let column = Object.keys(options.headers)[i];
        let td = document.createElement("td");

        if (options && options.tdClass) {
          let classes = options.tdClass.split(" ");

          classes.forEach((clase: any) => {
            td.classList.add(clase);
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
  let dataTableContainer = document.createElement("div");

  dataTableContainer.classList.add("p-datatable");

  dataTableContainer.appendChild(container);
  let newWin = window.open("");

  if (options && options.linkCSSLib) {
    if (newWin)
      newWin.document.write(
        "<html><head>" +
          '<link href="' +
          options.linkCSSLib +
          '" rel="stylesheet" onload="print(); window.close();">' +
          "</head><body>" +
          dataTableContainer.outerHTML +
          "</body></html>"
      );
  } else {
    if (newWin)
      newWin.document.write(
        "<html><head>" +
          '<link href="https://cdn.jsdelivr.net/npm/primevue/resources/themes/saga-blue/theme.css" rel="stylesheet" onload="print();">' +
          "</head><body>" +
          dataTableContainer.outerHTML +
          "</body></html>"
      );
  }
};
