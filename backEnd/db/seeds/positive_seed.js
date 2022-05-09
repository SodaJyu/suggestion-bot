/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('positive_suggestions').del()
  await knex('positive_suggestions').insert([
    {popularity: 0, suggestion: 'hit the town'},
    {popularity: 0, suggestion: 'you should celebrate!'},
    {popularity: 0, suggestion: "treat yourself to 3kg of steak"},
    {popularity: 0, suggestion: 'go on holiday'},
    {popularity: 0, suggestion: 'hit the gym'},
    {popularity: 0, suggestion: 'break out the champagne'},
    {popularity: 0, suggestion: 'do you have the time to talk about our Lord and Saviour?'},
    {popularity: 0, suggestion: 'book a skydive'},
    {popularity: 0, suggestion: 'bake a big batch of brownies then consume them all'},
  ]);
};
