/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('negative_suggestions').del()
  await knex('negative_suggestions').insert([
    {popularity: 0, suggestion: 'go for a walk'},
    {popularity: 0, suggestion: 'take a nap'},
    {popularity: 0, suggestion: "I'm not your therapist, you need professional help."},
    {popularity: 0, suggestion: 'meet up with your friends'},
    {popularity: 0, suggestion: 'hit the gym'},
    {popularity: 0, suggestion: 'treat yourself to a nice dinner'},
    {popularity: 0, suggestion: 'Meditate'},
    {popularity: 0, suggestion: 'read a book'},
    {popularity: 0, suggestion: 'enjoy a nice bath'},
  ]);
};
