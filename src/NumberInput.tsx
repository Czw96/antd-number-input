import { Input } from "antd";
import React, { useMemo } from "react";

export interface NumberInputProps {
  /** 当前值，支持 number / string / null */
  value?: number | string | null;
  /** 输入框为空时 onBlur 的默认值，默认 null */
  emptyValue?: number | null;
  /** 小数精度，默认 0（即整数） */
  precision?: number;
  /** 输入框尺寸 */
  size?: "small" | "middle" | "large";
  /** 值变化回调，返回 string 或 null */
  onChange?: (value: string | null) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ value, emptyValue = null, precision = 0, size = "middle", onChange }) => {
  const inputValue = useMemo(() => String(value ?? "").trimStart(), [value]);

  return (
    <Input
      value={inputValue}
      size={size}
      allowClear
      onChange={(event) => {
        const inputValueString = event.target.value.trimStart();
        if (inputValueString === "") {
          return onChange?.(null);
        }

        if (inputValueString === "-" || inputValueString === "0-") {
          return onChange?.("-");
        }

        // 非数字字符
        const inputValueNumber = Number(inputValueString);
        if (isNaN(inputValueNumber)) return;

        // 精度为 0 时，不能包含小数点
        if (precision === 0) {
          if (inputValueString.includes(".")) return;
          return onChange?.(inputValueString);
        }

        // 包含多个小数点
        const dotCount = inputValueString.split(".").length - 1;
        if (dotCount > 1) return;

        // 超出小数精度
        const decimalIndex = inputValueString.indexOf(".");
        if (decimalIndex !== -1) {
          const decimalPart = inputValueString.slice(decimalIndex + 1);
          if (decimalPart.length > precision) {
            return onChange?.(inputValueString.slice(0, decimalIndex + precision + 1));
          }
        }

        onChange?.(inputValueString);
      }}
      onBlur={() => {
        if (inputValue === "" || inputValue === "-") {
          return onChange?.(emptyValue === null ? null : String(emptyValue));
        }

        if (inputValue !== String(Number(inputValue))) {
          return onChange?.(String(Number(inputValue)));
        }
      }}
    />
  );
};

export default NumberInput;
