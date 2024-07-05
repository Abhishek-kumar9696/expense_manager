const transectionModel = require('../models/transectionModel');
const moment = require('moment');


// const getALLTransection = async (req, res) => {
//     try {
//         const { frequency, selectedDate, type } = req.body;
//         const filter = {
//             userid: req.body.userid
//         };

//         if (frequency !== 'custom') {
//             filter.date = {
//                 $gt: moment().subtract(Number(frequency), 'days').toDate()
//             };
//         } else {
//             filter.date = {
//                 $gte: selectedDate[0],
//                 $lte: selectedDate[1]
//             };
//         }

//         if (type !== 'all') {
//             filter.type = type;
//         }

//         const transections = await transectionModel.find(filter);
//         res.status(200).json(transections);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error);
//     }
// };

const getALLTransection = async (req, res) => {
    try {
        const { frequency, selectedDate, type } = req.body;
        const filter = {
            userid: req.body.userid
        };

        if (frequency !== 'custom') {
            filter.date = {
                $gt: moment().subtract(Number(frequency), 'days').toDate()
            };
        } else {
            filter.date = {
                $gte: selectedDate[0],
                $lte: selectedDate[1]
            };
        }

        if (type !== 'all' && {type}) {
            filter.type = type;
        }

        const transections = await transectionModel.find(filter);
        res.status(200).json(transections);
    } catch (error) {
        console.log('Error fetching transactions:', error); // Log the error for debugging
        message.error('Fetch Issue with Transaction'); // Display error message to user
        res.status(500).json({ error: 'Fetch Issue with Transaction' }); // Send error response
    }
};
const editTransection = async(req,res) => {
    try{
        await transectionModel.findOneAndUpdate({_id:req.body.transactionId},req.body.playload)
        res.status(200).send("Edit Successfully")

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

const addTransection = async (req, res) => {
    try {
        const newTransection = new transectionModel(req.body);
        await newTransection.save();
        res.status(201).send("Transaction created");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { getALLTransection, addTransection ,editTransection};
