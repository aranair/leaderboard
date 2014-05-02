if (Meteor.isClient) {
  Meteor.startup(function() {
    Deps.autorun(function() {
      Meteor.subscribe("players")
    });
  })

  Template.playerslist.players = function() {
    return Players.find({}, {sort: {score: -1}})
  };
  
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
