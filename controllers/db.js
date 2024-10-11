const { collection, addDoc } = require("firebase/firestore");
const { db } = require("../config/firebase");

const addUser = async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    const docRef = await addDoc(collection(db, "users"), {
      firstName: firstName,
      lastName: lastName,
    });

    res.json({
      message: "Addedd successfully",
    });
  } catch (error) {
    console.log(" adding user errror"  , error)
  }
};

const  delelteEmp =  (()=>{

})
module.exports  = {
    addUser,
    delelteEmp
}
