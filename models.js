Players = new Meteor.Collection("players")

Players.allow({
	insert: function () {
		return false;
	},
	update: function (userId, player) {
		// return player.owner === userId;
    return true;
	},
	remove: function (userId, player) {
		return player.owner === userId;
	}
});


Meteor.methods({
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
