'use strict';

/**
 * news-list service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::news-list.news-list');
