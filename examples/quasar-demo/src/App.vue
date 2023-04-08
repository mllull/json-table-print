<script setup lang="ts">
import { ref } from "vue";
import { createGenerator } from "@unocss/core";
import { presetUno } from "@unocss/preset-uno";

import {
  printTable,
  printTableHeadersType,
  printTableOptionsType,
} from "../../../src/index";

enum PrintTypeEnum {
  Bootstrap = "BOOTSTRAP",
  Uno = "UNOCSS",
}

const columns = [
  {
    name: "name",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "calories",
    align: "center",
    label: "Calories",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
  { name: "carbs", label: "Carbs (g)", field: "carbs" },
  { name: "protein", label: "Protein (g)", field: "protein" },
  { name: "sodium", label: "Sodium (mg)", field: "sodium" },
  {
    name: "calcium",
    label: "Calcium (%)",
    field: "calcium",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "iron",
    label: "Iron (%)",
    field: "iron",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: "2%",
    iron: "22%",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: "12%",
    iron: "6%",
  },
];

const demoTable = ref();

const callPrintTable = async (printType: PrintTypeEnum) => {
  let options: printTableOptionsType;

  const headers: printTableHeadersType = {
    name: "Dessert (100g serving)",
    calories: "Calories",
    protein: "Protein (g)",
  };

  if (printType === PrintTypeEnum.Bootstrap) {
    options = {
      headers,
      pageTitle: "Json Table Print - Demo using Bootstrap",
      classes: {
        pageTitle: "h2 text-center mb-4",
        table: "table table-striped text-center mt-4",
      },
      linkCSSLib:
        "https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css",
    };
  } else {
    const generator = createGenerator({
      presets: [presetUno()],
    });

    options = {
      headers,
      pageTitle: "Json Table Print - Demo using UnoCSS",
      classes: {
        pageTitle: "text-4xl text-center text-red-500 mb-4",
        table: "px-6 w-full text-sm text-center text-gray-500",
        thead: "bg-white border-b text-center",
        th: "py-4 text-center text-xl font-medium t text-gray-900",
      },
    };

    const { css } = await generator.generate(
      options.classes!.pageTitle! +
        options.classes!.table +
        options.classes!.thead +
        options.classes!.th
    );

    options.style = css;
  }

  printTable(options, demoTable.value.filteredSortedRows);
};
</script>

<template>
  <div class="q-mx-xl q-my-xl">
    <q-table
      ref="demoTable"
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top>
        <div class="row full-width justify-between">
          <b>Table demo</b>
          <div>
            <q-btn
              color="primary"
              no-caps
              label="Print current table using Bootstrap"
              @click="callPrintTable(PrintTypeEnum.Bootstrap)"
            />
            <q-btn
              class="q-ml-sm"
              color="grey"
              no-caps
              label="Print current table using UnoCSS"
              @click="callPrintTable(PrintTypeEnum.Uno)"
            />
          </div>
        </div>
      </template>
    </q-table>
    <p class="q-my-md"><b>Current Table JSON output:</b></p>
    <code>{{ demoTable?.filteredSortedRows }}</code>
  </div>
</template>
