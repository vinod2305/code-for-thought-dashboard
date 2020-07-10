<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form" v-if="!load">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">Details</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-card-text>
          <v-text-field label="Full Name" :rules="rules" hide-details="auto" v-model="name"></v-text-field>
          <v-autocomplete
            ref="year"
            v-model="year"
            :items="year"
            placeholder="Current year of college"
          ></v-autocomplete>
          <v-text-field label="College USN" v-model="usn"></v-text-field>
          <v-text-field label="Phone number" v-model="number" :rules="[rules.mobile]"></v-text-field>
          <v-text-field v-model="email" :rules="[rules.required, rules.email]" label="E-mail"></v-text-field>
          <v-checkbox v-model="ifcsi" label="Are you a CSI member?"></v-checkbox>
          <div v-if="ifcsi">
            <v-text-field v-model="csino" label="CSI member ID"></v-text-field>
          </div>
          <div v-else>
            <p
              class="font-weight-black"
            >While paying, write in description your "Full_Name Todays's_Date(DD/MM/YY)" For eg: Rahul Kumar 10/07/20</p>
            <v-file-input multiple v-model="files" label="Screenshot of payment"></v-file-input>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
      <div class="loader" v-if="load">
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { db } from "@/main";
import { storageRef } from "@/main";
import firebase from "firebase";

export default {
  data() {
    return {
      ifcsi: false,
      year: ["1st year", "2nd year", "3rd year", "4th year"],
      email: "",
      name: "",
      csino: "",
      number: "",
      usn: "",
      files: [],
      run: false,
      load: false,
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        mobile: value => {
          // eslint-disable-next-line no-useless-escape
          const pattern = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
          return pattern.test(value) || "Invalid number.";
        }
      }
    };
  },
  methods: {
    submit() {
      this.load = true;
      let self = this;
      db.collection("studentlist")
        .doc(this.usn)
        .set({
          ifcsi: this.ifcsi,
          year: this.year,
          email: this.email,
          name: this.name,
          csino: this.csino,
          number: this.number,
          usn: this.usn
        });
      if (this.files.length > 0) {
        storageRef
          .child(this.usn + ".jpg")
          .put(this.files[0])
          // eslint-disable-next-line no-unused-vars
          .then(function(snapshot) {
            self.load = false;
            alert("Succefully registered");
            self.$router.push("/");

            firebase
              .auth()
              .signOut()
              .then(
                function() {},
                function(error) {
                  self.load = false;
                  console.log(firebase.auth().currentUser);
                  console.log(error);
                }
              );
            localStorage.removeItem("user");
          });
      } else {
        self.load = false;
        alert("Succefully registered");
        self.$router.push("/");

        firebase
          .auth()
          .signOut()
          .then(
            function() {
              console.log(firebase.auth().currentUser);
            },
            function(error) {
              self.load = false;
              console.log(firebase.auth().currentUser);
              console.log(error);
            }
          );
        localStorage.removeItem("user");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.loader {
  left: 50%;
  top: 50%;
  position: absolute;
}
</style>