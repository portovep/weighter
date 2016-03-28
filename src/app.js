
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

var WeightPanel = React.createClass({
  loadWeightEntriesFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.info("Server sent the following weight entries:\n\n %s", JSON.stringify(data));
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  
  sendWeightEntryToServer: function(weightEntry) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: weightEntry,
      success: function(data) {
        console.info("Server saved the following weight entry:\n\n %s", JSON.stringify(weightEntry));
        console.info("Server sent the following weight entries:\n\n %s", JSON.stringify(data));
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleWeightSubmission: function(newWeightEntry) {
    console.info("New weight entry:\n\n %s", JSON.stringify(newWeightEntry));
    
    this.sendWeightEntryToServer(newWeightEntry);
  },

  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    this.loadWeightEntriesFromServer();
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row row-margin-top">
          <div className="col-xs-12">
            <WeightEntryForm onWeightSubmit={this.handleWeightSubmission} />
          </div>
        </div>
        <div className="row row-margin-top">
          <div className="col-xs-12">
           <WeightEntryList entries={this.state.data} />
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <WeightPanel url="api/user/1/weight" />,
  document.getElementById('weighter')
);
