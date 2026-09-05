const {getLanguageById,submitBatch} = require("../utils/problemUtility");


const createProblem = async (req,res)=>{

    const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;


    try{
       
      for(const {language,completeCode} of referenceSolution){
         

        // source_code: from completeCode
        // language_id: from getLanguageById(language)
        // stdin: from visibleTestCases
        // expectedOutput: from visibleTestCases

        const languageId = getLanguageById(language);
          
        // created Batch submission
        const submissions = visibleTestCases.map((input,output)=>({
            source_code:completeCode,
            language_id: languageId,
            stdin: input,
            expected_output: output
        }));


        const submitResult = await submitBatch(submissions);






      }

    }
    catch(err){

    }
}


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