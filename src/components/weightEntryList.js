
var WeightEntry = require('./weightEntry.js');

var WeightEntryList = React.createClass({
  render: function() {

    var rows = [];
    this.props.entries.forEach(function(weightEntry) {
      rows.push(<WeightEntry key={weightEntry.id} weightEntry={weightEntry} />)
    });

    return (
      <ul className="list-group">
        {rows}
      </ul>
    );
  }
});

module.exports = WeightEntryList;