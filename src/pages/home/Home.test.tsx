import { returnDisplayModeStyle } from "./index";

test('returns correct display mode style', () => {
    expect(returnDisplayModeStyle('rows')).toBe('row');
    expect(returnDisplayModeStyle('columns')).toBe('column');
});