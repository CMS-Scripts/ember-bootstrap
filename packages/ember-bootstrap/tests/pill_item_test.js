var application, pillItem;
var get = Ember.get, set = Ember.set, A = Ember.A;

module("Ember.PillItem", {
  setup: function() {
    application = Ember.Application.create();
    get(application, 'eventDispatcher').setup();
  },
  teardown: function() {
    if (pillItem && !pillItem.get('isDestroyed')) {
      pillItem.destroy();
    }
  }
});

test("a pill item can be created and appended to DOM", function() {
  pillItem = Ember.PillItem.create();
  appendIntoDOM(pillItem);
  ok(pillItem.$().length, 'a pillItem pane has a layer in the DOM');
});

test("a pill item binds content property to DOM", function() {
  var content;
  pillItem = Ember.PillItem.create();
  Ember.run(function() {
    pillItem.append();
    content = 'oh my output';
    pillItem.set('content', content);
  });
  equal(pillItem.$().find('a').text(), content, 'pill item binds given content to DOM');
});

test("a pill sets selection on parentView when clicked", function() {
  var parentView = Ember.CollectionView.create({
    tagName: 'ul',
    itemViewClass: Ember.PillItem,
    content: A(['A', 'B', 'C']),
    selection: null
  });
  appendIntoDOM(parentView);
  parentView.$().find('li:last').click(); // select the last pill
  equal(parentView.get('selection'), 'C', "pill item sets its content as a selection");
  parentView.$().find('li:first').click(); // select the first pill
  equal(parentView.get('selection'), 'A', "pill item sets its content as a selection");
  parentView.destroy();
});

test("a pill has active class when parent view has selection of item content", function() {
  var parentView = Ember.CollectionView.create({
    tagName: 'ul',
    itemViewClass: Ember.PillItem,
    content: A(['A', 'B', 'C']),
    selection: 'A'
  });
  appendIntoDOM(parentView);
  ok(parentView.$().find('li:first').hasClass('active'), "selected item has active class");
  Ember.run(function() {
    parentView.set('selection', 'C');
  });
  ok(parentView.$().find('li:last').hasClass('active'), "only selected item has active class");
  ok(!parentView.$().find('li:first').hasClass('active'), "only selected item has active class");
  parentView.destroy();
});

