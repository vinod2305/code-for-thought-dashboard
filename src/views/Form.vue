<template>
  <v-container fill-height>
    <template v-if="loading">
      <v-row justify="center" aligh="center">
        <v-progress-circular indeterminate></v-progress-circular>
      </v-row>
    </template>
    <template v-else>
      <v-row justify="center">
        <v-col cols="10" md="8" lg="6">
          <v-card>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline">Details</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-card-text>
              <v-form>
                <v-text-field label="Full Name" :rules="rules" hide-details="auto" v-model="name"></v-text-field>
                <v-autocomplete
                  ref="year"
                  v-model="year"
                  :items="listOfYears"
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
                  >While paying, write in description your "Code for Thought USN" For eg: "Code for Though 1MS17CS032"</p>
                  <v-file-input v-model="file" label="Screenshot of payment"></v-file-input>
                </div>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="clear">Clear</v-btn>
              <v-btn color="primary" text @click="submit">Submit</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <div class="loader" v-if="load">
            <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
          </div>
          <v-dialog v-model="registerResult" width="300">
            <v-card width="300">
              <v-card-title>{{ registerResultTitle }}</v-card-title>
              <v-card-text>{{ registerResultMessage }}</v-card-text>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      ifcsi: false,
      listOfYears: ["1st year", "2nd year", "3rd year", "4th year"],
      year: "",
      email: "",
      name: "",
      csino: "",
      number: "",
      usn: "",
      file: null,
      loading: false,
      registerResult: false,
      registerResultTitle: "",
      registerResultMessage: "",
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
    async submit() {
      const data = {
        ifcse: this.ifcsi,
        year: this.year,
        email: this.email,
        name: this.name,
        csino: this.csino,
        number: this.number,
        usn: this.usn,
        file: this.file
      };

      this.loading = true;

      try {
        let result = await this.$store.dispatch("registerStudent", data);
        if (result) {
          this.registerResult = true;
          this.registerResultTitle = "Successfully Registered";
          this.registerResultMessage =
            "You have successfully registered for the contest";
        } else {
          this.registerResult = true;
          this.registerResultTitle = "Already registered";
          this.registerResultMessage =
            "You have successfully registered for the contest";
        }
        await this.$store.dispatch("logoutUser");
        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },

    clear() {
      this.file = null;
      this.name = "";
      this.year = "";
      this.email = "";
      this.csino = "";
      this.number = "";
      this.usn = "";
    }
  }
};
</script>