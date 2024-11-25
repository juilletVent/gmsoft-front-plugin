import { ImportInfoClass } from "src/helper/ImportInfoHelper";

export function sortImportAst(
  importInfoList: ImportInfoClass[],
  hasGroup: boolean
) {
  const calcSpeedIndexMap = new Map<string, ImportInfoClass[]>();

  importInfoList.forEach((importInfo) => {
    // 非资源导入，按照libType进行分组，资源导入独立成组
    if (importInfo.importType !== "resourceImport") {
      // Npm组织类型包，放第一顺位
      if (importInfo.libType === "npm-organize") {
        const buffer = calcSpeedIndexMap.get("npm-organize");
        if (buffer) {
          buffer.push(importInfo);
        } else {
          calcSpeedIndexMap.set("npm-organize", [importInfo]);
        }
      }

      // Npm普通包，放第二顺位
      if (importInfo.libType === "npm") {
        const buffer = calcSpeedIndexMap.get("npm");
        if (buffer) {
          buffer.push(importInfo);
        } else {
          calcSpeedIndexMap.set("npm", [importInfo]);
        }
      }

      // 本地别名，放第三顺位
      if (importInfo.libType === "alias") {
        const buffer = calcSpeedIndexMap.get("alias");
        if (buffer) {
          buffer.push(importInfo);
        } else {
          calcSpeedIndexMap.set("alias", [importInfo]);
        }
      }

      // 相对路径，放第四顺位
      if (importInfo.libType === "relative") {
        const buffer = calcSpeedIndexMap.get("relative");
        if (buffer) {
          buffer.push(importInfo);
        } else {
          calcSpeedIndexMap.set("relative", [importInfo]);
        }
      }
    }

    // 资源导入，放最后
    if (importInfo.importType === "resourceImport") {
      const buffer = calcSpeedIndexMap.get("resourceImport");
      if (buffer) {
        buffer.push(importInfo);
      } else {
        calcSpeedIndexMap.set("resourceImport", [importInfo]);
      }
    }
  });

  // 组内排序
  for (const [key, value] of calcSpeedIndexMap) {
    // 非资源组内排序
    if (key !== "resourceImport") {
      calcSpeedIndexMap.set(key, orderImportInfoInGroup(value));
    } else {
      // 资源组内排序
      calcSpeedIndexMap.set(key, orderImportInfoByLibLength(value));
    }
  }

  // 排序分组，按照此分组进行排序
  const orderList = [
    "npm-organize",
    "npm",
    "alias",
    "relative",
    "resourceImport",
  ];
  // 计算最后一个分组的索引
  let lastGroupIndex = -1;
  orderList.forEach((order, index) => {
    const buffer = calcSpeedIndexMap.get(order);
    if (buffer) {
      lastGroupIndex = index;
    }
  });

  // 数据整合排序整合
  const sortedImportInfoBuffer: ImportInfoClass[] = [];

  orderList.forEach((order, index) => {
    const buffer = calcSpeedIndexMap.get(order);
    if (buffer) {
      // 排序分组中的最后一个元素后面增加一个换行符，用于分隔不同组
      if (index !== lastGroupIndex && hasGroup) {
        buffer[buffer.length - 1].extraNewLine = true;
      }
      sortedImportInfoBuffer.push(...buffer);
    }
  });

  return sortedImportInfoBuffer;
}

// 组内按照importType排序
function orderImportInfoInGroup(importInfoList: ImportInfoClass[]) {
  const calcSpeedIndexMap = new Map<string, ImportInfoClass[]>();

  importInfoList.forEach((importInfo) => {
    const buffer = calcSpeedIndexMap.get(importInfo.importType);
    if (buffer) {
      buffer.push(importInfo);
    } else {
      calcSpeedIndexMap.set(importInfo.importType, [importInfo]);
    }
  });

  // 组内排序
  for (const [key, value] of calcSpeedIndexMap) {
    calcSpeedIndexMap.set(key, orderImportInfoByImportSymbolLength(value));
  }

  // 数据整合排序整合
  const sortedImportInfoBuffer: ImportInfoClass[] = [];
  const orderList = ["defaultImport", "namedImport", "mixImport"];
  orderList.forEach((order) => {
    const buffer = calcSpeedIndexMap.get(order);
    if (buffer) {
      sortedImportInfoBuffer.push(...buffer);
    }
  });

  return sortedImportInfoBuffer;
}

// 组内按照importSymbolLength排序
function orderImportInfoByImportSymbolLength(
  importInfoList: ImportInfoClass[]
) {
  return importInfoList.sort((a, b) => {
    if (a.importSymbolLength === b.importSymbolLength) {
      return a.libSymbolLength - b.libSymbolLength;
    }
    return a.importSymbolLength - b.importSymbolLength;
  });
}

// 资源组内按照X排序
function orderImportInfoByLibLength(importInfoList: ImportInfoClass[]) {
  return importInfoList.sort((a, b) => {
    if (a.importSymbolLength === b.importSymbolLength) {
      return a.libSymbolLength - b.libSymbolLength;
    }
    return a.importSymbolLength - b.importSymbolLength;
  });
}
