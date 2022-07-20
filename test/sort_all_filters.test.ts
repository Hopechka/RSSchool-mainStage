import { sortAllFilters } from '../src/components/view/articleList';

describe("Check all filters sort's correct", () => {
    const testCase = [
        {
            testArr: [
                ['1', '2', '3', '4'],
                ['1', '2', '4'],
                ['4', '5'],
                ['1', '4', '5'],
            ],
            expected: ['4'],
        },
        {
            testArr: [['1', '2', '3', '4', '5'], ['2'], ['3'], ['4', '5']],
            expected: [],
        },
        {
            testArr: [['1', '2', '3', '4', '5'], [], [], ['4', '5']],
            expected: [],
        },
        {
            testArr: [
                ['1', '2', '3', '4', '5'],
                ['4', '5'],
            ],
            expected: ['4', '5'],
        },
    ];

    testCase.forEach((test) => {
        it(`Input ${test.testArr} expected to get: ${test.expected}`, () => {
            const res = sortAllFilters(test.testArr);
            expect(res).toEqual(test.expected);
        });
    });
});
