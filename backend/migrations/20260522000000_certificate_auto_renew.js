import {global as logger} from '../logger.js';

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
	logger.info('Adding auto_renew column to certificate table...');
	const hasColumn = await knex.schema.hasColumn('certificate', 'auto_renew');
	if (!hasColumn) {
		await knex.schema.table('certificate', (table) => {
			table.integer('auto_renew').notNull().unsigned().defaultTo(1);
		});
		logger.info('auto_renew column added to certificate table');
	}
}

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
	logger.info('Removing auto_renew column from certificate table...');
	await knex.schema.table('certificate', (table) => {
		table.dropColumn('auto_renew');
	});
	logger.info('auto_renew column removed from certificate table');
}
