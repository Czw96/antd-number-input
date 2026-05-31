<p align="center">
  <h1 align="center">antd-number-input</h1>
  <p align="center">基于 Ant Design 的 React 数字输入框组件，支持精度控制、验证与自动格式化。</p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/antd-number-input"><img src="https://img.shields.io/npm/v/antd-number-input" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/antd-number-input"><img src="https://img.shields.io/npm/dm/antd-number-input" alt="npm downloads" /></a>
  <a href="https://github.com/Czw96/antd-number-input/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/antd-number-input" alt="license" /></a>
  <a href="https://github.com/Czw96/antd-number-input"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen" alt="PRs Welcome" /></a>
</p>

中文 | [English](https://github.com/Czw96/antd-number-input/blob/master/README_EN.md)

---

## 特性

- **精度控制** — 通过 `precision` 设定小数位数，`0` 即为整数模式
- **自动格式化** — 失焦时自动去除前导零、规范化数值（`"00123"` → `"123"`）
- **空值回退** — 输入框清空并失焦时，可回退到指定的默认值
- **输入验证** — 基于正则的验证，拦截非法字符、超精度等异常输入
- **Ant Design 集成** — 继承 `InputProps`，开箱即用所有 antd.Input 特性

## 安装

```bash
npm install antd-number-input
```

## 在线演示

[antd-number-input demo](https://demo.29dev.cn/antd-number-input)

本地启动预览：

```bash
npm run preview
```

## 依赖要求

| 依赖 | 版本 |
|------|------|
| react | >=18.2.0 |
| react-dom | >=18.2.0 |
| antd | >=6.0.0 |

## 使用示例

```tsx
import { NumberInput } from 'antd-number-input';

function App() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <NumberInput
      value={value}
      onChange={setValue}
      precision={2}
      placeholder="请输入金额"
      disabled={false}
      emptyValue={0}
    />
  );
}
```

## API

`NumberInputProps` 继承 `Omit<InputProps, 'onChange' | 'onBlur' | 'value'>`，可直接使用所有 antd.Input 标准属性（`size`、`placeholder`、`disabled`、`maxLength`、`className`、`style` 等）。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `string \| null` | — | 当前值 |
| `onChange` | `(value: string \| null) => void` | — | 值变化回调，返回字符串或 null |
| `onBlur` | `(event: React.FocusEvent<HTMLInputElement>) => void` | — | 失焦回调，在内部校验完成后触发 |
| `precision` | `number` | `0` | 小数精度，`0` 为整数，负数会被修正为 0 |
| `emptyValue` | `number \| null` | `null` | 清空/`-`/`.` 后失焦时的默认值 |

## 行为说明

| 场景 | 行为 |
|------|------|
| `precision={0}` | 禁止小数点，仅允许整数 |
| `precision={2}` | 最多 2 位小数，超出自动截断 |
| `precision` 为负 | 自动修正为 0 |
| 输入 `-` 或 `.` | 允许作为中间状态（用户正输入负数或小数） |
| 输入前导空格 | 自动去除 |
| 输入非法字符 | 静默拦截，不触发 onChange |
| 清空后失焦 | 回退至 `emptyValue`（默认 null） |
| 失焦规范化 | `"00123"` → `"123"`，`"abc"` → `emptyValue` |

## 本地开发

```bash
git clone https://github.com/Czw96/antd-number-input.git
cd antd-number-input
npm install

npm run dev    # 监听构建
npm run build  # 生产构建
```

## 许可证

MIT © Czw96
