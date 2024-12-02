const {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  doc,
  getDoc,
} = require("firebase/firestore");
const { db } = require("../config/firebase");

const addEmployees = async (req, res) => {
  const {
    Name,
    Email,
    Number,
    Position,
    idNumber,
    Gender,
    City,
    Province,
    ZipCode,
  } = req.body;

  if (
    !Name ||
    !Email ||
    !Number ||
    !Position ||
    !idNumber ||
    !Gender ||
    !City ||
    !Province ||
    !ZipCode
  ) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  try {
    const docRef = await addDoc(collection(db, "employees"), {
      Name: Name || "",
      Email: Email || "",
      Number: Number || "",
      Position: Position || "",
      idNumber: idNumber || "",
      Gender: Gender || "",
      City: City || "",
      Province: Province || "",
      ZipCode: ZipCode || "",
    });

    res.status(201).json({
      message: "Employee added successfully",
      id: docRef.id,
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res
      .status(500)
      .json({ error: "Error adding employee", details: error.message });
  }
};

const getEmployees = async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "employees"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({ data });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Error fetching employees" });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = doc(db, "employees", id); // Corrected the collection name to "employees"
    await deleteDoc(docRef);

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    if (error.code === "not-found") {
      return res.status(404).json({ error: "Employee not found" });
    }
    res
      .status(500)
      .json({ error: "Error deleting employee: " + error.message });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const {
    Name,
    Email,
    Number,
    Position,
    idNumber,
    Gender,
    City,
    Province,
    Zipcode,
  } = updates;

  if (
    !Name ||
    !Email ||
    !Number ||
    !Position ||
    !idNumber ||
    !Gender ||
    !City ||
    !Province ||
    !Zipcode
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const employeeDocRef = doc(db, "employees", id);
    const docSnap = await getDoc(employeeDocRef);

    if (docSnap.exists()) {
      await updateDoc(employeeDocRef, updates);
      res.json({ message: "Employee updated successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res
      .status(500)
      .json({ error: "Error updating employee: " + error.message });
  }
};

module.exports = {
  addEmployees,
  deleteEmployee,
  getEmployees,
  updateEmployee,
};
