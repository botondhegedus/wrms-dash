# wrms-dash

[![Maintainability](https://api.codeclimate.com/v1/badges/aa20cf63acacc13e2fa0/maintainability)](https://codeclimate.com/github/jlabusch/wrms-dash/maintainability)

This dashboard replaces our previous monthly SLA report documents.

![Screenshot](https://github.com/jlabusch/wrms-dash/raw/master/example.png)

Proper readme still #todo.

### Run me

 - Prerequisites: `git`, `docker` and `docker-compose`
 - `git clone git@github.com:jlabusch/wrms-dash.git`
 - `cd wrms-dash`
 - Create `./api/config/default.json` either by customizing the example or getting a working copy from another team in Catalyst.
 - Find the hostname of your WRMS database and set that in the config's `db.host` option.
 - You probably want to set at least two optional environment variables: `DJANGO_SECRET` and `ICINGA_BASIC_AUTH`
 - To turn on debug mode, export `DJANGO_DEBUG=Y` and/or `API_DEBUG=Y`
 - By default the HTTP server will run with no SSL on TCP/80. Either free up that port or tie this into your network in a more intelligent way. If you want to run this for development in Cat EU, remember that it'll clash with the default Easydev setup.
 - `make run` to start it, `docker-compose down` to stop it
 - Browse to http://localhost to test
 - If you're within Catalyst, ask me about integrating the finance system's MIS reports to see revenue on the Omnitool.

### Dev notes

 - Each widget's back end code is at `./api/lib/get_XXX.js`
 - To point a front end widget at a different data source at the front end (i.e. bypassing the Node back end), set `override_uri` in the call to `html/dash.js:query()`
 - check out https://github.com/keen/keen-dataviz.js/blob/master/docs/README.md#chart-types for front-end options, or just use your favourite charting library. Google charts also play nicely with this dash.

![Architecture](https://github.com/jlabusch/wrms-dash/raw/master/overview.png)

(Note: we don't really use the SSL bits, so you'll see SSL turned off in `docker-compose.yml`, `nginx-default.conf` and `Makefile`.)

### Administration

If you're starting from a blank database, after starting the system you need to:

 - Create a superuser: `docker exec -it wrmsdash_frontend_1 ./manage.py createsuperuser`
 - Note that `frontend/db.sqlite3` will be mounted as a volume

(Note that the actual container name, e.g. `wrmsdash_frontend_1`, depends on your environment. Use `docker-compose ps` to see what the real name is.)

To change a user's password, run `docker exec -it wrmsdash_frontend_1 ./manage.py changepassword <username>`


### WRMS metadata

WRs tagged with "Warranty" or "Maintenance" won't have their timesheet hours counted.

And you can mostly ignore this next bit, but know that it's possible to move quotes to the SLA budgets of different months using the `invoice_to` field.

Quote ID 1234 can be allocated to the March 2016 SLA budget by saying:

> 1234: 2016-3 SLA

Quote ID 1234 can instead be allocated to Additional Service hours if the SLA budget has been exhausted:

> 1234: 2016-3 Additional

For T&M requests, timesheet adjustments (e.g. writing off new staff training hours) can be added using the "Adjust" keyword... but using adjustments probably means you're doing something wrong, so the exact syntax isn't documented here.


### Thanks

Ashley Mcnamara's Gophers licensed under CC (https://github.com/ashleymcnamara/gophers).


### How to contribute

*Imposter syndrome disclaimer*: I want your help. No really, I do.

There might be a little voice inside that tells you you're not ready; that you need to do one more tutorial, or learn another framework, or write a few more blog posts before you can help me with this project.

I assure you, that's not the case.

If you'd like to throw ideas around before starting any development, happy to do that. If you'd rather start by improving documentation, test coverage or even just giving general feedback, you're very welcome.

Thank you for contributing!
