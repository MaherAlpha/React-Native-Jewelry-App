import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { firebase } from "../services/Firebase/FirebaseConfig.js";
import { AntDesign } from "@expo/vector-icons";
import { btn2, colors, navbtn, navbtnin, navbtnout } from "../styles/style";

const UserProfile = ({ navigation }) => {
  const appName = "SuitsyouJewelry";
  const [userloggeduid, setUserloggeduid] = useState(null);
  const [userdata, setUserdata] = useState(null);
  const [edit, setEdit] = useState(false);
  const [newname, setNewName] = useState("");
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");

  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserloggeduid(user.uid);
        } else {
          setUserloggeduid(null);
        }
      });
    };
    checklogin();
  }, []);

  useEffect(() => {
    getuserdata();
  }, [userloggeduid]);

  const getuserdata = async () => {
    const docRef = firebase
      .firestore()
      .collection("UserData")
      .where("uid", "==", userloggeduid);
    const doc = await docRef.get();
    if (!doc.empty) {
      doc.forEach((doc) => {
        setUserdata(doc.data());
      });
    } else {
      // console.log('No such document!');
    }
  };

  const updateuser = async () => {
    const docRef = firebase
      .firestore()
      .collection("UserData")
      .where("uid", "==", userloggeduid);
    const doc = await docRef.get();

    if (!doc.empty) {
      if (newname !== "") {
        doc.forEach((doc) => {
          doc.ref.update({
            name: newname,
          });
        });
      }
      alert("Your user data is updated");
      getuserdata();
      setEdit(false);
      setPasswordEdit(false);
    }
  };

  const updatepassword = async () => {
    const reauthenticate = (oldpassword) => {
      const user = firebase.auth().currentUser;
      const cred = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldpassword
      );
      return user.reauthenticateWithCredential(cred);
    };

    const docRef = firebase
      .firestore()
      .collection("UserData")
      .where("uid", "==", userloggeduid);
    const doc = await docRef.get();

    reauthenticate(oldpassword)
      .then(() => {
        const user = firebase.auth().currentUser;
        user.updatePassword(newpassword).then(() => {
          if (!doc.empty) {
            doc.forEach((doc) => {
              doc.ref.update({
                password: newpassword,
              });
            });
            alert("Your password is updated");
          }
        });
      })
      .catch((error) => {
        alert("Please try again. Server Issue");
      });

    setPasswordEdit(false);
  };

  const logoutuser = async () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert("You are logged out");
        navigation.navigate("login");
      })
      .catch((error) => {
        alert("System error");
      });
  };

  return (
    <View style={styles.containerout}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("home")}
          style={navbtnout}
        >
          <View style={navbtn}>
            <AntDesign name="back" size={24} color="black" style={navbtnin} />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerText}>{appName}</Text>
      </View>

      {!edit && !passwordEdit && (
        <View style={styles.container}>
          <Text style={styles.head1}>Your Profile</Text>
          <View style={styles.containerin}>
            <Text style={styles.head2}>
              Name: {userdata?.name || "loading"}
            </Text>
            <Text style={styles.head2}>
              Email: {userdata?.email || "loading"}
            </Text>
            <Text style={styles.head2}>
              Phone: {userdata?.phone || "loading"}
            </Text>
          </View>

          <TouchableOpacity onPress={() => setEdit(true)}>
            <View style={btn2}>
              <Text style={styles.btntext}>Edit Details</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setPasswordEdit(true)}>
            <View style={styles.btnout}>
              <Text style={styles.btntext}>Change Password</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => logoutuser()}>
            <View style={btn2}>
              <Text style={styles.btntext}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {edit && (
        <View style={styles.container}>
          <Text style={styles.head1}>Edit Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newname}
            onChangeText={(text) => setNewName(text)}
          />

          <TouchableOpacity onPress={() => updateuser()}>
            <View style={btn2}>
              <Text style={styles.btntext}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {passwordEdit && (
        <View style={styles.container}>
          <Text style={styles.head1}>Change Your Password</Text>
          <View style={styles.containerin}>
            <TextInput
              style={styles.input}
              placeholder="Old Password"
              secureTextEntry
              value={oldpassword}
              onChangeText={(text) => setOldPassword(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newpassword}
              onChangeText={(text) => setNewPassword(text)}
            />
          </View>
          <TouchableOpacity onPress={() => updatepassword()}>
            <View style={btn2}>
              <Text style={styles.btntext}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Jewelry App - All rights reserved</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerout: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
  },
  header: {
    backgroundColor: "red",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  footerText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  head1: {
    fontSize: 40,
    fontWeight: "200",
    marginVertical: 20,
    color: colors.text1,
  },
  containerin: {
    width: "90%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.text1,
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  head2: {
    fontSize: 20,
    fontWeight: "200",
    marginTop: 20,
  },
  inputout: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 20,
  },
  input: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 20,
  },
  btntext: {
    fontSize: 20,
    fontWeight: "400",
    color: "white",
    textAlign: "center",
    padding: 10,
  },
  btnout: {
    backgroundColor: colors.text1,
    borderRadius: 10,
  },
});

export default UserProfile;
