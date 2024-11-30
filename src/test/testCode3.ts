// 头部有注释

// 中间行有注释

// 导入语句行内尾部有注释

// 导入语句最后一行的下一行有注释

export interface TestCode {
  sourceCode: string;
  tempCode: string;
  exceptCode: string;
}

const scenes: Record<string, TestCode> = {
  commentInHead: {
    sourceCode: `// 头部单行
/*
 头部多行
 头部多行
*/
import React, { useCallback, useState, useMemo } from "react"; // 头部内联
// 中间内联
/*
  中间跨行1
  中间跨行2
*/
import { Skeleton } from "antd"; // 中间内联
// 尾部内联
/*
  尾部跨行1
  尾部跨行2
*/`,
    tempCode: `
// 尾部内联
/*
  尾部跨行1
  尾部跨行2
*/`,
    exceptCode: `// 中间内联
/*
  中间跨行1
  中间跨行2
*/
import { Skeleton } from "antd"; // 中间内联
// 头部单行
/*
 头部多行
 头部多行
*/
import React, { useCallback, useState, useMemo } from "react"; // 头部内联
// 尾部内联
/*
  尾部跨行1
  尾部跨行2
*/`,
  },
};

export { scenes };
