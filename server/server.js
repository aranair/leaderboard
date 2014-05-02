if (Meteor.isServer) {
  Meteor.publish("players", function () {
    return Players.find(
      { owner: this.userId }, 
      { sort: { score: -1 }})
  });
  Accounts.validateNewUser(function (user) {
    return false;
  });
}
