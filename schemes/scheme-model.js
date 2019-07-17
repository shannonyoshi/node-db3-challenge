const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first()
    .then(scheme => {
      if (scheme) {
        return scheme;
      } else {
        return null;
      }
    });
}

function findSteps(id) {
  return db("steps")
    .innerJoin("schemes", "steps.scheme_id", "schemes.id")
    .where({ "steps.scheme_id": id })
    .select(
      "steps.step_number as step",
      "steps.instructions",
      "schemes.scheme_name as scheme"
    )
    .then(steps => {
      if (steps) {
        return steps;
      } else {
        return null;
      }
    });
}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then(ids => {
      return findById(ids[0]);
    });
}

function addStep(step, id) {
  return db("steps")
    .insert({
      scheme_id: id,
      step_number: step.step_number,
      instructions: step.instructions
    })
    .then(ids => {
      return db("steps")
        .where({ id: ids[0] })
        .first();
    });
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del()
    .then(count => {
      if (count > 0) {
        return count;
      } else {
        return null;
      }
    });
}
