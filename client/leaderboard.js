if (Meteor.isClient) {
  Meteor.startup(function() {
    Deps.autorun(function() {
      Meteor.subscribe("players");
    });
  })

  var plusMinusPoint = function(playerId, minusBln) {
    Meteor.call('plusMinusPoints', {
      id: playerId,
      points: 1,
      minus: minusBln
    }, function(e, p) {
      if (!p) { $('.js-create-alert').show(); }
    });
  };

  var setPoints = function(event) {
    event.preventDefault();
    event.stopPropagation();
    var $currentTarget = $(event.currentTarget[0]);
    var playerId = $currentTarget.data('id');
    var value = $currentTarget.val();

    console.log(value);
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
      Meteor.call('setPoints', {
        id: playerId,
        points: parseFloat(value)
      })
    }
    $currentTarget.focus();
  };

  Template.playerslist.players = function() {
    return Players.find({}, {sort: { score: -1 }})
  };
  Template.winnerslist.winners = function() {
    return Players.find({score: {$gt: 0}}, {sort: { score: -1 }}).fetch().splice(0, 2);
  };

  Template.player.events = {
    'click .player-controls__plus': function(event) {
      var playerId = $(event.currentTarget).data('id');
      plusMinusPoint(playerId, false);
    },
    'click .player-controls__minus': function(event) {
      var playerId = $(event.currentTarget).data('id');
      plusMinusPoint(playerId, true);
    }
  };

  Template.playereditform.events = {
    'submit form': setPoints
  };
  // 'keyup .js-edit-player-score': setPoints
  
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
