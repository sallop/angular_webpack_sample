describe("A suite", function(){
  it("containt spec with an expectation", function(){
    expect(true).toBe(true);
  });
});

describe("A suite is just a function", function(){
  var a;

  it("and so is a spec", function(){
    a = true;

    expect(a).toBe(true);
  });
});

describe("The 'toBe' matcher compares with ===", function(){

  it("and has a positive case", function(){
    expect(true).toBe(true);
  });

  it("and can have a negative case", function(){
    expect(false).not.toBe(true);
  });
});

describe("Included matchers:", function(){

  it("The 'toBe' matcher compares with ===", function(){
    var a = 12;
    var b = a;

    expect(a).toBe(b);
    expect(a).not.toBe(null);
  });
});

describe("The 'toEqual' matcher", function(){

  it("works for simple literals and valiables", function(){
    var a = 12;
    expect(a).toEqual(12);
  });

  it("should work for objects", function(){
    var foo = {
      a: 12,
      b: 34
    };
    var bar = {
      a: 12,
      b: 34
    };
    expect(foo).toEqual(bar);
  });

  it("The 'toMatch' matcher is for regular expressions", function(){
    var message = "foo bar baz";

    expect(message).toMatch(/bar/);
    expect(message).toMatch("bar");
    expect(message).not.toMatch(/quux/);
  });

  it("The 'toBeDefined' matcher compares against `undefined`", function(){
    var a = {
      foo: "foo"
    };

    expect(a.foo).toBeDefined();
    expect(a.bar).not.toBeDefined();
  });

  it("The `toBeUndefined` matcher compares against `undefined`", function(){
    var a = {
      foo: "foo"
    };

    expect(a.foo).not.toBeUndefined();
    expect(a.bar).toBeUndefined();
  });

});

describe("A spec using the fail function", function(){
  var foo = function(x, callBack){
    if (x){
      callBack();
    }
  };

  it("should not call the callBack", function(){
    foo(false, function(){
      fail("Callback has been called");
    });
  });
});


describe("A spec", function(){
  it("is just a function, so it can contain any code", function(){
    var foo = 0;
    foo += 1;

    expect(foo).toEqual(1);
  });

  it("can have more than one expectation", function(){
    var foo = 0;
    foo += 1;

    expect(foo).toEqual(1);
    expect(true).toEqual(true);
  });
});

describe("A spec using beforeEach and afterEach", function(){
  var foo = 0;

  beforeEach(function(){
    foo += 1;
  });

  afterEach(function(){
   foo = 0;
  });

  it("is just a function, so it can contain any code", function(){
    expect(foo).toEqual(1);
  });

  it("can have more than one expectation", function(){
    expect(foo).toEqual(1);
    expect(true).toEqual(true);
  });
});

describe("Pending specs", function(){

  xit("can be declared 'xit'", function(){
    expect(true).toBe(false);
  });

  it("can be declared with 'it' but without a function");

  it("can be declared by calling 'pending' in the spec body", function(){
    expect(true).toBe(false);
    pending('this is why it is pending');
  });
});

describe("A spy", function(){
  var foo, bar = null;

  beforeEach(function(){
    foo = {
      setBar: function(value){
        bar = value;
      }
    };

    spyOn(foo, 'setBar');

    foo.setBar(123);
    foo.setBar(456, 'another param');
  });

  it("tracks that the spy was called", function(){
    expect(foo.setBar).toHaveBeenCalled();
  });

  it("tracks all the arguments of its calls", function(){
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
  });

  it("stops all execution on a function", function(){
    expect(bar).toBeNull();
  });
});

describe("A spy, when configured to call through", function(){
  var foo, bar, fetchedBar;

  beforeEach(function(){
    foo = {
      setBar: function(value){
        bar = value;
      },
      getBar: function(){
        return bar;
      }
    };

    spyOn(foo, 'getBar').and.callThrough();

    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it("tracks that the spy was called", function(){
    expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not affect other function", function(){
    expect(bar).toEqual(123);
  });

  it("when called return the requested value", function(){
    expect(fetchedBar).toEqual(123);
  });
});

describe("A spy, when configured to fake a series of return values", function(){
  var foo, bar;

  beforeEach(function(){
    foo = {
      setBar: function(value){
        bar = value;
      },
      getBar: function(){
        return bar;
      }
    };

    spyOn(foo, "getBar").and.returnValues("fetched first", "fetched second");

    foo.setBar(123);
  });

  it("tracks that the spy was called", function(){
    foo.getBar(123);
    expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not affect other functions", function(){
    expect(bar).toEqual(123);
  });

  it("when called multiple times returns the requested values in order", function(){
    expect(foo.getBar()).toEqual("fetched first");
    expect(foo.getBar()).toEqual("fetched second");
    expect(foo.getBar()).toBeUndefined();
  });
});

describe("A spy, when configured with an alternate implementation", function(){
  var foo, bar, fetchedBar;

  beforeEach(function(){
    foo= {
      setBar: function(value){
        bar = value;
      },
      getBar: function(){
        return bar;
      }
    };

    spyOn(foo, "getBar").and.callFake(function(){
      return 1001;
    });

    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it("tracks that the spy was called", function(){
    expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not affect other functions", function(){
    expect(bar).toEqual(123);
  });

  it("when called returns the required value", function(){
    expect(fetchedBar).toEqual(1001);
  });
});

xdescribe("A spy, when configured to throw an error", function(){
  var foo, bar;

  beforeEach(function(){
    foo = {
      setBar: function(value){
        bar = value;
      }
    };
    spyOn(foo, "setBar").and.throwError("quux");
  });

  it("throws the value", function(){
    expect("throws the value", function(){
      foo.setBar(123)
    }).toThrowError("quux");
  });
});

describe("A spy", function(){
  var foo, bar = null;

  beforeEach(function(){
    foo = {
      setBar: function(value){
        bar = value;
      }
    };

    spyOn(foo, 'setBar').and.callThrough();
  });

  it("can call through and then stub in the same spec", function(){
    foo.setBar(123);
    expect(bar).toEqual(123);

    foo.setBar.and.stub();
    bar = null;

    foo.setBar(123);
    expect(bar).toBe(null);
  });
});
