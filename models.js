Players = new Meteor.Collection("players")

Players.allow({
	insert: function () {
		return false;
	},
	update: function (userId, player) {
    return false;
	},
	remove: function (userId, player) {
    return false;
	}
});


Meteor.methods({

  setPoints: function (options) {
    var player = Players.findOne(options.id);
		if (!this.userId) { return false; }
    if (!player) { return false; }

    var points = options.points;
    return Players.update(options.id, {$set: { score: points }});
  },

  plusMinusPoints: function (options) {
    var player = Players.findOne(options.id);
		if (!this.userId) { return false; }
    if (!player) { return false; }

    var points = options.points;
    if (options.minus) {
      points = -1 * points;
    }
    return Players.update(options.id, {$inc: { score: points }});
  },

	createPlayer: function (options) {
		if (!this.userId) return false;

    return Players.insert({
       owner: this.userId,
       name: options.name,
       score: options.score,
       created_at: (new Date())
    });
	}
})
