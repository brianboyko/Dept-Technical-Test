import humanizeTime from './humanizeTime';

describe('utils/humanizeTime()', () => {
  it('humanizes the time', () => {
    const twentyFirstBirthday = new Date('2001-03-29');
    const whenIWriteTheTest = new Date('2022-03-05');
    expect(humanizeTime(twentyFirstBirthday, whenIWriteTheTest)).toBe(
      '20 years, 11 months, 6 days, 4 hours, 30 minutes'
    );
  });
});
