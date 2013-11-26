var Boa = require('./boa')

describe('Boa', function() {
  it('sums', function(){
    expect(Boa.sum([1,2,3])).toBe(6)
  })
})