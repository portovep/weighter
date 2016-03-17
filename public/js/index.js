
var WeightEntry = React.createClass({
  render: function() {

    var weight = this.props.weightEntry.weight;
    var date = this.props.weightEntry.date;
    var unit = this.props.weightEntry.unit;

    return (
      <li className="list-group-item">
          <h4 className="list-group-item-heading">{weight} {unit}</h4>
          <p className="list-group-item-text">{date}</p>
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

var WeightEntryInput = React.createClass({
  render: function() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <div className="input-group">
            <input type="number" className="form-control" placeholder="Weight"/>
            <div className="input-group-addon">Kg</div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
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
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
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
            <WeightEntryInput />
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
