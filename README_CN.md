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

[English](./README.md) | 中文

---

## 特性

- **精度控制** — 通过 `precision` 设定小数位数，`0` 即为整数模式
- **自动格式化** — 失焦时自动去除前导零、规范化数值（`"00123"` → `"123"`）
- **回退值** — 输入框清空并失焦时，可回退到指定的默认值
- **输入验证** — 非数字字符、多余小数点、超精度等输入会被自动拦截
- **Ant Design 集成** — 基于 `antd.Input`，支持 `small` / `middle` / `large` 三种尺寸

## 安装

```bash
npm install antd-number-input
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
      size="middle"
      emptyValue={0}
    />
  );
}
```

## API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `number \| string \| null` | — | 当前值 |
| `onChange` | `(value: string \| null) => void` | — | 值变化回调，返回字符串或 null |
| `precision` | `number` | `0` | 小数精度，`0` 为整数 |
| `emptyValue` | `number \| null` | `null` | 清空后失焦时回退到此值 |
| `size` | `"small" \| "middle" \| "large"` | `"middle"` | 输入框尺寸 |

## 行为说明

| 场景 | 行为 |
|------|------|
| `precision={0}` | 禁止小数点，仅允许整数 |
| `precision={2}` | 最多 2 位小数，超出自动截断 |
| 输入非数字 | 不触发 onChange |
| 输入多个小数点 | 不触发 onChange |
| 清空后失焦 | 回退至 `emptyValue`（默认 null） |
| 失焦规范化 | `"00123"` → `"123"` |

## 本地开发

```bash
git clone https://github.com/Czw96/antd-number-input.git
cd antd-number-input
npm install

npm run dev         # 监听构建
npm run build       # 生产构建
npm run test        # 运行测试
npm run test:watch  # 测试监听
```

## 许可证

MIT © Czw96
