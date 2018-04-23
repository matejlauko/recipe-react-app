import validate from './validate';

it('should validate strings', () => {
  expect(validate([{ label: 'Title', val: 'AA' }])).toEqual([]);
  expect(validate([{ label: 'Title', val: '' }])).toEqual(['Title needs to be filled properly']);
  expect(validate([{ label: 'Title', val: '432ffsd?##' }, { label: 'Text', val: '432ffsd?##' }])).toEqual([
    'Title needs to be filled properly',
    'Text needs to be filled properly',
  ]);
});
