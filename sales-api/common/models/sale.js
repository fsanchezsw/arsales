'use strict';
const app = require('../../server/server');

module.exports = function(Sale) {

    Sale.beforeRemote('create', (ctx, _instance, next) => {
        app.models.Shop.findOne({ where: { and: [{ idOwner: ctx.req.accessToken.userId }, { id: ctx.req.body.idShop }] } })
        .then(shop => {
            if(shop) next();
            else next(new Error('Authorization required'));
        }).catch(err => next(err));
    });

    Sale.beforeRemote('destroyById', (ctx, _instance, next) => {
        Sale.findById(ctx.req.params.id)
        .then(sale => {
            if(sale) return app.models.Shop.findOne({ where: { and: [{ idOwner: ctx.req.accessToken.userId }, { id: sale.idShop }] } });
            else next(new Error('Authorization required'));
        }).then(shop => {
            if(shop) next();
            else next(new Error('Authorization required'));
        }).catch(err => next(err));
    });

    Sale.beforeRemote('findById', (ctx, _instance, next) => {
        Sale.findById(ctx.req.params.id)
        .then(sale => {
            if(sale) return app.models.Shop.findOne({ where: { and: [{ idOwner: ctx.req.accessToken.userId }, { id: sale.idShop }] } });
            else next(new Error('Authorization required'));
        }).then(shop => {
            if(shop) next();
            else next(new Error('Authorization required'));
        }).catch(err => next(err));
    });

    Sale.beforeRemote('replaceById', (ctx, _instance, next) => {
        Sale.findById(ctx.req.params.id)
        .then(sale => {
            if(sale) return app.models.Shop.findOne({ where: { and: [{ idOwner: ctx.req.accessToken.userId }, { id: sale.idShop }] } });
            else next(new Error('Authorization required'));
        }).then(shop => {
            if(shop) next();
            else next(new Error('Authorization required'));
        }).catch(err => next(err));
    });

    Sale.afterRemote('find', (ctx, _instance, next) => {
        ctx.result = ctx.result.filter(sale => (sale.shop() && (sale.shop().idOwner === ctx.req.accessToken.userId)));
        next();
    });
};
