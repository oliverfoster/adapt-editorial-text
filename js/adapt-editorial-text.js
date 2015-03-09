define([
		'require',
		'extensions/adapt-editorial/js/jquery.textfill',
		'extensions/adapt-editorial/js/adapt-editorial'
	],function() {

	var Adapt = require("coreJS/adapt");
	var Block = Adapt.editorial.blockStore.block;

	var Text = Block.extend({
		tagName: "span",
		className: function() {
			var classes = Block.prototype.className.call(this);
			classes += " textfill ";
			return classes.trim();
		},
		initialize: function() {
			throttle.extend(this);
			Block.prototype.initialize.apply(this, arguments);
		},
		setupEventListeners: function() {
			Block.prototype.setupEventListeners.apply(this, arguments);
			this.listenTo(Adapt, "device:resize", this.onResize);
		},
		postRender: function() {
			this.$el.textfill(1000);
			this.parentWidth = this.$el.parent().width();
			this.trigger("ready");
		},
		onResize: function() {
			if (this.$el.parent().width() == this.parentWidth) return;
			this.throttle('textfill', function() {
				this.$el.textfill(10000);
				this.done('textfill');
			}, 500);
		},
		makeAccessible: function() {
			this.$el = this.$el.a11y_text(true);
			this.el = this.$el[0];
		},
		template: "editorial-text"
	});

	Adapt.editorial.register("text", Text);

	return Text;

});