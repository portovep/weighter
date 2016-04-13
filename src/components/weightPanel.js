
var FacebookLogin = require('./facebookLogin.js');
var WeightEntryList = require('./weightEntryList.js');
var WeightEntryForm = require('./weightEntryForm.js');


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
            <FacebookLogin />
          </div>
        </div>
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

module.exports = WeightPanel;