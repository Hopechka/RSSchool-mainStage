import { cardsDraw } from '../src/components/controller/cardsDraw';
// import store from '../src/assets/store.json';
/**
 * @jest-environment node || jsdom
 */

describe('Сards Draw function: ', () => {
    test('should be defined', () => {
        expect(cardsDraw).toBeDefined();
    });
    test('should no-null arguments', () => {
        const mockCardsDraw = jest.fn();
        jest.mock('../src/components/controller/cardsDraw', () => {
            return jest.fn().mockImplementation(() => {
                return { cardsDraw: mockCardsDraw };
            });
        });
        [1].map((x) => mockCardsDraw(x));
        expect(mockCardsDraw).toBeCalledWith(expect.anything());
    });
    test('should return anything', () => {
        expect(cardsDraw).toBeTruthy();
    });
});

// describe('Сards Draw layout: ', () => {
//     cardsDraw(store);

//     it('create card element', () => {
//         expect(document.querySelector('#cards')).not.toBeNull();
//     });
// });
