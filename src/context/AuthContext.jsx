import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, createUserWithEmailAndPassword, db, updateProfile, signInWithEmailAndPassword } from '../components/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null);
    console.log('Login User', user)

    const SignUp = async (email, password, name, profileImage) => {
        setLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update the user profile
            await updateProfile(user, {
                displayName: name,
                photoURL: profileImage
            });

            // Store additional user information in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                name,
                profileImage,
                email
            });

            setUser(user);
            console.log('User signed up successfully:', user);
            return user;
        } catch (error) {
            console.log("error in signin", error.message);
        } finally {
            setLoading(false)
        }
    };

    const Login = async (email, password) => {
        setLoading(true)
        try {
            const response = signInWithEmailAndPassword(auth, email, password);
            console.log('login user', response);
            return response.user;
        } catch (error) {
            console.log('error in login user', error, message)
        } finally {
            setLoading(false)
        }
    };

    const getUserData = async (uid) => {
        try {
            const userDoc = doc(db, 'users', uid);
            const userSnapshot = await getDoc(userDoc);
            if (userSnapshot.exists()) {
                console.log('User data:', userSnapshot.data());
                return userSnapshot.data();
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error getting user data:', error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, SignUp, Login, getUserData }}>
            {children}
        </AuthContext.Provider>
    );
};
