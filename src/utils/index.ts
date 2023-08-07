import { Property } from '@/interface/common';
/**
 * @description 生成[{label: 'xxx', value: 'xxx'}, ...]格式的数组
 * @param {string} input
 * @returns {Property[]}
 */
export function parseProperties(input: string): Property[] {
  const regex = /\/\*\*([^*]*)\*\/\s*\n\s*([^:]+):\s*\??\s*([^\n;]+)/g;
  const properties: Property[] = [];
  let match;
  while ((match = regex.exec(input)) !== null) {
    const label = match[1].trim();
    const value = match[2].replace('?', '').trim();
    properties.push({ label, value });
  }

  return properties;
}
