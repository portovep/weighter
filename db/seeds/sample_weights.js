
exports.seed = function(knex, Promise) {
  
  var weightEntries = [
    {value: '81.1', date: 'Tue Mar 16 2016 09:48:47 GMT+0000 (GMT)', unit: 'kg'},
    {value: '82.7', date: 'Wed Mar 17 2016 10:48:47 GMT+0000 (GMT)', unit: 'kg'},
    {value: '82.5', date: 'Fri Mar 18 2016 11:48:47 GMT+0000 (GMT)', unit: 'kg'},
    {value: '84.1', date: 'Sat Mar 19 2016 13:48:47 GMT+0000 (GMT)', unit: 'kg'}
  ];

  return Promise.join(
    knex('weights').del(),
    knex('weights').insert(weightEntries)
  );
};
