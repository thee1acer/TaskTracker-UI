<template>
  <div class="login-screen-container">
    <div class="login-screen-banner">
      <div class="login-header-text">TaskTracker</div>
      <q-input
        class="login-input-box"
        outlined
        type="email"
        hint="Email Adress"
        error-message="must be valid email"
        input-class="login-input-box-override"
        v-model:model-value="username"
      >
        <template v-slot:append>
          <q-icon name="email" size="1.23rem" color="blue" /> </template
      ></q-input>

      <q-input
        class="login-input-box"
        outlined
        type="password"
        hint="Password"
        v-model:model-value="password"
        input-class="login-input-box-override"
      >
        <template v-slot:append>
          <q-icon name="key" size="1.23rem" color="blue" />
        </template>
      </q-input>

      <q-btn
        unelevated
        class="login-button"
        label="login"
        @click="submitLogin"
      />
    </div>
  </div>
</template>

<script setup type="ts">
import { ref } from "vue";
import { useApplicationUserStore } from "../store/Pinia/ApplicationUser/ApplicationUserStore.ts";
import { useUserAuthenticationStore } from "../store/Pinia/Auth/UserAunthenticationStore";

const username = ref("");
const password = ref("");

var applicationUserStore = useApplicationUserStore();
var userAuthStore = useUserAuthenticationStore();

const submitLogin = async () => {
  const loginData = { email: username.value, unhashedPassword: password.value };

  var response = await userAuthStore.logUserIn(loginData);

  if(response != undefined) applicationUserStore.setActivelApplicationUser(response);
};
</script>

<style scoped>
.login-screen-container {
  background-color: rgb(255, 255, 255);
  height: 100vh;
  padding-left: 30vw;
  padding-top: 10vh;
}

.login-screen-banner {
  height: 70vh;
  width: 35vw;
  background-color: rgb(244, 238, 238);
  border-radius: 20px;
  padding: 10px;
  padding-top: 70px;
  border: 1px solid rgb(200, 197, 197);
  box-shadow: 1px;
}

.login-input-box {
  margin-bottom: 15px;
  display: grid;
  margin-left: 15%;
  width: 70%;
  align-self: center;
}

.login-button {
  width: 80%;
  margin-left: 10%;
  margin-top: 20%;
  background-color: rgb(255, 255, 255);
  color: rgb(24, 49, 68);
  height: 50px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 22;
}

.login-header-text {
  width: 100%;
  text-align: center;
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 20px;
  color: rgb(24, 49, 68);
}

.login-input-box-override {
}
</style>

<style>
body {
  transform: scale(1);
  transform-origin: 0 0;
}

/* For Chrome */
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  background-color: #f4eeee !important;
  -webkit-box-shadow: 0 0 0px 1000px #f4eeee inset !important;
  -webkit-text-fill-color: #000000 !important;
  transition: background-color 5000s ease-in-out 0s;
}

/* For Firefox */
input:-moz-autofill,
textarea:-moz-autofill,
select:-moz-autofill {
  background-color: #f4eeee !important;
  -moz-box-shadow: 0 0 0px 1000px #f4eeee inset !important;
  -moz-text-fill-color: #000000 !important;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
