const { spawn } = require('child_process');
const Patent = require('../Models/PatentModel');
exports.PythonConnection = async(req, res) => {
    try {
        const userInput = req.body.newabstract;
        console.log("the input,", userInput)
        const existingAbstracts = [
          "This patent introduces a navigation system for autonomous vehicles leveraging machine learning algorithms. The system enhances real-time decision-making and route optimization, improving the safety and efficiency of self-driving cars.",
          "Disclosed herein is a novel surface coating composition designed to repel dirt, water, and other contaminants, creating a self-cleaning effect. The coating can be applied to various surfaces, offering potential applications in architecture, automotive, and consumer products.",
          "With the increasing digitization of healthcare data, preserving patient privacy while enabling analysis is crucial. This project presents a framework for privacy-preserving machine learning on sensitive healthcare datasets. By employing techniques such as homomorphic encryption and federated learning, we enable collaborative model training without exposing individual patient data, thus facilitating the development of robust healthcare AI systems.",
          "This project proposes a novel approach to automated code refactoring leveraging deep learning techniques. By training a neural network on a large corpus of codebases, we aim to develop a system capable of identifying and refactoring code smells and design patterns automatically. The system will assist developers in improving code quality, reducing technical debt, and enhancing maintainability of software projects.",
          "In disaster scenarios, coordinating multiple drones for search and rescue missions is challenging due to unpredictable environments and limited communication infrastructure. This project introduces an autonomous drone swarm coordination system that employs decentralized algorithms for task allocation, path planning, and obstacle avoidance. By leveraging swarm intelligence, the system enables efficient and adaptive response to dynamic disaster scenarios, enhancing the effectiveness of rescue operations.",
          "With the emergence of quantum computing, traditional cryptographic algorithms face the risk of being compromised, threatening the security of sensitive data. This project investigates quantum-safe cryptography techniques that resist attacks from quantum computers. By exploring lattice-based, code-based, and hash-based cryptographic schemes, we aim to develop robust encryption protocols capable of withstanding quantum threats, ensuring long-term security for digital communication and data storage."
        
        ];
        const patents = await Patent.find({},{_id:1,title:1,description:1,userId:1,Cid:1,abstract:1,Inventor:1});
  
        const pythonProcess = spawn('python', ['D:\\fnlyr proj\\patentblockchain\\server\\python\\AiVerification.py', userInput, ...existingAbstracts]);

        let output = '';

        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
        });

        pythonProcess.on('close', (code) => {
          console.log(`Python script exited with code ${code}`);
          // Parse the output (similarity scores) and return it to the client
          const similarityScores = JSON.parse(output);
          // const keys = Object.keys(similarityScores).map((key) =>
          //   parseInt(key)
          // );
          var i = 0;
          const newKey = "similarityscroe";
          const selectedPatents = [];
          for (const key in similarityScores) {
            if (similarityScores.hasOwnProperty(key)) {
              var pt = patents[key];
              const plainPatent = pt.toObject();
              pt = {...plainPatent, [newKey]: similarityScores[key] };
              const selectedPatent = { ...pt, [newKey]: similarityScores[key] };
              
              selectedPatents.push(selectedPatent);
             // console.log("here :",selectedPatents[i])
              i++;
            }
          }
          
          console.log("selectedPatents",selectedPatents)
         
          res.json({ selectedPatents });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
