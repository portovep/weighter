
var WeightPanel = require('./components/weightPanel.js');

ReactDOM.render(
  <WeightPanel url="api/user/1/weight" />,
  document.getElementById('weighter')
);
