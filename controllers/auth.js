const { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } = require("firebase/auth");
const { getFirestore, collection, addDoc, getDoc, doc } = require("firebase/firestore");
const { auth, db } = require('../config/firebase');

const SignUp = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await addDoc(collection(db, "users"), {
            firstName,
            lastName,
            email,
            uid: userCredential.user.uid,
        });
        res.json({ message: "User created successfully", user: userCredential.user });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

const Signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        res.json({ message: "User logged in successfully", user: userCredential.user, userDoc: userDoc.data() });
    } catch (error) {
        console.error("Sign in error:", error);
        res.status(400).json({ message: error.code === 'auth/user-not-found' ? "User not found" : error.message });
    }
};

const resetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        await sendPasswordResetEmail(auth, email);
        res.json({ message: "Password reset email sent" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    SignUp,
    Signin,
    resetPassword
};
