
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
           <WeightEntryList entries={this.props.entries} />
          </div>
        </div>
      </div>
    );
  }
});

var WEIGHT_ENTRIES = [
  {id: '1', weight: '81.1', date: '22/01/2016', unit: 'kg'},
  {id: '2', weight: '82.7', date: '15/01/2016', unit: 'kg'},
  {id: '3', weight: '82.5', date: '08/01/2016', unit: 'kg'},
  {id: '4', weight: '84.1', date: '02/01/2016', unit: 'kg'}
];

ReactDOM.render(
  <WeightPanel entries={WEIGHT_ENTRIES} />,
  document.getElementById('weighter')
);
