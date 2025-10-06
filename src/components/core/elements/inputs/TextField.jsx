import React from 'react';
import Spinner from '../Spinner';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import { VscLoading } from 'react-icons/vsc';

import './TextField.css';

export default function TextField({
  onChange = () => {},
  value = '',
  type = 'text',
  placeholder = '',
  maxLength = 100,
  minLength = 0,
  showCount = false,
  showCountMax = false,
  disabled = false,
  loading = false,
  error = false,
  success = false,
}) {
  return (
    <div
      className={`core-element-textfield ${
        error || loading || success ? 'core-element-textfield-with-symbol' : ''
      }`}
    >
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type}
        maxLength={maxLength}
        minLength={minLength}
      />
      {loading ? (
        <VscLoading className="core-element-textfield-loading" />
      ) : error ? (
        <FaXmark className="core-element-textfield-x" />
      ) : success ? (
        <FaCheck className="core-element-textfield-check" />
      ) : null}
      {showCount && (
        <div className="core-element-textfield-count">
          {value.length}
          {showCountMax ? ` / ${maxLength}` : ''}
        </div>
      )}
    </div>
  );
}
