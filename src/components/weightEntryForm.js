
var WeightEntryForm = React.createClass({
  generateRandomID: function() {
    return Math.random() * (99999 - 99) + 99;
  },

  newWeightEntry: function (weight) {
    var date = new Date();

    var newWeightEntry = {value: weight, date: date, unit: 'kg'};
    return newWeightEntry;
  },

  getInitialState: function() {
    return {weight: ''};
  },

  handleWeightChange: function(e) {
    this.setState({weight: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var weight = this.state.weight.trim();
    if (!weight) {
      return;
    }
    this.setState({weight: ''});

    this.props.onWeightSubmit(this.newWeightEntry(weight));
  },

  render: function() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <input
                type="number"
                step="0.1"
                className="form-control"
                placeholder="Weight"
                value={this.state.weight}
                onChange={this.handleWeightChange}
            />
            <div className="input-group-addon">Kg</div>
          </div>
        </div>
        <input className="btn btn-primary" type="submit" value="Save"/>
      </form>
    );
  }
});

module.exports = WeightEntryForm;