var config= require('config'),
    query = require('./query'),
    qf    = require('./quote_funcs');

module.exports = function(pred){
    return query.prepare(
        'approved_quotes',
        'approved_quotes',
        (ctx) => {
            return qf.quote_sql(ctx, true);
        },
        qf.make_query_handler(pred)
    );
}

