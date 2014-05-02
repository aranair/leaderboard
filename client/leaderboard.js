if (Meteor.isClient) {
  Meteor.startup(function() {
    Deps.autorun(function() {
      Meteor.subscribe("players");
    });
  })

  Template.playerslist.players = function() {
    return Players.find({}, {sort: {score: -1}})
  };
  Template.winnerslist.winners = function() {
    return Players.find({}, {sort:{score:-1}}).fetch().splice(0,2);
  };

  Template.player.events = {
    'click .player-controls__plus': function(event) {
      var playerId = $(event.currentTarget).data('id');
      Meteor.call('setPoints', {
        id: playerId,
        points: 1,
        minus: false
      }, function(e, p) {
        if (!p) { $('.js-create-alert').show(); }
      });
    },
    'click .player-controls__minus': function(event) {
      var playerId = $(event.currentTarget).data('id');
      Meteor.call('setPoints', {
        id: playerId,
        points: 1,
        minus: true
      }, function(e, p) {
        if (!p) { $('.js-create-alert').show(); }
      });
    }
  }
  
  Template.newplayerform.events = {
    'click .form__save-btn': function(event) {
      event.preventDefault();
      event.stopPropagation();
      var newPlayerName = $('.js-new-player-name').val();
      if (newPlayerName === '') { return; }

      Meteor.call('createPlayer', { 
        name: newPlayerName, score: 0 
      }, function(e, p) {
        if (!p) { $('.js-create-alert').show(); }
      });
      $('.js-new-player-name').val('');
    },

    'submit form': function(event) {
      event.preventDefault();
      event.stopPropagation();
      var newPlayerName = $('.js-new-player-name').val();
      if (newPlayerName === '') { return; }

      Meteor.call('createPlayer', { 
        name: newPlayerName, score: 0 
      }, function(e, p) {
        if (!p) { $('.js-create-alert').show(); }
      });
      $('.js-new-player-name').val('');
    }
  };
}
