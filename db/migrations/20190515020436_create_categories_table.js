
exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', (table)=>{
      table.increments('id').unsigned();
      table.string('name').defaultTo('uncategorized');
      table.timestamps(['created_at', 'updated_at'],[knex.fn.now(),knex.fn.now()]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories');
};
