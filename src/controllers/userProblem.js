const { getLanguageById, submitBatch, submitToken } = require("../utils/problemUtility");
const Problem = require("../models/problem")

const createProblem = async (req, res) => {

  const { title, description, difficulty, tags,
    visibleTestCases, hiddenTestCases, startCode,
    referenceSolution, problemCreator
  } = req.body;

  try {

    for (const { language, completeCode } of referenceSolution) {

      // source_code: from completeCode
      // language_id: from getLanguageById(language)
      // stdin: from visibleTestCases
      // expectedOutput: from visibleTestCases

      const languageId = getLanguageById(language);

      // created Batch submission
      const submissions = visibleTestCases.map((testcases) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testcases.input,
        expected_output: testcases.output
      }));
      // const submissions = [
      //     {
      //       "language_id": 46,
      //       "source_code": "echo hello from Bash",
      //       stdin:23,
      //       expected_output:43,
      //     },
      //     {
      //       "language_id": 123456789,
      //       "source_code": "print(\"hello from Python\")"
      //     },
      //     {
      //       "language_id": 72,
      //       "source_code": ""
      //     }
      //   ]


      const submitResult = await submitBatch(submissions);
      // console.log(submitResult);

      const resultToken = submitResult.map((value) => value.token);
      // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]

      const testResult = await submitToken(resultToken);
      //  console.log(testResult);


      for (const test of testResult) {
        if (test.status_id != 3) {
          return res.status(400).send("Error Occured"); // return because it will stop the execution of the function.
        }
      }


    } // this for of loop will run for all the languages in the referenceSolution array. If any of the test cases fail, it will return an error response and stop the execution of the function.

    // Now if all the test cases pass, we can save the problem in the database. i.e. all the DSA problem that admin created is correct and working fine. So we can save it in the database.

    const userProblem = await Problem.create({
      ...req.body,
      problemCreator: req.result._id // This came from the auth middleware, which is the user who is creating the problem. It is admin id. In middleware result was attached with req.
    });

    res.status(201).send("Problem Saved Successfully");
  }
  catch (err) {
    res.status(400).send("Error: " + err);
  }

}

const updateProblem = async (req, res) => {

  const { id } = req.params;
  const { title, description, difficulty, tags,
    visibleTestCases, hiddenTestCases, startCode,
    referenceSolution, problemCreator
  } = req.body;

  try {

    if (!id) {
      return res.status(400).send("Missing ID Field");
    }

    const DsaProblem = await Problem.findById(id);
    if (!DsaProblem) {
      return res.status(404).send("ID is not persent in server");
    }

    for (const { language, completeCode } of referenceSolution) {


      // source_code:
      // language_id:
      // stdin: 
      // expectedOutput:

      const languageId = getLanguageById(language);

      // I am creating Batch submission
      const submissions = visibleTestCases.map((testcase) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output
      }));


      const submitResult = await submitBatch(submissions);
      // console.log(submitResult);

      const resultToken = submitResult.map((value) => value.token);

      // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]

      const testResult = await submitToken(resultToken);

      //  console.log(testResult);

      for (const test of testResult) {
        if (test.status_id != 3) {
          return res.status(400).send("Error Occured");
        }
      }

    }


    const newProblem = await Problem.findByIdAndUpdate(id, { ...req.body }, { runValidators: true, new: true });

    res.status(200).send(newProblem);
  }
  catch (err) {
    res.status(500).send("Error: " + err);
  }
}

const deleteProblem = async (req, res) => {

  const { id } = req.params;
  try {

    if (!id)
      return res.status(400).send("ID is Missing");

    const deletedProblem = await Problem.findByIdAndDelete(id);

    if (!deletedProblem)
      return res.status(404).send("Problem is Missing");


    res.status(200).send("Successfully Deleted");
  }
  catch (err) {

    res.status(500).send("Error: " + err);
  }
}


const getProblemById = async (req, res) => {

  const { id } = req.params;
  try {

    if (!id)
      return res.status(400).send("ID is Missing");

    const getProblem = await Problem.findById(id);

    if (!getProblem)
      return res.status(404).send("Problem is Missing");


    res.status(200).send(getProblem);
  }
  catch (err) {
    res.status(500).send("Error: " + err);
  }
}

const getAllProblem = async (req, res) => {

  try {

    const getProblem = await Problem.find({}); // getProblem is an array.

    if (getProblem.length == 0)
      return res.status(404).send("No Problems to showcase.");


    res.status(200).send(getProblem);
  }
  catch (err) {
    res.status(500).send("Error: " + err);
  }
}


module.exports = { createProblem, updateProblem, deleteProblem, getProblemById, getAllProblem };

