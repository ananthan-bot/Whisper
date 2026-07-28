import test from 'node:test';
import assert from 'node:assert/strict';

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

function resolveSpinnerClasses(size = 'md', className = '', colorClass = 'text-primary-600') {
  const spinnerSize = sizeMap[size] || sizeMap.md;
  return { spinnerSize, colorClass, className };
}

test('LoadingSpinner — resolves default props correctly', () => {
  const config = resolveSpinnerClasses();
  assert.equal(config.spinnerSize, 'w-6 h-6');
  assert.equal(config.colorClass, 'text-primary-600');
});

test('LoadingSpinner — maps size keys to Tailwind dimensions', () => {
  assert.equal(resolveSpinnerClasses('sm').spinnerSize, 'w-4 h-4');
  assert.equal(resolveSpinnerClasses('md').spinnerSize, 'w-6 h-6');
  assert.equal(resolveSpinnerClasses('lg').spinnerSize, 'w-8 h-8');
  assert.equal(resolveSpinnerClasses('xl').spinnerSize, 'w-12 h-12');
});

test('LoadingSpinner — falls back to md size for unknown size key', () => {
  assert.equal(resolveSpinnerClasses('unknown').spinnerSize, 'w-6 h-6');
});
