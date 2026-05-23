import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import NumberInput, { NumberInputProps } from '../NumberInput';

describe('NumberInput', () => {
  describe('精度控制 (precision prop)', () => {
    test('precision=0 时应禁止输入小数点（onChange 不应被调用）', () => {
      const onChange = vi.fn();
      render(<NumberInput value={null} onChange={onChange} precision={0} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: '123.45' } });
      expect(onChange).not.toHaveBeenCalled();
    });

    test('precision=0 时应允许输入整数', () => {
      const onChange = vi.fn();
      render(<NumberInput value={null} onChange={onChange} precision={0} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: '123' } });
      expect(onChange).toHaveBeenCalledWith('123');
    });

    test('precision=2 时应允许最多2位小数', () => {
      const onChange = vi.fn();
      render(<NumberInput value={null} onChange={onChange} precision={2} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: '123.45' } });
      expect(onChange).toHaveBeenCalledWith('123.45');
    });

    test('precision=2 时应截断超过精度的小数', () => {
      const onChange = vi.fn();
      render(<NumberInput value={null} onChange={onChange} precision={2} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: '123.456' } });
      expect(onChange).toHaveBeenCalledWith('123.45');
    });

    test('precision=2 时应禁止多个小数点', () => {
      const onChange = vi.fn();
      render(<NumberInput value={null} onChange={onChange} precision={2} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: '123..45' } });
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('emptyValue 逻辑', () => {
    test('输入框为空时 onBlur 应触发 emptyValue', () => {
      const onChange = vi.fn();
      render(<NumberInput value="" onChange={onChange} emptyValue={0} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.blur(input);
      expect(onChange).toHaveBeenCalledWith('0');
    });

    test('输入为 "-" 时 onBlur 应触发 emptyValue', () => {
      const onChange = vi.fn();
      render(<NumberInput value="-" onChange={onChange} emptyValue={0} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.blur(input);
      expect(onChange).toHaveBeenCalledWith('0');
    });

    test('emptyValue 为 null 时 onBlur 应返回 null', () => {
      const onChange = vi.fn();
      render(<NumberInput value="" onChange={onChange} emptyValue={null} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.blur(input);
      expect(onChange).toHaveBeenCalledWith(null);
    });
  });

  describe('输入验证', () => {
    test('应允许输入负号 "-" ', () => {
      const onChange = vi.fn();
      render(<NumberInput value={null} onChange={onChange} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: '-' } });
      expect(onChange).toHaveBeenCalledWith('-');
    });

    test('应拒绝非数字字符', () => {
      const onChange = vi.fn();
      render(<NumberInput value={null} onChange={onChange} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'abc' } });
      expect(onChange).not.toHaveBeenCalled();
    });

    test('onBlur 时应规范化数值 (去除前导零)', () => {
      const onChange = vi.fn();
      render(<NumberInput value="00123" onChange={onChange} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.blur(input);
      expect(onChange).toHaveBeenCalledWith('123');
    });
  });

  describe('onChange 回调', () => {
    test('输入有效数值时应触发 onChange', () => {
      const onChange = vi.fn();
      render(<NumberInput value={null} onChange={onChange} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: '123' } });
      expect(onChange).toHaveBeenCalledWith('123');
    });

    test('清空输入时应触发 onChange(null)', () => {
      const onChange = vi.fn();
      render(<NumberInput value="123" onChange={onChange} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: '' } });
      expect(onChange).toHaveBeenCalledWith(null);
    });
  });

  describe('size 属性', () => {
    test('应正确传递 size 属性到 Ant Design Input', () => {
      const { rerender } = render(<NumberInput value={null} onChange={() => {}} size="small" />);
      let input = screen.getByRole('textbox');
      expect(input).toHaveClass('ant-input-sm');
      
      rerender(<NumberInput value={null} onChange={() => {}} size="large" />);
      input = screen.getByRole('textbox');
      expect(input).toHaveClass('ant-input-lg');
    });
  });
});
