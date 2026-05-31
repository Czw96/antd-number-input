import type { InputProps } from "antd";
import { Input } from "antd";
import React, { useCallback, useMemo } from "react";

export interface NumberInputProps extends Omit<InputProps, "onChange" | "onBlur" | "value"> {
  value?: string | null; // 当前值, 支持 string / null
  emptyValue?: number | null; // 输入框为空时 onBlur 的默认值, 默认 null
  precision?: number; // 小数精度, 默认 0 (即整数)
  onChange?: (value: string | null) => void; // 值变化回调, 返回 string 或 null
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void; // 失去焦点时触发的回调
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  emptyValue = null,
  precision = 0,
  onChange,
  onBlur,
  ...restProps
}) => {
  // 确保精度为非负整数, 避免无效参数
  const safePrecision = useMemo(() => {
    return Math.max(0, Math.floor(precision ?? 0));
  }, [precision]);

  // 生成验证正则表达式
  const validationRegex = useMemo(() => {
    return safePrecision === 0 ? /^-?\d*$/ : new RegExp(`^-?\\d*(\\.\\d{0,${safePrecision}})?$`);
  }, [safePrecision]);

  // 处理输入值, 去除前导空格
  const inputValue = useMemo(() => (value ?? "").trimStart(), [value]);

  // 验证输入是否符合格式要求
  const validateInput = useCallback(
    (input: string): boolean => {
      // 单独的负号是允许的 (用户正在输入负数)
      if (input === "-") return true;
      // 单独的小数点也是允许的 (用户正在输入小数)
      if (input === ".") return true;
      // 单独的负号小数点也是允许的 (用户正在输入负小数)
      if (input === "-.") return true;
      // 根据精度生成对应的正则表达式
      return validationRegex.test(input);
    },
    [validationRegex]
  );

  // 处理输入变化
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValueString = event.target.value.trimStart();

      // 空值处理
      if (inputValueString === "") {
        return onChange?.(null);
      }

      // 单独负号或小数点处理, 允许中间状态
      if (inputValueString === "-" || inputValueString === "." || inputValueString === "-.") {
        return onChange?.(inputValueString);
      }

      // 输入有效, 直接返回
      if (validateInput(inputValueString)) {
        return onChange?.(inputValueString);
      }

      // 超出精度时自动截断
      if (safePrecision > 0) {
        const decimalIndex = inputValueString.indexOf(".");
        if (decimalIndex !== -1) {
          const truncatedValue = inputValueString.slice(0, decimalIndex + safePrecision + 1);
          if (validateInput(truncatedValue)) {
            return onChange?.(truncatedValue);
          }
        }
      }
    },
    [onChange, validateInput, safePrecision]
  );

  // 处理失焦事件
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      // 空值, 单独负号或单独小数点时, 使用 emptyValue
      if (inputValue === "" || inputValue === "-" || inputValue === ".") {
        onChange?.(emptyValue === null ? null : String(emptyValue));
        return onBlur?.(event);
      }

      // 验证是否为有效数字
      const numValue = Number(inputValue);
      if (isNaN(numValue)) {
        // 无效输入, 重置为 emptyValue
        onChange?.(emptyValue === null ? null : String(emptyValue));
        return onBlur?.(event);
      }

      // 规范化数值 (去除前导零等)
      const normalizedValue = String(numValue);
      if (inputValue !== normalizedValue) {
        onChange?.(normalizedValue);
        return onBlur?.(event);
      }

      onBlur?.(event);
    },
    [inputValue, emptyValue, onChange, onBlur]
  );

  return <Input {...restProps} value={inputValue} allowClear={true} onChange={handleChange} onBlur={handleBlur} />;
};

export default NumberInput;
