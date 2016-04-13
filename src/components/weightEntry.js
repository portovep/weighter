
var WeightEntry = React.createClass({
  formatDate: function (date) {
    return new Date(date).toDateString();
  },

  render: function() {

    var weight = this.props.weightEntry.value;
    var date = this.props.weightEntry.date;
    var unit = this.props.weightEntry.unit;

    var formattedDate = this.formatDate(date);
    return (
      <li className="list-group-item">
          <h4 className="list-group-item-heading">{weight} {unit}</h4>
          <p className="list-group-item-text">{formattedDate}</p>
      </li>
    );
  }
});

module.exports = WeightEntry;