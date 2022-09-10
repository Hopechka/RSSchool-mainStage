import { inner_html } from './inner_html';
document.body.innerHTML = inner_html;
import { filterOut, getFilteredData } from '../src/components/controller/filterSelect';

/**
 * @jest-environment node || jsdom
 */

const filteredData = getFilteredData();

describe('Check filters out correct', () => {
    const testCase = [
        {
            testObj: { brand: [], color: ['Yellow'], factory: [], material: [] },
            expected: true,
        },
        {
            testObj: { brand: [], color: ['Yellow', 'Red'], factory: [], material: [] },
            expected: true,
        },
        {
            testObj: { brand: [], color: [], factory: [], material: [] },
            expected: false,
        },
        {
            testObj: { brand: [], color: [], factory: [], material: [] },
            expected: false,
        },
        {
            testObj: { brand: ['Old Cars', 'USSR'], color: ['Green/Grey'], factory: [], material: [] },
            expected: true,
        },
    ];

    testCase.forEach((test) => {
        it(`Input ${test.testObj} expected to get: ${test.expected}`, () => {
            const res = filterOut(filteredData, test.testObj);
            expect(res).toBeTruthy();
        });
    });
});
