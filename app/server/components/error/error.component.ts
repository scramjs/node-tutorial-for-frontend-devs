class ServerErrorComponent {
    beforeRegister() {
        this.is = 'server-error';
    }

    ready() {
        /// catch 404 and forwarding to error handler
        this.notFoundHandler = (req, res, next) => {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        };

        /// error handlers

        this.developmentCallback = (app) => {
            if (app.get('env') === 'development') {
                // development error handler
                // will print stacktrace
                app.use((err, req, res, next) => {
                    res.status(err.status || 500);
                    res.render('error', {
                        message: err.message,
                        error: err
                    });
                });
            }
        };

        // production error handler
        // no stacktraces leaked to user
        this.productionHandler = (err, req, res, next) => {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        };
    }
}

Polymer(ServerErrorComponent);
