import { inner_html } from './inner_html';

test('Check previous pagination buttons disabled', () => {
    document.body.innerHTML = inner_html;
    const firstPage = document.querySelector('.btn-no-active-prev-prev') as HTMLButtonElement;
    const prevNarrow = document.querySelector('.btn-no-active-prev') as HTMLButtonElement;
    expect(firstPage.innerHTML).toContain('disabled');
    expect(prevNarrow.innerHTML).toContain('disabled');
});
