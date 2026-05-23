<p align="center">
  <h1 align="center">antd-number-input</h1>
  <p align="center">A React number input component based on Ant Design, with precision control, validation &amp; auto-formatting.</p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/antd-number-input"><img src="https://img.shields.io/npm/v/antd-number-input" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/antd-number-input"><img src="https://img.shields.io/npm/dm/antd-number-input" alt="npm downloads" /></a>
  <a href="https://github.com/Czw96/antd-number-input/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/antd-number-input" alt="license" /></a>
  <a href="https://github.com/Czw96/antd-number-input"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen" alt="PRs Welcome" /></a>
</p>

English | [中文](./README_CN.md)

---

## Features

- **Precision control** — set decimal precision via `precision`, `0` for integer mode
- **Auto formatting** — strips leading zeros and normalizes on blur (`"00123"` → `"123"`)
- **Empty value** — when input is cleared and blurred, falls back to a default you define
- **Input validation** — blocks non-numeric characters, multiple dots, and excess precision
- **Ant Design native** — built on `antd.Input`, supports `small` / `middle` / `large` sizes

## Installation

```bash
npm install antd-number-input
```

## Peer Dependencies

| Package | Version |
|---------|---------|
| react | >=18.2.0 |
| react-dom | >=18.2.0 |
| antd | >=6.0.0 |

## Usage

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

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| string \| null` | — | Current value |
| `onChange` | `(value: string \| null) => void` | — | Change callback, returns string or null |
| `precision` | `number` | `0` | Decimal precision, `0` for integer |
| `emptyValue` | `number \| null` | `null` | Fallback value when empty on blur |
| `size` | `"small" \| "middle" \| "large"` | `"middle"` | Input size |

## Behavior

| Scenario | Behavior |
|----------|----------|
| `precision={0}` | Disallows decimal point, integers only |
| `precision={2}` | Up to 2 decimal places, truncates excess |
| Non-numeric input | onChange is not called |
| Multiple dots | onChange is not called |
| Cleared & blurred | Falls back to `emptyValue` (default null) |
| Blur normalization | `"00123"` → `"123"` |

## Development

```bash
git clone https://github.com/Czw96/antd-number-input.git
cd antd-number-input
npm install

npm run dev         # watch build
npm run build       # production build
npm run test        # run tests
npm run test:watch  # watch tests
```

## License

MIT © Czw96