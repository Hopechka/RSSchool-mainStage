import { getModalWindow } from '../src/components/view/articleList';
/**
 * @jest-environment node || jsdom
 */

test('Checking the display of the modal window', () => {
    expect(getModalWindow([])).toBe('block');
});
