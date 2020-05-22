describe('Testing the functionality, this is the checklist', () => {
  it('should add an item', () => {
    var i = 1;
    expect(i).toBe(1);
  });
});

describe('Generator', function () {
  describe('getRandomNumber', function () {
    it('should be chosen by fair dice roll', function () {
      expect(Generator.getRandomNumber()).toBe(4);
    });
  });
});
