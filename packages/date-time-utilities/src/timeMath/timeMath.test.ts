import * as TimeMath from './timeMath';

describe('timeMath', () => {
  it('can add minutes', () => {
    let startDate;
    let result;

    startDate = new Date(2015, 3, 31);
    result = TimeMath.addMinutes(startDate, 30);
    expect(result.getMinutes()).toBe(30);

    startDate = new Date(2021, 6, 14, 5, 9, 21);
    result = TimeMath.addMinutes(startDate, 30);
    expect(result.getMinutes()).toBe(39);

    startDate = new Date(2021, 6, 14, 5, 30, 21);
    result = TimeMath.addMinutes(startDate, 30);
    expect(result.getMinutes()).toBe(0);

    startDate = new Date(2021, 6, 14, 5, 46, 21);
    result = TimeMath.addMinutes(startDate, 35);
    expect(result.getMinutes()).toBe(21);

    startDate = new Date(2021, 6, 14, 5, 46, 21);
    result = TimeMath.addMinutes(startDate, 126);
    expect(result.getMinutes()).toBe(52);

    startDate = new Date(2021, 6, 14, 5, 46, 21);
    result = TimeMath.addMinutes(startDate, 0);
    expect(result.getMinutes()).toBe(46);

    startDate = new Date(2021, 6, 14, 5, 46, 21);
    result = TimeMath.addMinutes(startDate, -30);
    expect(result.getMinutes()).toBe(16);

    startDate = new Date(2021, 6, 14, 5, 24, 21);
    result = TimeMath.addMinutes(startDate, -48);
    expect(result.getMinutes()).toBe(36);

    startDate = new Date(2021, 6, 14, 5, 24, 21);
    result = TimeMath.addMinutes(startDate, -97);
    expect(result.getMinutes()).toBe(47);
  });
});
