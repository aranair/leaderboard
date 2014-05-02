if (Meteor.isServer) {
  Meteor.publish("players", function () {
    return Players.find({}, { sort: { score: -1 }});
  });
  Accounts.validateNewUser(function (user) {
    return true;
  });
}
