import { test, expect } from '@playwright/test';

test.describe('Expect Assertions', () => {

    test('verification', async ({ page }) => {


        expect(1 + 1).toBe(2);
        expect(1 + 1).not.toBe(3);
        let ac = false;
        expect(ac).toBeFalsy();
        expect(1 + 1).toBeGreaterThan(1);
        expect(1 + 1).toBeLessThan(3);
        expect(true).toBeTruthy();
        expect({ name: 'Rahul', age: 20 }).toEqual({ name: 'Rahul', age: 20 });
    });
});