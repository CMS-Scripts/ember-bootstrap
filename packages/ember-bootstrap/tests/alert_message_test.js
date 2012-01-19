var application, alert;
var get = Ember.get, set = Ember.set;

module("Ember.AlertMessage", {
  setup: function() {
    application = Ember.Application.create();
    get(application, 'eventDispatcher').setup();
  },
  teardown: function() {
    if (alert && !alert.get('isDestroyed')) {
      alert.destroy();
    }
  }
});

test("an alert can be created and appended to DOM", function() {
  alert = Ember.AlertMessage.create();
  Ember.run(function() {
    alert.append();
  });
  ok(alert.$().length, 'an alert has a layer in the DOM');
});

test("an alert binds type property to layer class", function() {
  var type = 'test-type';
  alert = Ember.AlertMessage.create({ type: type });
  Ember.run(function() {
    alert.append();
  });
  ok(alert.$().hasClass(type), 'an alert binds type property to class');
});

test("an alert binds text to DOM", function() {
  var text;

  alert = Ember.AlertMessage.create(), close;
  Ember.run(function() {
    alert.append();
    text = 'oh my output';
    alert.set('text', text);
  });
  equal(alert.$().find('p').text(), text, 'alert binds given text to DOM');
});

test("an alert has a close button that removes it from the DOM", function() {
  alert = Ember.AlertMessage.create(), close;
  Ember.run(function() {
    alert.append();
  });
  close = alert.$().find('a[rel=close]');
  ok(close.length, 'alert has a close button');
  close.click();
  ok(!alert.$().length, 'alert should not have a layer');
  ok(alert.get('isDestroyed'), 'alert should be destroyed');
});
