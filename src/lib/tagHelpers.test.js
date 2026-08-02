import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { extractTags, getTagColorClass, filterTasksByTag } from './tagHelpers.js';

describe('tagHelpers', () => {
  test('extractTags parses hashtag strings and arrays correctly', () => {
    assert.deepEqual(extractTags('Fix issue #urgent with #frontend'), ['urgent', 'frontend']);
    assert.deepEqual(extractTags(['#design', 'code', '#DESIGN']), ['design', 'code']);
    assert.deepEqual(extractTags(null), []);
  });

  test('getTagColorClass returns consistent deterministic palette string', () => {
    const class1 = getTagColorClass('urgent');
    const class2 = getTagColorClass('urgent');
    assert.equal(class1, class2);
    assert.ok(class1.includes('bg-'));
  });

  test('filterTasksByTag filters tasks containing specified tag', () => {
    const tasks = [
      { id: '1', title: 'Task 1', tags: ['urgent', 'bug'] },
      { id: '2', title: 'Task 2', tags: ['feature'] }
    ];
    const urgentTasks = filterTasksByTag(tasks, 'urgent');
    assert.equal(urgentTasks.length, 1);
    assert.equal(urgentTasks[0].id, '1');
  });
});
