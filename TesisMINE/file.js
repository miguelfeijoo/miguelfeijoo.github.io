// Load datalib.
var dl = require('datalib');

// Load and parse a CSV file. Datalib does type inference for you.
// The result is an array of JavaScript objects with named values.
// Parsed dates are stored as UNIX timestamp values.
var data = dl.csv('https://vega.github.io/datalib/data/stocks.csv');

// Show summary statistics for each column of the data table.
console.log(dl.format.summary(data));

// Compute mean and standard deviation by ticker symbol.
var rollup = dl.groupby('symbol')
  .summarize({'price': ['mean', 'stdev']})
  .execute(data);
console.log(dl.format.table(rollup));

// Compute correlation measures between price and date.
console.log(
  dl.cor(data, 'price', 'date'),      // Pearson product-moment correlation
  dl.cor.rank(data, 'price', 'date'), // Spearman rank correlation
  dl.cor.dist(data, 'price', 'date')  // Distance correlation
);

// Compute mutual information distance between years and binned price.
var bin_price = dl.$bin(data, 'price'); // returns binned price values
var year_date = dl.$year('date');       // returns year from date field
var counts = dl.groupby(year_date, bin_price).count().execute(data);
console.log(dl.mutual.dist(counts, 'bin_price', 'year_date', 'count'));